let prodottiOriginali = [];

fetch("prodotti.json")
  .then(res => res.json())
  .then(data => {
    prodottiOriginali = data.prodotti;
    popolaFiltri(data.prodotti);
    mostraProdotti(data.prodotti);
  });

function popolaFiltri(prodotti) {
  const marche = new Set();
  const categorie = new Set();

  prodotti.forEach(p => {
    marche.add(p.marca);
    categorie.add(p.categoria);
  });

  const filtroMarca = document.getElementById("filtroMarca");
  const filtroCategoria = document.getElementById("filtroCategoria");

  marche.forEach(m => {
    const op = document.createElement("option");
    op.value = m;
    op.textContent = m;
    filtroMarca.appendChild(op);
  });

  categorie.forEach(c => {
    const op = document.createElement("option");
    op.value = c;
    op.textContent = c;
    filtroCategoria.appendChild(op);
  });

  filtroMarca.addEventListener("change", applicaFiltri);
  filtroCategoria.addEventListener("change", applicaFiltri);
}

function applicaFiltri() {
  const marca = document.getElementById("filtroMarca").value;
  const categoria = document.getElementById("filtroCategoria").value;

  const filtrati = prodottiOriginali.filter(p => {
    return (!marca || p.marca === marca) && (!categoria || p.categoria === categoria);
  });

  mostraProdotti(filtrati);
}

function mostraProdotti(prodotti) {
  const griglia = document.getElementById("grigliaProdotti");
  griglia.innerHTML = "";

  if (prodotti.length === 0) {
    griglia.innerHTML = "<p>Nessun prodotto trovato.</p>";
    return;
  }

  prodotti.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.immagine}" alt="${p.nome}">
      <div class="card-body">
        <h3>${p.nome}</h3>
        <p>${p.descrizione}</p>
        <p class="prezzo">€ ${p.prezzo}</p>
      </div>
    `;

    griglia.appendChild(card);
  });
}
