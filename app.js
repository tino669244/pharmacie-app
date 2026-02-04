const USER = "admin";
const PASS = "admin123";

let meds = [];
let facture = [];
let ca = 0;

function login() {
  if (loginUser.value === USER && loginPass.value === PASS) {
    loginBox.style.display = "none";
    app.style.display = "block";
    show("dashboard");
  } else {
    loginError.innerText = "Accès refusé";
  }
}

function logout() {
  location.reload();
}

function show(id) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(id).style.display = "block";
  refreshAlerts();
}

function addMed() {
  const med = {
    nom: mNom.value,
    prix: Number(mPrix.value),
    stock: Number(mStock.value)
  };
  meds.push(med);
  renderMeds();
}

function renderMeds() {
  medTable.innerHTML = "";
  medSelect.innerHTML = "";
  meds.forEach((m,i) => {
    const tr = document.createElement("tr");
    if (m.stock < 10) tr.className = "lowStock";
    tr.innerHTML = `<td>${m.nom}</td><td>${m.prix}</td><td>${m.stock}</td>`;
    medTable.appendChild(tr);
    medSelect.innerHTML += `<option value="${i}">${m.nom}</option>`;
  });
}

function addToFacture() {
  const med = meds[medSelect.value];
  const q = Number(qte.value);
  if (med.stock < q) return alert("Stock insuffisant");
  med.stock -= q;

  const totalLigne = med.prix * q;
  ca += totalLigne;

  facture.push(`${med.nom} x${q} = ${totalLigne} Ar`);
  factureList.innerHTML += `<li>${facture.at(-1)}</li>`;
  total.innerText = ca;
  document.getElementById("ca").innerText = ca;

  renderMeds();
}

function refreshAlerts() {
  alertStock.innerHTML = "";
  meds.filter(m => m.stock < 10)
      .forEach(m => alertStock.innerHTML += `<li>${m.nom} stock faible (${m.stock})</li>`);
}

function exportCSV(data, name) {
  let csv = Object.keys(data[0]).join(",") + "\n";
  data.forEach(o => csv += Object.values(o).join(",") + "\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv]));
  a.download = name;
  a.click();
}
