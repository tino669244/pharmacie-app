// LOGIN
const USER="admin",PASS="admin123";
function login(){if(loginUser.value===USER&&loginPass.value===PASS){loginBox.style.display="none";app.style.display="block";show('parametres');}else loginError.innerText="Accès refusé"}
function logout(){location.reload()}
function show(id){document.querySelectorAll('.page').forEach(p=>p.style.display='none');document.getElementById(id).style.display='block');renderCharts();renderTimeline();}

// STORAGE
let params=JSON.parse(localStorage.getItem("params"))||{};
let meds=JSON.parse(localStorage.getItem("meds"))||[];
let clients=JSON.parse(localStorage.getItem("clients"))||[];
let medecins=JSON.parse(localStorage.getItem("medecins"))||[];
let ordonnances=JSON.parse(localStorage.getItem("ordonnances"))||[];
let detailOrdo=JSON.parse(localStorage.getItem("detailOrdo"))||[];
let ventes=JSON.parse(localStorage.getItem("ventes"))||[];

// PARAMETRES
function saveParam(){params={nom:nomSociete.value,adresse:adresseSociete.value,lieu:lieuSociete.value,tva:tva.value,dernier:dernierFacture.value};localStorage.setItem("params",JSON.stringify(params));alert("Paramètres sauvegardés")}

// Fonction CRUD Médicaments
function addMed(){meds.push({code:codeMed.value,nom:nomMed.value,categorie:categorieMed.value,forme:formeMed.value,dosage:dosageMed.value,exp:expMed.value,stock:Number(stockMed.value),prixA:Number(prixAchatMed.value),prixV:Number(prixVenteMed.value),fournisseur:fournisseurMed.value});saveMeds();renderMeds()}
function saveMeds(){localStorage.setItem("meds",JSON.stringify(meds))}
function renderMeds(){medTable.innerHTML='';medSelect.innerHTML='';meds.forEach((m,i)=>{const tr=document.createElement("tr");if(m.stock<10)tr.className="lowStock";tr.innerHTML=`<td>${m.code}</td><td>${m.nom}</td><td>${m.categorie}</td><td>${m.forme}</td><td>${m.dosage}</td><td>${m.exp}</td><td>${m.stock}</td><td>${m.prixA}</td><td>${m.prixV}</td><td>${m.fournisseur}</td><td><button onclick="deleteMed(${i})">Suppr</button></td>`;medTable.appendChild(tr);medSelect.innerHTML+=`<option value="${i}">${m.nom}</option>`})}
function deleteMed(i){meds.splice(i,1);saveMeds();renderMeds()}

// CRUD Clients
function addClient(){clients.push({code:codeClient.value,nom:nomClient.value,tel:telClient.value,adresse:adresseClient.value,type:typeClient.value});saveClients();renderClients()}
function saveClients(){localStorage.setItem("clients",JSON.stringify(clients))}
function renderClients(){clientTable.innerHTML='';clients.forEach((c,i)=>{clientTable.innerHTML+=`<tr><td>${c.code}</td><td>${c.nom}</td><td>${c.tel}</td><td>${c.adresse}</td><td>${c.type}</td><td><button onclick="deleteClient(${i})">Suppr</button></td></tr>`})}
function deleteClient(i){clients.splice(i,1);saveClients();renderClients()}

// CRUD Médecins
function addMedecin(){medecins.push({code:codeMedecin.value,nom:nomMedecin.value,spec:specMedecin.value,tel:telMedecin.value});saveMedecins();renderMedecins()}
function saveMedecins(){localStorage.setItem("medecins",JSON.stringify(medecins))}
function renderMedecins(){medecinTable.innerHTML='';medecins.forEach((m,i)=>{medecinTable.innerHTML+=`<tr><td>${m.code}</td><td>${m.nom}</td><td>${m.spec}</td><td>${m.tel}</td><td><button onclick="deleteMedecin(${i})">Suppr</button></td></tr>`})}
function deleteMedecin(i){medecins.splice(i,1);saveMedecins();renderMedecins()}

