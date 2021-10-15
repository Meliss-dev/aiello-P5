let responseId = localStorage.getItem("responseId");
console.log(responseId);

const cardConfirmation = document.getElementById("confirmation");

cardConfirmation.innerHTML = `
    <div> Le numéro de votre commande${responseId}</div>
`;
