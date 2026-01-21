const API = "http://127.0.0.1:5000"
async function buscarCEP() {
  const cep = document.getElementById("cep").value;

  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const resultadoContainer = document.getElementById("resultado-container");

  const cepResult = document.getElementById("cepResult");
  const logradouro = document.getElementById("logradouro");
  const bairro = document.getElementById("bairro");
  const cidade = document.getElementById("cidade");
  const uf = document.getElementById("uf");

  error.classList.add("d-none");
  resultadoContainer.classList.add("d-none");
  loading.classList.remove("d-none");

  try {
    const res = await fetch(`${API}/cep/${cep}`);
    const data = await res.json();

    loading.classList.add("d-none");

    if (!res.ok) {
      error.innerText = data.error;
      error.classList.remove("d-none");
      return;
    }

    cepResult.value = data.cep;
    logradouro.value = data.logradouro;
    bairro.value = data.bairro;
    cidade.value = data.localidade;
    uf.value = data.uf;

    resultadoContainer.classList.remove("d-none");

  } catch {
    loading.classList.add("d-none");
    error.innerText = "Erro ao conectar com a API";
    error.classList.remove("d-none");
  }
}

function showMessage(msg, isError = false) {
  const el = document.getElementById("message");

  el.classList.remove("d-none", "alert-success", "alert-danger");
  el.classList.add(isError ? "alert-danger" : "alert-success");

  el.innerText = msg;
}

async function login() {
  const btn = document.getElementById("loginBtn");
  const message = document.getElementById("message");

  btn.disabled = true;
  btn.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2"></span>
    Entrando...
  `;

  message.classList.add("d-none");

  try {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const inputs = document.querySelectorAll("input");
    inputs.forEach(i => i.disabled = true);


    if (!email || !senha) {
      message.className = "alert alert-warning mt-3";
      message.textContent = "Preencha todos os campos";
      message.classList.remove("d-none");

      btn.disabled = false;
      btn.innerHTML = "Entrar";
      return;
    }


    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Erro no login");

    localStorage.setItem("token", data.token);
    window.location.href = "cep.html";
  } catch (err) {
    message.className = "alert alert-danger mt-3";
    message.textContent = err.message;
    message.classList.remove("d-none");
  } finally {
    btn.disabled = false;
    btn.innerHTML = "Entrar";
    inputs.forEach(i => i.disabled = false);

  }
}

async function register() {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const senha = document.getElementById("senha");
  const button = document.querySelector("button");

  const inputs = [nome, email, senha];

  inputs.forEach(i => i.disabled = true);
  button.disabled = true;
  button.innerText = "Cadastrando...";

  try {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nome.value,
        email: email.value,
        senha: senha.value
      })
    });

    const data = await res.json();

    showMessage(data.message || data.error, !res.ok);

    if (res.ok) {
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    }

  } catch (err) {
    showMessage("Erro ao conectar com o servidor", true);
  } finally {
    inputs.forEach(i => i.disabled = false);
    button.disabled = false;
    button.innerText = "Cadastrar";
  }
}
