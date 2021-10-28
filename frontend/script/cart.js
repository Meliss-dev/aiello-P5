let produitsPanier = JSON.parse(localStorage.getItem("produitsPanier") || "[]");
console.log(produitsPanier);

const showPanier = document.querySelector("#liste-panier");
console.log(showPanier);

// FONCTION FORMATER PRIX
function formaterPrix(prix) {
  let arrondi = prix / 100;
  return arrondi.toFixed(2);
}

// SI LE PANIER EST VIDE
const panierVide = document.querySelector("#liste-panier");
console.log(panierVide);

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
  } </div><button class="remove_article"> <i class="fas fa-trash Total"></i></button></div>
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

  console.log(montantTotal);

  //ENVOI DU MONTANT PANIER AU LOCALSTORAGE
  let totalPanier = localStorage.setItem(
    "totalPanier",
    JSON.stringify(montantTotal)
  );

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
  produits = JSON.parse(localStorage.getItem("produitsPanier"));
  console.log("produits");
  console.log(produits);

  const firstname = document.getElementById("prenom").value;
  const lastname = document.getElementById("nom").value;
  const adress = document.getElementById("adresse").value;
  const city = document.getElementById("ville").value;
  const email = document.getElementById("email").value;

  const formulaire = {
    firstName: firstname,
    lastName: lastname,
    address: adress,
    city: city,
    email: email,
  };

  console.log("formulaire");
  console.log(formulaire);

  //CONTRÔLE FORMULAIRE

  //PRENOM
  function prenomControle() {
    //controle validite prenom
    const lePrenom = formulaire.firstName;
    if (/^[A-Z - a-z -é è ï]{2,20}$/.test(lePrenom)) {
      return true;
    } else {
      alert(
        "Le prénom n'est pas valide - Minimum 2 caractères et ne pas dépasser 20 caractères"
      );
      return false;
    }
  }

  //NOM
  function nomControle() {
    const leNom = formulaire.lastName;
    if (/^[A-Z - a-z -é è ï ^0-9]{2,20}$/.test(leNom)) {
      return true;
    } else {
      alert(
        "Le nom n'est pas valide - Minimum 2 caractères et ne pas dépasser 20 caractères"
      );
      return false;
    }
  }

  //VILLE
  function villeControle() {
    const laVille = formulaire.city;
    if (/[A-Z - a-z -é è ï î]{2,30}$/.test(laVille)) {
      return true;
    } else {
      alert(
        "La ville n'est pas valide - Minimum 2 caractères et ne pas dépasser 30 caractères"
      );
      return false;
    }
  }

  //ENVOI AU LOCALSTORAGE AVEC CONDITION

  let envoieAuServeur = {
    contact: formulaire,
    products: produits.map((produit) => produit.id),
  };
  console.log("envoie au serveur");
  console.log(envoieAuServeur);

  if (prenomControle() && nomControle() && villeControle()) {
    localStorage.setItem("commandeClient", JSON.stringify(envoieAuServeur));
    console.log(prenomControle());

    //ENVOI AU SERVEUR

    const server = fetch("http://localhost:3000/api/cameras/order", {
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
          console.log(contenu.orderId);

          //ENVOI DE L'ID DANS LE LOCALSTORAGE

          localStorage.setItem("responseId", contenu.orderId);

          //ENVOI DE L'ID VERS LA PAGE DE CONFIRMATION
          window.location = "confirmation.html";
          console.log("test");
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
  } else {
    alert("Veuillez bien remplir le fonctionnaire");
  }
}
