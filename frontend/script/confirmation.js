//RECUPERATION DE L'ID

let responseId = localStorage.getItem("responseId");
console.log(responseId);

const cardConfirmation = document.getElementById("confirmation");

//RECUPERATION DU MONTANT TOTAL
let responseMontantTotal = localStorage.getItem("montantTotalLocalStorage");
console.log(responseMontantTotal);

function formaterPrix(prix) {
  let arrondi = prix / 100;
  return arrondi.toFixed(2);
}

cardConfirmation.innerHTML = `
    <div class="fw-bold fs-4 lh-lg text-warning">Oricamera vous remercie pour votre confiance</div>
    <div> <span class="fw-bold">Voici le numéro de votre commande : </span>${responseId}</div>
    <div> <span class="fw-bold">Pour un montant total de : </span>${formaterPrix(
      responseMontantTotal
    )} €</div>
    <div class="fw-bold fs-5 lh-lg text-warning">A bientôt sur Oricamera</div>
`;
