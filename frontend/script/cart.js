let produitsPanier = JSON.parse(localStorage.getItem("produitsPanier") || "['Le panier est vide']");
console.log(produitsPanier);

const showPanier = document.querySelector("#liste-panier");
console.log(showPanier);

function formaterPrix(prix) {
  let arrondi = prix / 100;
  return arrondi.toFixed(2);
}

let affichagePanier = '';
console.log(affichagePanier);

let montantTotal = 0;

for(k = 0; k < produitsPanier.length; k++){
  montantTotal= montantTotal + produitsPanier[k].prix;

  affichagePanier = affichagePanier + `
  <div class="fw-bold"> ${produitsPanier[k].nom} </div>
  <div class="font-weight-bold"> Quantité : ${produitsPanier[k].quantite || 1} </div>
  <div class="text-decoration-underline "> Sous-total : ${formaterPrix(produitsPanier[k].prix)} € </div>
`;
}
  
  showPanier.innerHTML = affichagePanier + `<div class="fw-bold"> PRIX TOTAL DU PANIER : ${formaterPrix(montantTotal)}€</div>`;
  


let produitsDuPanier = JSON.parse(
    localStorage.getItem("produitsPanier") || "[]"
  );
  console.log(produitsDuPanier);
  
  
  