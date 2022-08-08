/*________RETRIEVE QUERY STRING FROM URL________*/
const queryString_url_id = window.location.search;

/*________EXTRACTING THE ID________*/ 
const id = queryString_url_id.slice(4);

/*________RETRIEVES PRODUCT INFO FROM API AND DISPLAYS IT________*/ 
fetch("http://localhost:3000/api/products/" + id)
  .then(res => res.json())
  .then(data => {
    image.src = data.imageUrl;
    image.alt = data.altTxt;
    document.getElementById('title').innerHTML = data.name;
    document.getElementById('price').innerHTML = data.price;
    document.getElementById('description').innerHTML = data.description;
    for (let i of data.colors){
      let colorOption = document.createElement("option");
      colors.appendChild(colorOption);
      colorOption.value = i;
      colorOption.text = i;
    }
  })
  .catch(error => alert(error))

/*________RETRIEVE DATA FROM LOCAL STORAGE________*/ 
let productInLocalStorage  = JSON.parse(localStorage.getItem("product"));


/*________CREATION OF PARAGRAPH TO NOTIFY THAT CANNOT ADD QUANTITY CHOOSED________*/ 
const newParagraphQuantity = document.createElement('p');
document.querySelector('.item__content__settings .item__content__settings__quantity').appendChild(newParagraphQuantity);
newParagraphQuantity.style.color = ' var(--footer-secondary-color)';
newParagraphQuantity.style.display = 'none';


/*________CREATION OF IMAGE BALISE________*/
const image = document.createElement('img');
document.getElementsByClassName('item__img')[0].appendChild(image);


/*________CREATION OF PARAGRAPH TO WARN THAT ANY COLOR HAS BEEN CHOOSED________*/ 
const newParagraphColor = document.createElement('p');
document.querySelector('.item__content__settings .item__content__settings__color').appendChild(newParagraphColor);
newParagraphColor.style.color = ' var(--footer-secondary-color)';
newParagraphColor.style.display = 'none';

/*________CREATION OF PARAGRAPH TO CONFIRM THAT THE PRODUCT HAS BEEN ADDED TO CART________*/ 
const newParagraphAddProduct = document.createElement('p');
document.querySelector('.item__content').appendChild(newParagraphAddProduct);
newParagraphAddProduct.style.color = ' var(--footer-secondary-color)';
newParagraphAddProduct.style.display = 'none';

/*________GET SOME ELEMENT BY THEIR ID________*/
const colorSelect = document.getElementById("colors");
const quantity = document.getElementById("quantity");
const addButton = document.getElementById("addToCart");

/*________ROUND DECIMAL NUMBER________*/
quantity.addEventListener('change', function(){
  quantity.value = Math.round(quantity.value);
});
 
/*________ERASE ERROR MESSAGE IF A COLOR IS CHOOSED________*/ 
colorSelect.addEventListener('change', function(){
  if(colorSelect.selectedIndex != "0"){
    newParagraphColor.style.display = 'none';}
})

/*________ERASE ERROR MESSAGE IF A VALID QUANTITY IS CHOOSED________*/
document.getElementById("quantity").addEventListener('change', function(){
  if(quantity.value > 0 && quantity.value < 101){
    newParagraphQuantity.style.display = 'none';
  }
})

/*________INITIALIZATION OF VARIABLE FOR COLOR AND QUANTITY CHOOSED________*/
let colorChoosed = '';
let quantityChoosed = '';

/*________CONFIRMATION PRODUCT ADDED ON CART________*/
function notifProductAdded(){ 
  if(quantityChoosed == 1){
    newParagraphAddProduct.style.display = 'none';
    newParagraphAddProduct.innerHTML = "Vous venez d'ajouter " + quantityChoosed + " Kanap ! <p><a href='cart.html'><strong>Voir mon panier </strong></a></p>";
  }
  if(quantityChoosed > 1){
    newParagraphAddProduct.style.display = 'none';
    newParagraphAddProduct.innerHTML = "Vous venez d'ajouter " + quantityChoosed + " Kanaps ! <p><a href='cart.html'><strong>Voir mon panier </strong></a></p>";
  }
  newParagraphColor.style.display = 'none';
  newParagraphQuantity.style.display = 'none';
  newParagraphAddProduct.style.textAlign = 'center';
  setTimeout(() => {
    newParagraphAddProduct.style.display = 'initial';
  }, 400);
}

