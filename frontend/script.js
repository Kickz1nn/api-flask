const API = "http://127.0.0.1:5000";

async function carregarHistorico() {
  const userId = localStorage.getItem("user_id");
  if (!userId) return;

  const list = document.getElementById("historyList");
  if (!list) return;

  const res = await fetch(`${API}/history/${userId}`);
  const data = await res.json();

  list.innerHTML = "";

  data.forEach(item => {
    list.innerHTML += `
      <li class="list-group-item">
        <strong>${item.cep}</strong> - ${item.cidade}/${item.uf}
        <br>
        <small>${item.created_at}</small>
      </li>
    `;
  });
}

async function buscarCEP() {
  const userId = localStorage.getItem("user_id");
  if (!userId) {
    window.location.href = "index.html";
    return;
  }

  const cep = document.getElementById("cep").value;

  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const resultado = document.getElementById("resultado-container");

  error.classList.add("d-none");
  resultado.classList.add("d-none");
  loading.classList.remove("d-none");

  try {
    const res = await fetch(`${API}/cep/${cep}?user_id=${userId}`);
    const data = await res.json();

    loading.classList.add("d-none");

    if (!res.ok) {
      error.textContent = data.error;
      error.classList.remove("d-none");
      return;
    }

    document.getElementById("cepResult").value = data.cep;
    document.getElementById("logradouro").value = data.logradouro;
    document.getElementById("bairro").value = data.bairro;
    document.getElementById("cidade").value = data.localidade;
    document.getElementById("uf").value = data.uf;

    resultado.classList.remove("d-none");

    carregarHistorico();
  } catch {
    loading.classList.add("d-none");
    error.textContent = "Erro ao conectar com a API";
    error.classList.remove("d-none");
  }
}

function showMessage(msg, isError = false) {
  const el = document.getElementById("message");
  if (!el) return;

  el.classList.remove("d-none", "alert-success", "alert-danger");
  el.classList.add(isError ? "alert-danger" : "alert-success");
  el.textContent = msg;
}

async function login() {
  const btn = document.getElementById("loginBtn");
  const message = document.getElementById("message");

  if (!btn || !message) return;

  btn.disabled = true;
  btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Entrando...`;
  message.classList.add("d-none");

  try {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
      showMessage("Preencha todos os campos", true);
      btn.disabled = false;
      btn.innerHTML = "Entrar";
      return;
    }

    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Erro no login");

    localStorage.setItem("user_id", data.user_id);
    window.location.href = "cep.html";
  } catch (err) {
    showMessage(err.message, true);
  } finally {
    btn.disabled = false;
    btn.innerHTML = "Entrar";
  }
}

async function register() {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const senha = document.getElementById("senha");
  const button = document.querySelector("button");

  if (!nome || !email || !senha || !button) return;

  nome.disabled = true;
  email.disabled = true;
  senha.disabled = true;
  button.disabled = true;
  button.textContent = "Cadastrando...";

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
  } catch {
    showMessage("Erro ao conectar com o servidor", true);
  } finally {
    nome.disabled = false;
    email.disabled = false;
    senha.disabled = false;
    button.disabled = false;
    button.textContent = "Cadastrar";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("historyList")) {
    carregarHistorico();
  }
});
