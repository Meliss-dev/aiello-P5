let produitsPanier = JSON.parse(localStorage.getItem("produitsPanier"));
console.log(produitsPanier);

const showPanier = document.querySelector("#liste-panier");
console.log(showPanier);

function formaterPrix(prix) {
  let arrondi = prix / 100;
  return arrondi.toFixed(2);
}
console.log(produitsPanier);

const panierVide = document.querySelector("#liste-panier");
console.log(panierVide);

if (produitsPanier === null) {
  panierVide.innerHTML = `
    <div class="fw-bold"> Le panier est vide </div>
    `;
} else {
  let affichagePanier = "";
  console.log(affichagePanier);

  let montantTotal = 0;

  for (k = 0; k < produitsPanier.length; k++) {
    montantTotal = montantTotal + produitsPanier[k].prix;

    affichagePanier =
      affichagePanier +
      `
  <div class="fw-bold"> ${produitsPanier[k].nom} </div>
  <div class="font-weight-bold"> Quantité : ${
    produitsPanier[k].quantite || 1
  } </div>
  <div class="text-decoration-underline"> Sous-total : ${formaterPrix(
    produitsPanier[k].prix
  )} € </div>
`;
  }

  showPanier.innerHTML =
    affichagePanier +
    `<div class="fw-bold"> PRIX TOTAL DU PANIER : ${formaterPrix(
      montantTotal
    )}€</div>`;

  let produitsDuPanier = JSON.parse(
    localStorage.getItem("produitsPanier") || "[]"
  );
  console.log(produitsDuPanier);

  //VIDER LE PANIER
  const btn_supprimer_panier_html = `
  <button class="btn_supprimer_panier btn btn-primary ">Vider le panier </button>
`;
  showPanier.insertAdjacentHTML("beforeend", btn_supprimer_panier_html);

  const btn_supprimer_panier = document.querySelector(".btn_supprimer_panier");
  console.log(btn_supprimer_panier);

  btn_supprimer_panier.addEventListener("click", (e) => {
    e.preventDefault;

    localStorage.removeItem("produitsPanier");

    alert("Le panier a été vidé");

    window.location.href = "index.html";
  });
}