/*________WARNING COLOR AND/OR QUANTITY NOT CHOOSED________*/
function notifElementUnchoosed(){
    if(colorSelect.selectedIndex == "0" && quantityChoosed == 0){
        newParagraphColor.innerHTML = 'Veuillez choisir une couleur.';
        newParagraphColor.style.display = 'flex';
        newParagraphQuantity.innerHTML = 'Veuillez choisir une quantité.';
        newParagraphQuantity.style.display = 'flex';
    }
    if(colorSelect.selectedIndex == "0" && quantityChoosed != 0 && quantityChoosed < 101 ){
        newParagraphColor.innerHTML = 'Veuillez choisir une couleur.';
        newParagraphColor.style.display = 'flex';
        newParagraphQuantity.style.display = 'none';
    }
    if(colorSelect.selectedIndex != "0" && quantityChoosed == 0){
        newParagraphColor.style.display = 'none';
        newParagraphQuantity.innerHTML = 'Veuillez choisir une quantité.';
        newParagraphQuantity.style.display = 'flex';
    }
    if(colorSelect.selectedIndex == "0" && quantityChoosed > 100){        
        newParagraphColor.innerHTML = 'Veuillez choisir une couleur.';
        newParagraphColor.style.display = 'flex';
        newParagraphQuantity.innerHTML = 'Veuillez choisir une quantité comprise entre 1 et 100.';
        newParagraphQuantity.style.display = 'flex';
    }
    if(colorSelect.selectedIndex != "0" && quantityChoosed > 100){
        newParagraphColor.style.display = 'none';
        newParagraphQuantity.innerHTML = 'Veuillez choisir une quantité comprise entre 1 et 100.';
        newParagraphQuantity.style.display = 'flex';
    }

}

/*________BUTTON "AJOUTER AU PANIER" ON CLICK________*/
addButton.addEventListener('click',function(event){

  colorChoosed = colorSelect.value;
  quantityChoosed = Number(document.getElementById("quantity").value);  

  notifElementUnchoosed();  //IF COLOR OR QUANTITY (OR BOTH OF THEM) HAS NOT BEEN CHOOSED

  let article = { //DATA TO POST ON LOCAL STORAGE
      id: id,
      quantity: Number(0 + quantityChoosed),
      color: colorChoosed
  }   

/*________IF SOME COLOR AND A VALID QUANTITY HAVE BEEN CHOOSED________*/
  if(colorSelect.selectedIndex != "0" && quantityChoosed > 0 && quantityChoosed < 101){  
   if(productInLocalStorage ){ // IF LOCAL STORAGE IS NOT EMPTY

    const resultFind = productInLocalStorage.find((el) => el.id === id && el.color === colorChoosed); //SEARCH IF PRODUCT IS ON CART
     
    if(resultFind) { //IF THE PRODUCT IS ALREADY ON CART : UPDATE THE QUANTITY
      let quantityInLS = resultFind.quantity;
      let newQuantite = parseInt(resultFind.quantity + quantityChoosed );
      const maxQuantity = 100;
      const maxQuantityAllowed = parseInt(maxQuantity - resultFind.quantity);

      if(newQuantite > maxQuantity){ //IF QUANTITY CHOOSED IS TOO HIGH, INFORM MAXIMUM QUANTITY TO ADD
        newParagraphAddProduct.style.display = 'none';
        newParagraphQuantity.innerHTML = 'Votre panier contient déjà ' + quantityInLS + ' Kanaps. Veuillez choisir une quantité inférieure ou égale à ' + maxQuantityAllowed;
        newParagraphQuantity.style.display = 'flex';
      }          
      if(quantityInLS >= maxQuantity){ //IF CANT ADD ONE MORE PRODUCT
        newParagraphAddProduct.style.display = 'none';
        newParagraphQuantity.innerHTML = 'Votre panier contient déjà ' + maxQuantity + ' Kanaps. Vous ne pouvez en ajouter davantage.';
        newParagraphQuantity.style.display = 'flex';
      }
      if(newQuantite <= maxQuantity){ //UPDATE QUANTITY, CONFIRM PRODUCT ADDED AND SAVE CART
        resultFind.quantity = newQuantite;
        notifProductAdded();
        return localStorage.setItem('product', JSON.stringify(productInLocalStorage ));
      }  

    }else{ //IF THE PRODUCT IS NOT ON CART : PUSH THE ENTIRE ARTICLE ON CART
      productInLocalStorage.push(article);
      notifProductAdded();
      return localStorage.setItem('product', JSON.stringify(productInLocalStorage ));
    }
        
  }else{ //IF LOCAL STORAGE IS EMPTY : CREATE A NEW ARRAY
    cart = [];
    cart.push(article);
    productInLocalStorage = cart;
    notifProductAdded();
    return localStorage.setItem("product", JSON.stringify(cart));
  }

 }
})


