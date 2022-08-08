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



/*________CREATE AND STYLING ELEMENTS FOR SVG THAT DISPLAYS QUANTITY OF PRODUCTS ON CART________*/
let reducer = (accumulator, currentValue) => accumulator + currentValue;
const nav = document.querySelector('.limitedWidthBlock nav ul');
let totalQuantity = ''
const divIcone = document.createElement('div');
nav.appendChild(divIcone);
const quantityInCard = document.createElement('p');
const iconeKanap = document.createElement('p');
divIcone.appendChild(quantityInCard);
divIcone.appendChild(iconeKanap);
divIcone.style.alignSelf = 'center';
divIcone.style.alignItems = 'center';
divIcone.style.borderRadius = '1rem';
divIcone.style.height = '1.9rem';
divIcone.style.width = '1.7rem';
divIcone.style.justifyContent = 'space-evenly';
divIcone.style.paddingLeft = '0.2rem';
divIcone.style.marginLeft = '0.2rem';
divIcone.style.position = 'relative';
divIcone.style.top = '-0.5rem';
quantityInCard.style.color = "black";
quantityInCard.style.fontSize = 'x-small';
quantityInCard.style.fontWeight = 'bold';
iconeKanap.style.width = '1rem';
iconeKanap.style.height = '0.5rem';

function iconKanapOnCart(){
  if(productInLocalStorage){
    let quantitiesArrayForIcone = [];
    for(let eachQuantity of productInLocalStorage){
      let eachQuantityLS = parseInt(eachQuantity.quantity);
      quantitiesArrayForIcone.push(eachQuantityLS);
    }
    totalQuantity = quantitiesArrayForIcone.reduce(reducer, 0);
    quantityInCard.style.display = 'initial';
    iconeKanap.style.display = 'initial';
    divIcone.style.border = '0.1rem dotted #3498db';
    divIcone.style.display = 'flex'; 
    quantityInCard.innerHTML = Number(totalQuantity);  
    iconeKanap.innerHTML = '<svg style="width: 1rem; height: 5rem;"><path d="M 10.656 4.032 C 10.179 4.032 9.792 4.419 9.792 4.896 V 6.336 H 1.728 V 4.896 C 1.728 4.419 1.3412 4.032 0.864 4.032 S 0 4.419 0 4.896 v 3.456 C 0 8.5104 0.129 8.64 0.288 8.64 h 1.152 c 0.159 0 0.2718 -0.129 0.2718 -0.288 L 1.728 8.064 h 8.064 v 0.288 c 0 0.159 0.129 0.288 0.288 0.288 h 1.152 c 0.159 0 0.288 -0.129 0.288 -0.288 v -3.456 C 11.52 4.419 11.133 4.032 10.656 4.032 z M 2.304 4.896 V 5.76 h 6.912 V 4.896 c 0 -0.6953 0.4955 -1.2771 1.152 -1.4108 V 2.88 c 0 -1.2724 -1.0316 -2.304 -2.304 -2.304 H 3.4398 c -1.2724 0 -2.304 1.0316 -2.304 2.304 L 1.152 3.4848 C 1.809 3.6198 2.304 4.2012 2.304 4.896 z"></path></svg>';
       
  }else{
    divIcone.style.display = 'none';
    quantityInCard.style.display = 'none';
    iconeKanap.style.display = 'none';
    divIcone.style.border = 'none';
  }
}
 
iconKanapOnCart();


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
     
    if(resultFind) { //IF THE PRODUCT IS ALREADY ON CART : UPDATE THE QUANTITY IF QUANTIY IS NOT TOO HIGHT
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
        iconKanapOnCart();
        return localStorage.setItem('product', JSON.stringify(productInLocalStorage ));
      }  

    }else{ //IF THE PRODUCT IS NOT ON CART : PUSH THE ENTIRE ARTICLE ON CART
      productInLocalStorage.push(article);
      notifProductAdded();    
      iconKanapOnCart();
      return localStorage.setItem('product', JSON.stringify(productInLocalStorage ));
    }
        
  }else{ //IF LOCAL STORAGE IS EMPTY : CREATE A NEW ARRAY
    cart = [];
    cart.push(article);
    productInLocalStorage = cart;
    notifProductAdded(); 
    iconKanapOnCart();
    return localStorage.setItem("product", JSON.stringify(cart));
  }

 }
})


