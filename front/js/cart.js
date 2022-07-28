//***creation des elements***
let id = '';
let imgSrc = '';
let imgAlt = '';
let nameProduct = '';
let colorProduct = '';
let priceProduct = '';
let amount ='';

let recup = JSON.parse(localStorage.getItem("product"));
const reducer = (accumulator, currentValue) => accumulator + currentValue;

function cartQuantity(){  //total quantité
  let quantitiesArray = [];
  for(let eachQuantity of recup){
      let eachQuantityLS = parseInt(eachQuantity.quantity);
      quantitiesArray.push(eachQuantityLS);
  }
  const totalQuantity = quantitiesArray.reduce(reducer, 0);
  const displayTotalQuantity = document.getElementById('totalQuantity');
  displayTotalQuantity.innerHTML = totalQuantity;
}
cartQuantity();

function cartPrice(){
let priceArray = [];
const asyncForPrice = recup.map(async (elt) => {
  const productID = elt.id;
  const apiPrice = await fetch('http://localhost:3000/api/products/' + productID).then(res => res.json());
  const productPrice = await apiPrice.price;
  const pricePerKanap = productPrice * elt.quantity; //ok
  priceArray.push(pricePerKanap);
  const totalPrice = await priceArray.reduce(reducer, 0);
  const displayTotalPrice = document.getElementById('totalPrice');
  displayTotalPrice.innerHTML = totalPrice;
})
}
cartPrice();

function removeFromBasket(product){ //supprime l'article du panier
  recup = recup.filter(function (elt) {return elt.color != product.dataset.color || elt.id != product.id} ); 
  localStorage.setItem("product", JSON.stringify(recup)); //enregistre le nouveau panier
}


