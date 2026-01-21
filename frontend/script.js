const API = "http://127.0.0.1:5000";

async function buscarCEP() {
  const cep = document.getElementById("cep").value;

  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  const cepResult = document.getElementById("cepResult");
  const logradouro = document.getElementById("logradouro");
  const bairro = document.getElementById("bairro");
  const cidade = document.getElementById("cidade");
  const uf = document.getElementById("uf");

  error.classList.add("d-none");
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

  } catch {
    loading.classList.add("d-none");
    error.innerText = "Erro ao conectar com a API";
    error.classList.remove("d-none");
  }
}
