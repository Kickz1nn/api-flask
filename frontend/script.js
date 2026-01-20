const API = "http://127.0.0.1:5000";

async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  showMessage("Carregando...");

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.access_token);
    window.location.href = "cep.html";
  } else {
    showMessage(data.error, true);
  }
}

async function register() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  showMessage("Cadastrando...");

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha })
  });

  const data = await res.json();
  showMessage(data.message || data.error, !res.ok);
}

function buscarCep() {
  const cep = document.getElementById("cep").value;

  fetch(`http://127.0.0.1:5000/cep?cep=${cep}`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
        alert(data.erro);
        return;
      }

      document.getElementById("rua").value = data.logradouro;
      document.getElementById("cidade").value = data.cidade;
      document.getElementById("estado").value = data.estado;
    });
}

function showMessage(msg, error = false) {
  const el = document.getElementById("message");
  el.classList.remove("d-none", "alert-success", "alert-danger");
  el.classList.add(error ? "alert-danger" : "alert-success");
  el.innerText = msg;
}

function hideMessage() {
  const el = document.getElementById("message");
  el.classList.add("d-none");
}
