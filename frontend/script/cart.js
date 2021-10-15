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

// SI LE PANIER EST VIDE
if (produitsPanier === null || produitsPanier == 0) {
  panierVide.innerHTML = `
    <div class="fw-bold"> Le panier est vide </div>
    `;

  // SI LE PANIER N'EST PAS VIDE
} else {
  let affichagePanier = "";
  console.log(affichagePanier);

  let montantTotal = 0;

  for (k = 0; k < produitsPanier.length; k++) {
    montantTotal = montantTotal + produitsPanier[k].prix;

    affichagePanier =
      affichagePanier +
      `
  <div class="supprimer_article"> <div> <span class="fw-bold"> Article : </span> ${
    produitsPanier[k].nom
  } </div><button class="remove_article"> <i class="fas fa-trashTotal"></i></button></div>
  <div> <span class="fw-bold">  Quantité :</span>  ${
    produitsPanier[k].quantite || 1
  } </div>
  <div> <span class="fw-bold">Sous-total :</span> ${formaterPrix(
    produitsPanier[k].prix
  )} € </div>
  <div class="trait_dessus"><hr></div>
`;
  }

  showPanier.innerHTML =
    affichagePanier +
    `<div class="fw-bold"> PRIX TOTAL DU PANIER : ${formaterPrix(
      montantTotal
    )}€</div>`;

  console.log("hi");
  console.log(montantTotal);

  let totalPanier= localStorage.setItem(
    "totalPanier",
    JSON.stringify(montantTotal)
  );

  let produitsDuPanier = JSON.parse(
    localStorage.getItem("produitsPanier") || "[]"
  );
  console.log(produitsDuPanier);

  //VIDER LE PANIER
  const btn_supprimer_panier_html = `
  <button class="btn_supprimer_panier btn btn-vider ">Vider le panier </button>
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

//SUPPRIMER UN ARTICLE
let buttonSupprimer = document.querySelectorAll(".remove_article");
console.log(buttonSupprimer);

for (let l = 0; l < buttonSupprimer.length; l++) {
  buttonSupprimer[l].addEventListener("click", (event) => {
    event.preventDefault();

    let idSupprimer = produitsPanier[l].id;
    console.log(idSupprimer);

    produitsPanier = produitsPanier.filter((el) => el.id !== idSupprimer);
    console.log(produitsPanier);

    localStorage.setItem("produitsPanier", JSON.stringify(produitsPanier));
    console.log(produitsPanier);

    alert("Cet article a été supprimé du panier");

    document.location.href = "cart.html";
  });
}

//FORMULAIRE POUR VALIDER LE PANIER
async function validationPanier() {
  produits = JSON.parse(localStorage.getItem("produitsPanier") || "[]");
  console.log("produits");
  console.log(produits);

  const firstname = document.getElementById("prenom").value;
  const lastname = document.getElementById("nom").value;
  const adress = document.getElementById("adresse").value;
  const city = document.getElementById("ville").value;
  const email = document.getElementById("email").value;

  const formulaire = {
    contact: {
      firstName: firstname,
      lastName: lastname,
      address: adress,
      city: city,
      email: email,
    },
  };

  console.log("formulaire");
  console.log(formulaire);

  //CONTRÔLE FORMULAIRE
  //PRENOM
  const lePrenom = formulaire.contact.firstName;
  console.log(lePrenom);

  if (/^[A-Z - a-z -é è ï]{2,20}$/.test(lePrenom)) {
  } else {
    alert("Le prénom n'est pas valide - Ne pas dépasser 20 caractères");
  }

  //NOM
  const leNom = formulaire.contact.lastName;
  console.log(leNom);

  if (/^[A-Z - a-z -é è ï]{2,20}$/.test(leNom)) {
  } else {
    alert("Le nom n'est pas valide - Ne pas dépasser 20 caractères");
  }

  //VILLE
  const laVille = formulaire.contact.city;
  console.log(laVille);

  if (/[A-Z - a-z -é è ï î]{2,30}$/.test(laVille)) {
  } else {
    alert("Le nom n'est pas valide - Ne pas dépasser 30 caractères");
  }

  //ENVOI AU LOCALSTORAGE
  let envoieAuServeur = {
    produits,
    formulaire,
  };
  console.log(envoieAuServeur);

  localStorage.setItem("commandeClient", JSON.stringify(envoieAuServeur));

  //ENVOI AU SERVEUR

  const server = fetch("https://restapi.fr/api/commandeTest", {
    method: "POST",
    body: JSON.stringify(envoieAuServeur),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(server);

  server.then(async (response) => {
    try {
      const contenu = await response.json();
      console.log("contenu de la response");
      console.log(contenu);

      if (response.ok) {
        console.log("Resultat de reponse.ok : ${response.ok}");
        console.log("id de response");
        console.log(contenu._id);

        //ENVOI DE L'ID DANS LE LOCALSTORAGE
        localStorage.setItem("responseId", contenu._id);

        //ENVOI DE L'ID VERS LA PAGE DE CONFIRMATION
        window.location = "confirmation.html";
      } else {
        console.log("Reponse du serveur : ${response.status}");
        alert("Probleme avec le serveur : erreur ${response.status}");
      }
    } catch (e) {
      console.log("ERREUR qui vient du catch()");
      console.log(e);
      alert("ERREUR qui vient du catch ${e}");
    }
  });
}
