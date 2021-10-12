const results = document.getElementById("products");

const fetchProducts = fetch("http://localhost:3000/api/cameras");

fetchProducts
  .then(async (response) => {
    
    if (response.ok) {
    const produits = await response.json();
    console.log(produits);

      for (let i = 0; i < produits.length; i++) {

        let product = produits[i];

        let prixFormate = formaterPrix(product.price);

        results.innerHTML += `
          <div class=" col-12 col-lg-4">
          <a class="card articles" href="product.html?id=${product._id}">
            <img class="card-img-top" src="${product.imageUrl}"/>
          <div class="card-body">
            <h2 class="card-title">${product.name} </h2>
            <p class="card-text">${formaterPrix(product.price)} € </p>
          </div>
          </a>
        </div>
  `;
  }
  }
})
  
  .catch(() => {
        alert(
          "Une erreur semble survenir. Assurez-vous d'être connecté au serveur 3000"
        );
  })

 

// Function pour arrondir le prix
function formaterPrix(prix) {
  let arrondi = prix / 100;
  return arrondi.toFixed(2);
}