// CRUD Ordonnances
function addOrdo(){ordonnances.push({num:numOrdo.value,date:dateOrdo.value,patient:nomPatient.value,codeMed:codeMedecinOrdo.value,codeClient:codeClientOrdo.value,obs:observationOrdo.value});saveOrdo();renderOrdo()}
function saveOrdo(){localStorage.setItem("ordonnances",JSON.stringify(ordonnances))}
function renderOrdo(){ordoTable.innerHTML='';ordonnances.forEach((o,i)=>{ordoTable.innerHTML+=`<tr><td>${o.num}</td><td>${o.date}</td><td>${o.patient}</td><td>${o.codeMed}</td><td>${o.codeClient}</td><td>${o.obs}</td><td><button onclick="deleteOrdo(${i})">Suppr</button></td></tr>`})}
function deleteOrdo(i){ordonnances.splice(i,1);saveOrdo();renderOrdo()}

// CRUD Détail Ordonnances
function addDetailOrdo(){detailOrdo.push({num:numOrdoDetail.value,code:codeMedDetail.value,nom:nomMedDetail.value,qte:Number(qteDetail.value),pu:Number(prixUDetail.value),total:Number(totalDetail.value)});saveDetailOrdo();renderDetailOrdo()}
function saveDetailOrdo(){localStorage.setItem("detailOrdo",JSON.stringify(detailOrdo))}
function renderDetailOrdo(){detailOrdoTable.innerHTML='';detailOrdo.forEach((d,i)=>{detailOrdoTable.innerHTML+=`<tr><td>${d.num}</td><td>${d.code}</td><td>${d.nom}</td><td>${d.qte}</td><td>${d.pu}</td><td>${d.total}</td><td><button onclick="deleteDetailOrdo(${i})">Suppr</button></td></tr>`})}
function deleteDetailOrdo(i){detailOrdo.splice(i,1);saveDetailOrdo();renderDetailOrdo()}

// CRUD Ventes
function addVente(){ventes.push({num:numFacture.value,date:dateFacture.value,codeClient:codeClientFact.value,nomClient:nomClientFact.value,numOrdo:numOrdoFact.value,montant:Number(montantFact.value),paiement:paiementFact.value});saveVentes();renderVentes()}
function saveVentes(){localStorage.setItem("ventes",JSON.stringify(ventes))}
function renderVentes(){venteTable.innerHTML='';ventes.forEach((v,i)=>{venteTable.innerHTML+=`<tr><td>${v.num}</td><td>${v.date}</td><td>${v.codeClient}</td><td>${v.nomClient}</td><td>${v.numOrdo}</td><td>${v.montant}</td><td>${v.paiement}</td><td><button onclick="deleteVente(${i})">Suppr</button></td></tr>`})}
function deleteVente(i){ventes.splice(i,1);saveVentes();renderVentes()}

// Export XLSX
function exportExcel(data,filename){if(!data.length)return;let ws=XLSX.utils.json_to_sheet(data);let wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,"Sheet1");XLSX.writeFile(wb,filename)}

// Charts Dashboard
function renderCharts(){
let ctxCA=document.getElementById("chartCA").getContext("2d");
let totalCA=ventes.reduce((a,v)=>a+v.montant,0);
document.getElementById("ca").innerText=totalCA;
new Chart(ctxCA,{type:"bar",data:{labels:ventes.map(v=>v.num),datasets:[{label:"Montant Vente",data:ventes.map(v=>v.montant),backgroundColor:"#2c7be5"}]}});

let ctxStock=document.getElementById("chartStock").getContext("2d");
new Chart(ctxStock,{type:"line",data:{labels:meds.map(m=>m.nom),datasets:[{label:"Stock",data:meds.map(m=>m.stock),borderColor:"#ff0000",fill:false}]}})
}

// Chronologie ventes
function renderTimeline(){timeline.innerHTML='';ventes.forEach(v=>{let li=document.createElement("li");li.innerText=`${v.date} : ${v.nomClient} - ${v.montant} Ar`;timeline.appendChild(li)})}
