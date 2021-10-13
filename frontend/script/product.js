const results = document.querySelector("#product");

const params = new URLSearchParams(location.search);

const id = params.get("id");

let product = fetch(`http://localhost:3000/api/cameras/${id}`);

product.then(async (response) => {
  if (response.ok) {
    let produit = await response.json();
    console.log(produit);

    let prixFormate = formaterPrix(produit.price);

    console.log("produit");

    results.innerHTML += `
  
    <div class="container fiche-produit h-100">
        <div class="card article" >
            <img class="card-img-top " src="${produit.imageUrl}"/>
          <div class="card-body">
            <h2 class="card-title">${produit.name} </h2>
            <p class="card-text text-justify">${produit.description} </p>
            
            <div class="produit">
              <form>
                <label for="lenses_produit">Choisir la lentille</label>
                <select name="lenses_produit" id="lenses_produit">
                ${menuDeroulant(produit)}
                </select> </br>
           
                <label for="itemQuantity"> Quantité: </label>
                <select name="itemQuantity" id="itemQuantity">
                <option value= "1">1</option value>
                <option value= "2">2</option value>
                <option value= "3">3</option value>
                <option value= "4">4</option value>
                <option value= "5">5</option value>
              </select>
              

            </form> 
                
                <p class="card-text text-center font-weight-bold"">${prixFormate}€ </p>
                
                <button type="button" class="btn btn-primary rounded-pill" id="btn" ">Ajouter Au Panier</button>

            </div>
            
          </div>
        </div>
    </div>

  `;
    //AFFICHAGE NOM PRODUIT DANS LA BALISE TITLE
    let nomProduit = document.querySelector("#nom_produit");
    console.log(nomProduit);
    nomProduit.innerHTML = `
    ${produit.name}
  `;

    // BOUTON AJOUT PANIER
    let click = document.querySelector("#btn");
    console.log(click);
    click.addEventListener("click", addToCart);
  }
});

// Function pour arrondir le prix
function formaterPrix(prix) {
  let arrondi = prix / 100;
  return arrondi.toFixed(2);
}

// Menu déroulant pour le choix de la lentille
function menuDeroulant(produit) {
  const optionLentilles = produit.lenses;

  let structureOptions = [];
  console.log(optionLentilles);

  for (let i = 0; i < optionLentilles.length; i++) {
    structureOptions =
      structureOptions +
      `
      <option value="${i + 1}">${optionLentilles[i]}</option>
        `;
  }

  console.log(structureOptions);

  return structureOptions;
}

// FONCTION AJOUTER AU PANIER
async function addToCart() {
  let jsonData = await fetch("http://localhost:3000/api/cameras/" + id).then(
    function (res) {
      return res.json();
    }
  );

  let panier = JSON.parse(localStorage.getItem("produitsPanier") || "[]");
  panier.push({
    id: jsonData._id,
    nom: jsonData.name,
    prix: jsonData.price * itemQuantity.value,
    quantite: itemQuantity.value,
  });

  localStorage.setItem("produitsPanier", JSON.stringify(panier));
  console.log(panier);
}
