/*________CREATION OF THE ELEMENTS________*/
let id = '';
let imgSrc = '';
let imgAlt = '';
let nameProduct = '';
let colorProduct = '';
let priceProduct = '';
let quantity ='';

/*________RETRIEVE PRODUCTS ON LOCAL STORAGE________*/
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

/*________CREATE THE FONCTION TO ADD UP VALUES OF AN ARRAY________*/
let reducer = (accumulator, currentValue) => accumulator + currentValue;

/*________RETRIEVE HTML ELEMENTS________*/
const displayTotalPrice = document.getElementById('totalPrice');
const displayTotalQuantity = document.getElementById('totalQuantity');

const minValue = 0.9;
const maxValue = 100;

/*________IF CART IS EMPTY DISPLAYS 0 ARTICLE AND 0 EURO________*/
if(productInLocalStorage.length == 0){
  displayTotalPrice.innerHTML = 0;
  displayTotalQuantity.innerHTML = 0;
}

/*________TOTAL QUANTITY________*/
function cartQuantity(){ 
  let quantitiesArray = []; //ARRAY OF EACH QUANTITIES
  for(let eachQuantity of productInLocalStorage){
      let eachQuantityLS = parseInt(eachQuantity.quantity); //RETRIEVE ALL THE QUANTITES ON THE LOCAL STORAGE
      quantitiesArray.push(eachQuantityLS); // AND PUT THEM ON THE ARRAY
  }
  const totalQuantity = quantitiesArray.reduce(reducer, 0); // ADD UP THEM TOGETHER TO GET THE TOTAL QUANTITY OF ALL THE CART
  displayTotalQuantity.innerHTML = Number(0 + totalQuantity); //DISPLAYS THE TOTAL QUANTITY
}

/*________TOTAL PRICE________*/
function cartPrice(){
let priceArray = []; //ARRAY OF EACH PRICE
  const asyncForPrice = productInLocalStorage.map(async (elt) => {
    const productID = elt.id;
    const apiPrice = await fetch('http://localhost:3000/api/products/' + productID).then(res => res.json()); //RETRIEVE PRODUCT ID
    const productPrice = await apiPrice.price;//RETRIEVE THE PRICE OF PRODUCT ID
    const pricePerKanap = productPrice * elt.quantity; //MULTIPLY PRICE*QUANTITY FOR EACH PROCDUCT
    priceArray.push(pricePerKanap); //AND PUT ALL OF THEM ON THE ARRAY
    const totalPrice = await priceArray.reduce(reducer, 0); // ADD UP THEM TOGETHER TO GET THE TOTAL PRICE OF ALL THE CART
    displayTotalPrice.innerHTML = Number(0 + totalPrice); //DISPLAY THE TOTAL PRICE
    if(productInLocalStorage == []){ // IF LOCAL STORAGE IS EMPTY : DISPLAYS 0
      displayTotalPrice.innerHTML = 0;
    }
  })
}

function removeFromBasket(product){ //DELETE PRODUCT FORM CART
  productInLocalStorage = productInLocalStorage.filter(function (elt) {return elt.color != product.dataset.color || elt.id != product.id} ); //FILTER TO GET THE RIGHT PRODUCT
  localStorage.setItem("product", JSON.stringify(productInLocalStorage)); //SAVE THE NEW CART
}