for(let elt of recup){ //doit rester ouvert pour utiliser element du LS
  id = elt.id;
  
  
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
    amount = elt.quantity;
    colorProduct = elt.color;
    article.setAttribute('id', elt.id);
    article.dataset.color = elt.color;
    image.setAttribute('src', imgSrc);
    image.setAttribute('alt', imgAlt);
    title.innerHTML = nameProduct;
    paragrapheColor.innerHTML = colorProduct;
    paragraphePrice.innerHTML = priceProduct + ' €';
    inputAmount.value = amount;
  })


  const section = document.getElementById('cart__items');
  const article = document.createElement('article');
  article.classList.add('cart__item');
  section.appendChild(article);

  const divImg = document.createElement('div');
  divImg.classList.add('cart__item__img');
  article.appendChild(divImg);
  const image = document.createElement('img');
  divImg.appendChild(image);


  const divCart = document.createElement('div');
  divImg.classList.add('cart__item__content');
  article.appendChild(divCart);

  const divDescription = document.createElement('div');
  divDescription.classList.add('cart__item__content__description');
  divCart.appendChild(divDescription);
  const title = document.createElement('h2');
  divDescription.appendChild(title);
  const paragrapheColor = document.createElement('p');
  divDescription.appendChild(paragrapheColor);
  const paragraphePrice = document.createElement('p');
  divDescription.appendChild(paragraphePrice);

  const divSettings = document.createElement('div');
  divSettings.classList.add('cart__item__content__settings');
  divCart.appendChild(divSettings);

  const divAmount = document.createElement('div');
  divAmount.classList.add('cart__item__content__settings__quantity');
  divSettings.appendChild(divAmount);

  const paragrapheAmount = document.createElement('p');
  paragrapheAmount.innerHTML = 'Qte : ';
  divAmount.appendChild(paragrapheAmount);

  const inputAmount = document.createElement('input');
  inputAmount.setAttribute('type', 'number');
  inputAmount.classList.add('itemQuantity');
  inputAmount.setAttribute('name', 'itemQuantity');
  inputAmount.setAttribute('min', '1');
  inputAmount.setAttribute('max', '100');
  divAmount.appendChild(inputAmount);

  const newParagraphQuantityNull = document.createElement('p');
  divSettings.appendChild(newParagraphQuantityNull);
  newParagraphQuantityNull.style.color = ' var(--footer-secondary-color)';
  newParagraphQuantityNull.style.display = 'none';

  const btnQuantities = document.querySelectorAll('input.itemQuantity');
  const valeurMin = 0.9;
  const valeurMax = 100;

  for(let btnQuantity of btnQuantities){
    if(btnQuantity.value == elt.quantity ){
      btnQuantity.onchange = () => {
      elt.quantity = btnQuantity.value;
      localStorage.setItem("product", JSON.stringify(recup));
      cartQuantity();
      cartPrice();
      }
    }

    btnQuantity.addEventListener('input', function(){
      if(btnQuantity.value > valeurMax ){
        newParagraphQuantityNull.style.display = 'none';
        newParagraphQuantityNull.innerHTML = 'La quantité maximale autorisée est de 100 Kanaps';
        newParagraphQuantityNull.style.display = 'table-caption';
      }
  
      if(btnQuantity.value < valeurMin){
        newParagraphQuantityNull.style.display = 'none';
        newParagraphQuantityNull.innerHTML = 'La quantité minimale autorisée est de 1 Kanap';
        newParagraphQuantityNull.style.display = 'table-caption';
      }
      
      if(btnQuantity.value > valeurMin && btnQuantity.value < valeurMax){
        newParagraphQuantityNull.style.display = 'none';
        localStorage.setItem("product", JSON.stringify(recup));
      }
    }) //fin ecoute btnQuantity.addEventListener('input', function(){ l118
  } //fin boucle for(let btnQuantity of btnQuantities) l116
  
  const divDelete = document.createElement('div');
  divDelete.classList.add('cart__item__content__settings__delete');
  divSettings.appendChild(divDelete);
  const newParagrapheDelete = document.createElement('p');
  newParagrapheDelete.classList.add('deleteItem');
  newParagrapheDelete.innerHTML = 'Supprimer';
  divDelete.appendChild(newParagrapheDelete);

  let deleteButtons = document.querySelectorAll('p.deleteItem');
  for(let deleteButton of deleteButtons){   //pour chaque btn supprimer
      let deleteClosestProduct = deleteButton.closest('article');
      //let articleColor = deleteClosestProduct.dataset.color;
      //  let articleColor = article.getAttribute('data-color');
      deleteButton.addEventListener('click', function(){
          removeFromBasket(deleteClosestProduct);
          cartQuantity();
          cartPrice();
        if(elt.id == deleteClosestProduct.id && elt.color == deleteClosestProduct.dataset.color){
          deleteClosestProduct.remove();//supprime article de la page
          //const deleteElt = recup.filter(p => p.id != deleteClosestProduct.id && p.color != deleteClosestProduct.dataset.color); 
          //recup.slice(elt);
          //removeFromBasket(elt); //essai de supprimer l'element du LS
          localStorage.setItem("product", JSON.stringify(recup)); //enregistre le nouveau panier
        }
      }) //fin ecoute deleteButton.addEventListener('click', function(){ l.150
  }//fin for(let deleteButton of deleteButtons){ l.147

}



//formulaire

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



let contact = {
  firstName : '',
  lastName : '',
  address : '',
  city : '',
  email : ''
}


const btnOrder = document.getElementById('order');

