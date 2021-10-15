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
    <div>Oricamera vous remercie pour votre confiance</div>
    <div> Voici le numéro de votre commande : ${responseId}</div>
    <div> Pour un montant total de : ${formaterPrix(
      responseMontantTotal
    )} €</div>
    <div>A bientôt sur Oricamera</div>
`;