if(productInLocalStorage){ //IF LOCAL STORAGE IS -NOT- EMPTY
for(let elt of productInLocalStorage){ //EACH ELEMENT OF LOCAL STORAGE
  id = elt.id;
  
  cartQuantity(); //CALCULATE AND DISPLAYS TOTAL QUANTITY
  cartPrice(); //CALCULATE AND DISPLAYS TOTAL PRICE

  /*________REPLACE QUANTITY > 100 BY 100 IN LOCAL STORAGE________*/
  if(elt.quantity > maxValue ){ //IF QUANTITY IS UPPER TO 100 -IN THE LOCAL STORAGE-
    elt.quantity = 100; //REPLACE IT BY 100
    localStorage.setItem("product", JSON.stringify(productInLocalStorage)); //SAVE CART
    cartQuantity(); //RECALCULATE AND DISPLAYS TOTAL QUANTITY
    cartPrice();  //RECALCULATE AND DISPLAYS TOTAL PRICE
  }

  /*________REPLACE QUANTITY < 1 BY 1 IN LOCAL STORAGE________*/
  if(elt.quantity < minValue ){ //IF QUANTITY IS LOWER TO 1
    elt.quantity = 1; //REPLACE IT BY 1
    localStorage.setItem("product", JSON.stringify(productInLocalStorage)); //SAVE CART
    cartQuantity(); //RECALCULATE AND DISPLAYS TOTAL QUANTITY
    cartPrice();  //RECALCULATE AND DISPLAYS TOTAL PRICE
  }
  

  /*________RETRIEVES PRODUCT INFO FROM API AND DISPLAYS IT________*/ 
  fetch("http://localhost:3000/api/products/")
  .then(res => res.json())
  .then(data => { 
    for (let i of data){
      if(elt.id == i._id){
      imgSrc = i.imageUrl;
      imgAlt = i.altTxt;
      nameProduct = i.name;
      priceProduct = i.price;
      }
    }
    quantity = elt.quantity;
    colorProduct = elt.color;
    article.setAttribute('id', elt.id);
    article.dataset.color = elt.color;
    image.setAttribute('src', imgSrc);
    image.setAttribute('alt', imgAlt);
    title.innerHTML = nameProduct;
    paragrapheColor.innerHTML = colorProduct;
    paragraphePrice.innerHTML = priceProduct + ' €';
    inputQuantity.value = quantity;

    for(let btnQuantity of btnQuantities){ //FOR EACH QUANTITY INPUT
      if(btnQuantity.value == elt.quantity ){  //IF CART INPUT QUANTITY = QUANTITY ON LOCAL STORAGE
        btnQuantity.onchange = () => { //IF QUANTITY IS CHANGED
          elt.quantity = Number(btnQuantity.value); //QUANTITY CHANGED ON CART PAGE IS SAVED ON LOCAL STORAGE 
          localStorage.setItem("product", JSON.stringify(productInLocalStorage)); //SAVE CART
          cartQuantity(); //RECALCULATE AND DISPLAYS TOTAL QUANTITY
          cartPrice();//RECALCULATE AND DISPLAYS TOTAL PRICE
  
          /*________ROUND DECIMAL NUMBER________*/
          btnQuantity.value = Math.round(btnQuantity.value); //INPUT QUANTITY ON CART
          elt.quantity = Math.round(btnQuantity.value); // QUANTITY ON  LOCAL STORAGE
          cartQuantity();//RECALCULATE AND DISPLAYS TOTAL QUANTITY
          cartPrice();//RECALCULATE AND DISPLAYS TOTAL PRICE
          localStorage.setItem("product", JSON.stringify(productInLocalStorage));//SAVE CART
  
          /*________REPLACE QUANTITY > 100 BY 100 IN QUANTITY INPUT________*/
          if(btnQuantity.value > maxValue ){  //IF QUANTITY INPUT IS UPPER TO 100 -IN CART PAGE-
            btnQuantity.value = 100; //REPLACE IT BY 100
            elt.quantity = 100; //ALSO ON LOCAL STORAGE
            localStorage.setItem("product", JSON.stringify(productInLocalStorage)); //SAVE CART
            cartQuantity();//RECALCULATE AND DISPLAYS TOTAL QUANTITY
            cartPrice();//RECALCULATE AND DISPLAYS TOTAL PRICE
          }
  
          /*________REPLACE QUANTITY < BY 1 IN QUANTITY INPUT________*/
          if(btnQuantity.value < minValue ){//IF QUANTITY INPUT IS LOWER THAN 1 -IN CART PAGE-
            btnQuantity.value = 1; //CHANGE IT BY 1
            elt.quantity = 1; //ALSO ON LOCAL STORAGE
            localStorage.setItem("product", JSON.stringify(productInLocalStorage)); //SAVE CART
            cartQuantity();//RECALCULATE AND DISPLAYS TOTAL QUANTITY
            cartPrice();//RECALCULATE AND DISPLAYS TOTAL PRICE
          }

        }
      }

/*________WARNING IF QUANITY IS INVALID________*/ 
      btnQuantity.addEventListener('input', function(){ //ON INPUT (REAL TIME) NOT IN CHANGE
        if(btnQuantity.value > maxValue ){ //IF TOO HIGHT
          newParagraphQuantityNull.style.display = 'none';
          newParagraphQuantityNull.innerHTML = 'La quantité maximale autorisée est de 100 Kanaps';
          newParagraphQuantityNull.style.display = 'table-caption';
        }
    
        if(btnQuantity.value < minValue){ //IF TOO LOW 0 OR NEGATIF NUMBER
          newParagraphQuantityNull.style.display = 'none';
          newParagraphQuantityNull.innerHTML = 'La quantité minimale autorisée est de 1 Kanap';
          newParagraphQuantityNull.style.display = 'table-caption';
        }
        
        if(btnQuantity.value > minValue && btnQuantity.value < maxValue){ //IF QUANTITY IS VALID : ERASE ERROR MESSAGE
          newParagraphQuantityNull.style.display = 'none';
          localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        }
      }) 
    } //END OF LOOP FOR OF ON LINE 109
    
  }) //END OF 2ND FETCH.THEN
  .catch(error => alert(error))


  /*________CREATE EACH CARD OF PRODUCT________*/ 
  /*________ARTICLE________*/ 
  const section = document.getElementById('cart__items');
  const article = document.createElement('article');
  article.classList.add('cart__item');
  section.appendChild(article);

  /*________IMAGE________*/ 
  const divImg = document.createElement('div');
  divImg.classList.add('cart__item__img');
  article.appendChild(divImg);
  const image = document.createElement('img');
  divImg.appendChild(image);

  /*________INFO________*/ 
  const divCart = document.createElement('div');
  divCart.classList.add('cart__item__content');
  article.appendChild(divCart);

  /*________NAME, COLOR AND PRICE________*/ 
  const divDescription = document.createElement('div');
  divDescription.classList.add('cart__item__content__description');
  divCart.appendChild(divDescription);
  const title = document.createElement('h2');
  divDescription.appendChild(title);
  const paragrapheColor = document.createElement('p');
  divDescription.appendChild(paragrapheColor);
  const paragraphePrice = document.createElement('p');
  divDescription.appendChild(paragraphePrice);

  /*________QUANTITY INPUT________*/ 
  const divSettings = document.createElement('div');
  divSettings.classList.add('cart__item__content__settings');
  divCart.appendChild(divSettings);

  const divQuantity = document.createElement('div');
  divQuantity.classList.add('cart__item__content__settings__quantity');
  divSettings.appendChild(divQuantity);

  const paragraphQuantity = document.createElement('p');
  paragraphQuantity.innerHTML = 'Qte : ';
  divQuantity.appendChild(paragraphQuantity);

  const inputQuantity = document.createElement('input');
  inputQuantity.setAttribute('type', 'number');
  inputQuantity.classList.add('itemQuantity');
  inputQuantity.setAttribute('name', 'itemQuantity');
  inputQuantity.setAttribute('min', '1');
  inputQuantity.setAttribute('max', '100');
  divQuantity.appendChild(inputQuantity);

  const newParagraphQuantityNull = document.createElement('p');
  divSettings.appendChild(newParagraphQuantityNull);
  newParagraphQuantityNull.style.color = ' var(--footer-secondary-color)';
  newParagraphQuantityNull.style.display = 'none';

  const btnQuantities = document.querySelectorAll('input.itemQuantity');

  /*________DELETE BUTTON________*/ 
  const divDelete = document.createElement('div');
  divDelete.classList.add('cart__item__content__settings__delete');
  divSettings.appendChild(divDelete);
  const newParagrapheDelete = document.createElement('p');
  newParagrapheDelete.classList.add('deleteItem');
  newParagrapheDelete.innerHTML = 'Supprimer';
  divDelete.appendChild(newParagrapheDelete);

  let deleteButtons = document.querySelectorAll('p.deleteItem');
  for(let deleteButton of deleteButtons){   //FOR EACH DELETE BUTTON
      let deleteClosestProduct = deleteButton.closest('article');//SEARCH THE CLOSEST ARTICLE FROM DELETE BUTTON

      deleteButton.addEventListener('click', function(){
          removeFromBasket(deleteClosestProduct);
          cartQuantity();
          cartPrice();
          localStorage.setItem("product", JSON.stringify(productInLocalStorage));

          if(productInLocalStorage.length == 0){
            window.localStorage.removeItem('product');
            displayTotalPrice.innerHTML = 0;
          }

        if(elt.id == deleteClosestProduct.id && elt.color == deleteClosestProduct.dataset.color){
          deleteClosestProduct.remove();//supprime article de la page
            }
      }) //fin ecoute deleteButton.addEventListener('click', function(){ l.150
  }//fin for(let deleteButton of deleteButtons){ l.147

}
}  
else{ //IF LOCAL STORAGE IS EMPTY : TOTAL QUANTITY AND TOTAL PRICE ARE EQUAL TO 0 AND LOCAL STORAGE DO NOT CONTAINS A PRODUCT KEY
  displayTotalQuantity.innerHTML = 0;
  displayTotalPrice.innerHTML = 0;
  window.localStorage.removeItem('product');
 }