firstName.addEventListener('change', function(event){
  const firstNameValue = event.target.value;
  if(/^[a-z ,.'-]+$/.test(firstNameValue)){
    contact.firstName = firstNameValue;
    firstNameErrorMsg.innerHTML = '';
  }
  else {
    firstNameErrorMsg.innerHTML = "Veuillez entrer votre prénom";
    //btnOrder.disabled = true;
  }
})


lastName.addEventListener('change', function(event){
  const lastNameValue = event.target.value;
  if(/^[a-z ,.'-]+$/.test(lastNameValue)){
    contact.lastName = lastNameValue;
    lastNameErrorMsg.innerHTML = '';
  }
  else {
    lastNameErrorMsg.innerHTML = "Veuillez entrer votre nom de famille";
    //btnOrder.disabled = true;
  }
})

address.addEventListener('change', function(event){
  const addressValue = event.target.value;
  if(/^[#.0-9a-zA-Z\s,-]+$/.test(addressValue)){
    contact.address = addressValue;
    addressErrorMsg.innerHTML = '';
  }
  else {
    addressErrorMsg.innerHTML = "Veuillez entrer une adresse valide";
   // btnOrder.disabled = true;
  }
})

city.addEventListener('change', function(event){
  const cityValue = event.target.value;
  if(/^[a-z ,.'-]+$/.test(cityValue)){
    contact.city = cityValue;
    cityErrorMsg.innerHTML = '';
  }
  else {
    cityErrorMsg.innerHTML = "Veuillez entrer un nom de ville valide";
    //btnOrder.disabled = true;
  }
})

email.addEventListener('change', function(event){
  const emailValue = event.target.value;
  if(/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+[@]+[a-zA-Z]+[.]+[a-zA-Z]+$/.test(emailValue)){
    contact.email = emailValue;
    emailErrorMsg.innerHTML = '';
  }
  else {
    emailErrorMsg.innerHTML = "Veuillez entrer une adresse mail valide";
  }
})

let productArray = []; //recuperer produit du panier 
for(let elt of recup){
  const productId = elt.id;
  productArray.push(productId);
}

const formContact = document.querySelector('form.cart__order__form');
btnOrder.addEventListener('click', function(e){
  e.preventDefault();

const postContactAndProduct = fetch("http://localhost:3000/api/products/order", { //const promise01
  method : "POST",
  headers : {"Content-type" : "application/json"},
  body :  JSON.stringify({contact : contact, products : productArray}) //contact+array =aenvoyer
  })
  console.log(contact);
  console.log(productArray);
  
  postContactAndProduct.then(async(response) =>{
  

    try{
  console.log('response', response);
  const contenu = await response.json();
  console.log(contenu.orderId);
  location.href = 'confirmation.html?orderId=' + contenu.orderId;
  //formContact.action = "confirmation.html/" + await contenu.orderId;
  //console.log(btnOrder.action);
     // + await contenu.orderId
    } catch(e){
      console.log(e);
    }

})
})




/*

btnOrder.addEventListener('click', function(e){
  e.preventDefault();

async function getOrderId(){
  order =  await fetch("http://localhost:3000/api/products/order", {
  method : "POST",
  headers : {"Content-type" : "application/json"},
  body :  JSON.stringify({contact : contact, products : productArray})
  })
  console.log(contact);
  console.log(productArray);
}
getOrderId();
console.log('order', order);
console.log('orderid', order.id);
recup.setItem('orderId', order.id);
});
*/



//const apiPrice = await fetch('http://localhost:3000/api/products/' + productID).then(res => res.json());
  /*ok
  btnOrder.addEventListener('click', function(e){
  e.preventDefault();

fetch("http://localhost:3000/api/products/order", {
  method : "POST",
  headers : {"Content-type" : "application/json"},
  body :  JSON.stringify({contact : contact, products : productArray})
  })
  console.log(contact);
  console.log(productArray);
})






essai

btnOrder.addEventListener('click', function(e){
  e.preventDefault();

async function getOrderId(){
  order =  await fetch("http://localhost:3000/api/products/order", {
  method : "POST",
  headers : {"Content-type" : "application/json"},
  body :  JSON.stringify({contact : contact, products : productArray})
  })
  console.log(contact);
  console.log(productArray);
}
getOrderId();
console.log('order', order);
console.log('orderid', order.id);
recup.setItem('orderId', order.id);
});


fetch("http://localhost:3000/api/products/order")
  .then(res => res.json())
  .then(data => { console.log(data);})
  .catch(err => console.log(err))

  .then(res => res.json())
  .then(data => {
  })
*/

/*
function forms(inputs){
  inputs.addEventListener('change', function(event){
    let champs = event.innerHTML;
let objectForm = {
  firstName : forms(firstName),
  lastName : forms(lastName),
  address : forms(address),
  city : forms(city),
  email : forms(email)
}; //données formulaire

console.log(objectForm);
  })

  forms(firstName);
  forms(lastName);
  forms(address);
  forms(city);
  forms(email);
}
*/


//regex pr nom prenom ville [a-zA-Z]
//regex pr adresse [a-zA-Z0-9]
//regex pr email [a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+[@]+[a-zA-Z]+[.]+[a-zA-Z]+
//localStorage.setItem("contact", JSON.stringify(objectForm, productArray)); // possible de POST array et objet en mm tps ?
/*
fetch("http://localhost:3000/api/products/", {
  method : "POST",
  header : {
    "Accept" : "application/json"
  },
  body : { contact : objectForm, tableau : productArray
  }
  })
  .then(res => res.json())
  .then(data => {
  })



*/





























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