/*________FORM PART________*/ 

/*________EACH INPUT OF FORM________*/ 
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const emailErrorMsg = document.getElementById('emailErrorMsg');


/*________OBJECT CONTACT TO POST ON API________*/ 
let contact = {
  firstName : '',
  lastName : '',
  address : '',
  city : '',
  email : ''
}


const btnOrder = document.getElementById('order'); //SUBMIT BUTTON

/*________INPUTS ARE INVALIDS AT BEGINNING________*/ 
let firstNameValid = false;
let lastNameValid = false;
let adressValid = false;
let cityValid = false;
let emailValid = false;

/*________FOR EACH INPUT : TEST VALIDITY WITH REGEX________*/ 
/*________FIRSTNAME________*/ 
firstName.addEventListener('change', function(event){
  const firstNameValue = event.target.value;
  if(/^[a-zA-Z ,.'-]+$/.test(firstNameValue)){ //IF VALID
    contact.firstName = firstNameValue; //PUSH THE VALUE ON THE OBJECT CONTACT
    firstNameErrorMsg.innerHTML = ''; //NO ERROR MESSAGE
    firstNameValid = true; //IF VALID, RETURN TRUE
  }
  else { // IF INVALID
    firstNameErrorMsg.innerHTML = "Veuillez entrer votre prénom"; //ERROR MESSAGE
  }
})

/*________LASTNAME________*/ 
lastName.addEventListener('change', function(event){
  const lastNameValue = event.target.value;
  if(/^[a-zA-Z ,.'-]+$/.test(lastNameValue)){
    contact.lastName = lastNameValue;
    lastNameErrorMsg.innerHTML = '';
    lastNameValid = true;
  }
  else {
    lastNameErrorMsg.innerHTML = "Veuillez entrer votre nom de famille";
  }
})

/*________ADRESS________*/ 
address.addEventListener('change', function(event){
  const addressValue = event.target.value;
  if(/^[#.0-9a-zA-Z\s,-]+$/.test(addressValue)){
    contact.address = addressValue;
    addressErrorMsg.innerHTML = '';
    adressValid = true;
  }
  else {
    addressErrorMsg.innerHTML = "Veuillez entrer une adresse valide";
  }
})

/*________CITY________*/ 
city.addEventListener('change', function(event){
  const cityValue = event.target.value;
  if(/^[a-zA-Z ,.'-]+$/.test(cityValue)){
    contact.city = cityValue;
    cityErrorMsg.innerHTML = '';
    cityValid = true;
  }
  else {
    cityErrorMsg.innerHTML = "Veuillez entrer un nom de ville valide";
  }
})

/*________EMAIL________*/ 
email.addEventListener('change', function(event){
  const emailValue = event.target.value;
  if(/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+[@]+[a-zA-Z]+[.]+[a-zA-Z]+$/.test(emailValue)){
    contact.email = emailValue;
    emailErrorMsg.innerHTML = '';
    emailValid= true;
  }
  else {
    emailErrorMsg.innerHTML = "Veuillez entrer une adresse mail valide";
  }
})

/*________RETRIEVES ALL THE PRODUCTS FROM LOCAL STORAGE AND PUSH THEM INTO AN ARRAY________*/ 
let productArray = []; 
if(productInLocalStorage){
  for(let elt of productInLocalStorage){
    const productId = elt.id;
    productArray.push(productId);
  }
}

/*________CREATE AND STYLING ERROR MESSAGE IF CART IS EMPTY OR FORM INVALID________*/ 
const submitErrorMessage = document.createElement('p');
submitErrorMessage.style.textAlign = 'center';
submitErrorMessage.style.fontSize = 'larger';
const divParentCartOrder = document.querySelector('.cart__order__form');
submitErrorMessage.style.color = ' var(--footer-secondary-color)';
submitErrorMessage.style.paddingTop = '2rem';
submitErrorMessage.style.fontWeight = 'bold';
submitErrorMessage.style.display = 'none';
divParentCartOrder.appendChild(submitErrorMessage);
const divBtnOrder = document.querySelector('div.cart__order__form__submit');
divParentCartOrder.insertBefore(submitErrorMessage, divBtnOrder); //PLACE THE ERROR MESSAGE BEFORE THE SUBMIT BUTTON
submitErrorMessage.innerHTML = '';

/*________CLICK ON SUBMIT BUTTON________*/ 
btnOrder.addEventListener('click', function(e){
  if(displayTotalPrice.innerHTML < 1){  //WARNING IF CART IS EMPTY    
    submitErrorMessage.innerHTML = 'Votre panier est vide !';
    submitErrorMessage.style.display = 'block';
    e.preventDefault(); //PREVENT PAGE RELOADING 
  } else if(firstNameValid == false || //WARNING IF SOME OF THE INPUTS IS NOT COMPLETED
    lastNameValid == false || 
    adressValid == false || 
    cityValid == false || 
    emailValid == false ){
    submitErrorMessage.innerHTML = 'Veuillez renseigner tous les champs';
    submitErrorMessage.style.display = 'block';
    e.preventDefault(); //PREVENT PAGE RELOADING 
  }
  else {
    submitErrorMessage.innerHTML = ''; //CART IS NOT EMPTY AND ALL THE INPUTS ARE COMPLETED
    e.preventDefault(); //PREVENT PAGE RELOADING TO REDIRECT ON CONFIRMATION PAGE

    /*________POST THE CONTACT OBJECT AND THE PRODUCTS ARRAY TO THE API________*/ 
    const postContactAndProduct = fetch("http://localhost:3000/api/products/order", { 
      method : "POST",
      headers : {"Content-type" : "application/json"},
      body : JSON.stringify({contact : contact, products : productArray}) 
    })
      
    /*________REDIRECT TO CONFIRMATION PAGE________*/ 
    postContactAndProduct.then(async(response) =>{
      try{
      const contenu = await response.json();
      location.href = 'confirmation.html?orderId=' + contenu.orderId; //REDIRECT TO CONFIRMATION WITH THE ORDER ID WITHOUT STORE IT ON LOCAL STORAGE
      } catch(e){
          error => alert(error);
      }
    })

  }
})






//icone kanap
function iconeQuantity(){  //total quantité
  let quantitiesArray = [];
  for(let eachQuantity of productInLocalStorage){
      let eachQuantityLS = parseInt(eachQuantity.quantity);
      quantitiesArray.push(eachQuantityLS);
  }
  let reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalQuantity = quantitiesArray.reduce(reducer, 0);
  
  //const displayTotalQuantity = document.getElementById('totalQuantity');
  displayTotalQuantity.innerHTML = Number(0 + totalQuantity); //avt   displayTotalQuantity.innerHTML = totalQuantity; mais pour avoir 0 si panier vide, addition
}

const nav = document.querySelector('.limitedWidthBlock nav ul');
const divIcone = document.createElement('div');
nav.appendChild(divIcone);
const quantityInCard = document.createElement('p');
const iconeKanap = document.createElement('p');
divIcone.appendChild(quantityInCard);
divIcone.appendChild(iconeKanap);
divIcone.style.display = 'flex';
quantityInCard.innerHTML = Number(totalQuantity);
//quantityInCard.style.fontSize = 'xl';
iconeKanap.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="font-size: xx-small;"><path d="M592 224C565.5 224 544 245.5 544 272V352H96V272C96 245.5 74.51 224 48 224S0 245.5 0 272v192C0 472.8 7.164 480 16 480h64c8.836 0 15.1-7.164 15.1-16L96 448h448v16c0 8.836 7.164 16 16 16h64c8.836 0 16-7.164 16-16v-192C640 245.5 618.5 224 592 224zM128 272V320h384V272c0-38.63 27.53-70.95 64-78.38V160c0-70.69-57.31-128-128-128H191.1c-70.69 0-128 57.31-128 128L64 193.6C100.5 201.1 128 233.4 128 272z"></path></svg>';
//iconeKanap.style.fontSize = '3px';


//  <div style="/* margin: auto; */position: fixed;top: -40px;right: 10px;/* display: flex; */justify-content: flex-start;align-items: center;">
//     <p style="
//     position: relative;
//     /* font-size: x-large; */
//     top: 50px;
// ">totalQuantity</p>
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="font-size: xx-small;"><path d="M592 224C565.5 224 544 245.5 544 272V352H96V272C96 245.5 74.51 224 48 224S0 245.5 0 272v192C0 472.8 7.164 480 16 480h64c8.836 0 15.1-7.164 15.1-16L96 448h448v16c0 8.836 7.164 16 16 16h64c8.836 0 16-7.164 16-16v-192C640 245.5 618.5 224 592 224zM128 272V320h384V272c0-38.63 27.53-70.95 64-78.38V160c0-70.69-57.31-128-128-128H191.1c-70.69 0-128 57.31-128 128L64 193.6C100.5 201.1 128 233.4 128 272z"></path></svg>
// </div>
// <p style="
//     position: relative;
//     /* font-size: x-large; */
//     top: 50px;
// ">totalQuantity</p>
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="font-size: xx-small;"><path d="M592 224C565.5 224 544 245.5 544 272V352H96V272C96 245.5 74.51 224 48 224S0 245.5 0 272v192C0 472.8 7.164 480 16 480h64c8.836 0 15.1-7.164 15.1-16L96 448h448v16c0 8.836 7.164 16 16 16h64c8.836 0 16-7.164 16-16v-192C640 245.5 618.5 224 592 224zM128 272V320h384V272c0-38.63 27.53-70.95 64-78.38V160c0-70.69-57.31-128-128-128H191.1c-70.69 0-128 57.31-128 128L64 193.6C100.5 201.1 128 233.4 128 272z"></path></svg> 

//div ac 2 p different, 1p xs pour svg et 1 xl pour chiffre





//a mettre 
//  <div style="/* margin: auto; */position: fixed;top: -40px;right: 10px;/* display: flex; */justify-content: flex-start;align-items: center;">
//     <p style="
//     position: relative;
//     /* font-size: x-large; */
//     top: 50px;
// ">totalQuantity</p>
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="font-size: xx-small;"><path d="M592 224C565.5 224 544 245.5 544 272V352H96V272C96 245.5 74.51 224 48 224S0 245.5 0 272v192C0 472.8 7.164 480 16 480h64c8.836 0 15.1-7.164 15.1-16L96 448h448v16c0 8.836 7.164 16 16 16h64c8.836 0 16-7.164 16-16v-192C640 245.5 618.5 224 592 224zM128 272V320h384V272c0-38.63 27.53-70.95 64-78.38V160c0-70.69-57.31-128-128-128H191.1c-70.69 0-128 57.31-128 128L64 193.6C100.5 201.1 128 233.4 128 272z"></path></svg>
// </div>
// <p style="
//     position: relative;
//     /* font-size: x-large; */
//     top: 50px;
// ">totalQuantity</p>
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="font-size: xx-small;"><path d="M592 224C565.5 224 544 245.5 544 272V352H96V272C96 245.5 74.51 224 48 224S0 245.5 0 272v192C0 472.8 7.164 480 16 480h64c8.836 0 15.1-7.164 15.1-16L96 448h448v16c0 8.836 7.164 16 16 16h64c8.836 0 16-7.164 16-16v-192C640 245.5 618.5 224 592 224zM128 272V320h384V272c0-38.63 27.53-70.95 64-78.38V160c0-70.69-57.31-128-128-128H191.1c-70.69 0-128 57.31-128 128L64 193.6C100.5 201.1 128 233.4 128 272z"></path></svg> 

