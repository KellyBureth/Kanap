//***creation des elements***
let id = '';
let imgSrc = '';
let imgAlt = '';
let nameProduct = '';
let colorProduct = '';
let priceProduct = '';
let amount ='';

let recup = JSON.parse(localStorage.getItem("product"));

for(let elt of recup){ //doit rester ouvert pour utiliser element du LS
  id = elt.id;
  //si je ferme ici : 1 seul produit, le dernier, si je ferme tout en bas, le dernier produit ajouté dupliqué 3 fois (car 3 id != ds le panier actuel). d'ailleur je ne peux pas fermer car la suite du code a besoin de id qui vaut l'id des produits selectionnés

  fetch("http://localhost:3000/api/products/")
  .then(res => res.json())
  .then(data => { // doit rester ouvert pour recuperer element de l'API (image kanap par ex)
    for (let i of data){
      if(elt.id == i._id){
      imgSrc = i.imageUrl;
      imgAlt = i.altTxt;
      nameProduct = i.name;
      priceProduct = i.price;
      //console.log(i)
      }
    }
  
    amount = elt.quantity;
    colorProduct = elt.color;
    const section = document.getElementById('cart__items');

    const article = document.createElement('article');
    article.classList.add('cart__item');
    article.setAttribute('id', elt.id);
    //article.setAttribute('data-color', elt.color);
    article.dataset.color = elt.color;
    section.appendChild(article);

    const divImg = document.createElement('div');
    divImg.classList.add('cart__item__img');
    article.appendChild(divImg);

    const image = document.createElement('img');
    image.setAttribute('src', imgSrc);
    image.setAttribute('alt', imgAlt);
    divImg.appendChild(image);


    const divCart = document.createElement('div');
    divImg.classList.add('cart__item__content');
    article.appendChild(divCart);

    const divDescription = document.createElement('div');
    divDescription.classList.add('cart__item__content__description');
    divCart.appendChild(divDescription);

    const title = document.createElement('h2');
    title.innerHTML = nameProduct;
    divDescription.appendChild(title);

    const paragrapheColor = document.createElement('p');
    paragrapheColor.innerHTML = colorProduct;
    divDescription.appendChild(paragrapheColor);

    const paragraphePrice = document.createElement('p');
    paragraphePrice.innerHTML = priceProduct + ' €';
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
    inputAmount.value = amount;
    divAmount.appendChild(inputAmount);



    const newParagraphQuantityNull = document.createElement('p');
    divSettings.appendChild(newParagraphQuantityNull);
    newParagraphQuantityNull.style.color = ' var(--footer-secondary-color)';
    newParagraphQuantityNull.style.display = 'none';

    const btnQuantities = document.querySelectorAll('input.itemQuantity');
    const valeurMin = 0.9;
    const valeurMax = 100;

    
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    function cartQuantity(){  //total quantité
        let quantitiesArray = [];
        let priceArray = [];
        for(let eachQuantity of recup){
            let eachQuantityLS = Number(eachQuantity.quantity);
            quantitiesArray.push(eachQuantityLS);

                    //pour total prix
                    let pricePerKanap = eachQuantityLS * parseInt(paragraphePrice.innerHTML); 
                    console.log(parseInt(paragraphePrice.innerHTML));
                    console.log(pricePerKanap);
                    priceArray.push(pricePerKanap);
                    console.log(priceArray);

        }
        const totalQuantity = quantitiesArray.reduce(reducer, 0);
        console.log(totalQuantity);
        const displayTotalQuantity = document.getElementById('totalQuantity');
        displayTotalQuantity.innerHTML = totalQuantity;

        const totalPrice = priceArray.reduce(reducer, 0);
        console.log(totalPrice);
        const displayTotalPrice = document.getElementById('totalPrice');
        displayTotalPrice.innerHTML = totalPrice;

    }

    cartQuantity();


/*    let closestQuant = inputAmount.closest('article');
                    let closestParagraphePrice = paragraphePrice.closest('article');
                    let pricePerKanap = parseInt(closestQuant.innerHTML) * parseInt(closestParagraphePrice.innerHTML); 
                    
                    
                    
                    
                    
                    
                    let prixTableau = [];
if(elt.id === data._id){
let prixParKanap = parseInt(data.price * elt.quantity);
console.log(prixParKanap);
prixTableau.push(prixParKanap);
}
const prixTotal = prixTableau.reduce(reducer, 0);
console.log(prixTotal);
*/



  /*  function cartPrice(){  //total prix
        
        let priceArray = [];
        //let lsId = Number(elt.id);
        //let dataId = Number(data._id);
        //console.log(lsId);
        //console.log(dataId);
        //if(lsId == dataId){ 
        const allArticles = document.querySelectorAll('article.cart__item');
        //const btnQuantity = document.querySelector('input.itemQuantity');
        
            let prixTableau = [];
            if(elt.id === article.id){
        for(let eachArticle of allArticles){
                let prixUnitaire = document.querySelector(eachArticle > divCart > divDescription > paragraphePrice);
                //let prixUnitaireInner = prixUnitaire.innerHTML;
                console.log(prixUnitaire);
            let prixParKanap = parseInt(prixUnitaire * elt.quantity);
            console.log(prixParKanap);
            prixTableau.push(prixParKanap);
            }
            const prixTotal = prixTableau.reduce(reducer, 0);
            console.log(prixTotal);

/*

        const eachPrice = Number(paragraphePrice.innerHTML);
        const eachQuantity = Number(inputAmount.innerHTML);
        console.log(eachPrice);
        console.log(eachQuantity);
            const totalPricePerKanap = Number(eachPrice) * Number(eachQuantity);
            priceArray.push(totalPricePerKanap);

            */
       // }
        //const reducer = (accumulator, currentValue) => accumulator + currentValue;
        //const totalPrice = priceArray.reduce(reducer, 0);
        //console.log(totalPrice);


        
        //const displayTotalPrice = document.getElementById('totalPrice');
        //displayTotalPrice.innerHTML = totalPrice;*/

        /*for(let eachArticle of allArticles){
            let nearPrice = btnQuantity.closest(allArticles);
            let eachPrice = btnQuantity.innerHTML;
            console.log(eachPrice);
            let eachPriceLS = Number(eachPrice)* LSquantity;
            priceArray.push(eachPriceLS);
        }*/
        /*for(let btnQuantity of btnQuantities){
            let eachPrice = btnQuantity.innerHTML;
            console.log(eachPrice);
            let eachPriceLS = Number(eachPrice)* LSquantity;
            priceArray.push(eachPriceLS);
        }*/
       // }

       /*
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const totalPrice = priceArray.reduce(reducer, 0);
        console.log(totalPrice);*/

    //}
      //  cartPrice();*/
    
   /* function cartPrice(){  //total prix
        let priceArray = [];
        let lsId = Number(elt.id);
        let dataId = Number(data._id);
        console.log(lsId);
        console.log(dataId);
        if(lsId == dataId){ 
        for(let eachPrice of data){
            let eachPriceLS = Number(eachPrice.price)* LSquantity;
            priceArray.push(eachPriceLS);
        }
        }
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const totalPrice = priceArray.reduce(reducer, 0);
        console.log(totalPrice);

        const displayTotalPrice = document.getElementById('totalPrice');
        displayTotalPrice.innerHTML = totalPrice;
    }

    cartPrice();*/




    for(let btnQuantity of btnQuantities){
      //const valeur = Number(btnQuantity.value);

      if(btnQuantity.value == elt.quantity ){
        btnQuantity.onchange = () => {
        elt.quantity = btnQuantity.value;
        localStorage.setItem("product", JSON.stringify(recup));
        cartQuantity();
        }
      }

      btnQuantity.addEventListener('input', function(){
        if(btnQuantity.value > valeurMax ){
          newParagraphQuantityNull.style.display = 'none';
          newParagraphQuantityNull.innerHTML = 'La quantité maximale autorisée est de  100 Kanaps';
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

    function removeFromBasket(product){ //supprime l'article du panier
        recup = recup.filter(function (elt) {return elt.color != product.dataset.color || elt.id != product.id} ); 
        //recup = recup.filter(elt => {return elt.color != product.dataset.color && elt.id != product.id} ); //conserve dans le panier uniquement les produits dont l'id n'est pas l'id du produit sur lequel l'user a cliqué, ainsi l'id selectionné sera supprimé (elt étant un element de recup,ici c'est un argument)
        console.log(recup);
        console.log(recup.filter);
        console.log(elt.color);
        console.log(elt.id);
        console.log(product.dataset.color);
        console.log(product.id);
        localStorage.setItem("product", JSON.stringify(recup)); //enregistre le nouveau panier
        console.log(recup);
    }


    for(let deleteButton of deleteButtons){   //pour chaque btn supprimer
      let deleteClosestProduct = deleteButton.closest('article');
      //let articleColor = deleteClosestProduct.dataset.color;
      //  let articleColor = article.getAttribute('data-color');
      deleteButton.addEventListener('click', function(){
          removeFromBasket(deleteClosestProduct);
          cartQuantity();
          console.log(removeFromBasket);
        if(elt.id == deleteClosestProduct.id && elt.color == deleteClosestProduct.dataset.color){
          deleteClosestProduct.remove();//supprime article de la page
          //const deleteElt = recup.filter(p => p.id != deleteClosestProduct.id && p.color != deleteClosestProduct.dataset.color); 
          //recup.slice(elt);
          //removeFromBasket(elt); //essai de supprimer l'element du LS
          localStorage.setItem("product", JSON.stringify(recup)); //enregistre le nouveau panier
        }
      }) //fin ecoute deleteButton.addEventListener('click', function(){ l.150
    }//fin for(let deleteButton of deleteButtons){ l.147







})
    
        



    

}








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



          //const eltClosest = elt.colsest();
       /*if(elt.id === deleteClosestProduct.id && paragrapheColor.innerHTML === elt.color ){
          //elt.quantity = 0;
          removeFromBasket(elt); //seul pbm : ca supp le mm id mm ac color !=
          //recup.pop(elt); //supprime dernier article de la liste
          //elt.remove(); //error "elt.remove is not a function athtmlparageraphelement anonymous"
          localStorage.setItem("product", JSON.stringify(recup));
        
          //removeFromBasket(elt);
          //elt.remove();
           //enregistre le nouveau panier
          /*for(let kanap of recup){
          let kanapQuantity = kanap.quantity;
          if(kanapQuantity < 1 ){
          removeFromBasket(kanap);
          //kanap.remove();
          //recup.pop(kanap);
          //alert('essai');
          localStorage.setItem("product", JSON.stringify(recup));
          }
          }*/
        //fin if(elt.id == deleteClosestProduct.id && elt.color == articleColor l.153
        //recup.id = elt.id
        //article doit avoir id et color pour effacer le bon via ls ! 



























/*
cartDisplay();
const removeProduct = async (cartDisplay) => {
    await cartDisplay;
    let deleteProduct = document.querySelectorAll('.deleteItem');


    deleteProduct.forEach((productToDelete) => {
        productToDelete.addEventListener('click', () => {
            console.log(deleteProduct);
            //const btnDelete = deleteProduct.closest(deleteProduct);
            //removeFromBasket(btnDelete);
        });
    });
}*/


/*const deleteProduct = document.querySelector('.deleteItem');

function removeFromBasket(product){ //supprime l'article du panier
    recup = recup.filter(p => p.id != product.id); //conserve dans le panier uniquement les produits dont l'id n'est pas l'id du produit sur lequel l'user a cliqué, ainsi l'id selectionné sera supprimé
    
    localStorage.setItem("product", JSON.stringify(recup)); //enregistre le nouveau panier
}*/


/*deleteProduct.addEventListener('click',function(){
    const btnDelete = deleteProduct.closest(deleteProduct);
    removeFromBasket(btnDelete);
})*/

/*
function removeFromBasket(product){ //supprime l'article du panier
    recup = recup.filter(p => p.id != product.id); //conserve dans le panier uniquement les produits dont l'id n'est pas l'id du produit sur lequel l'user a cliqué, ainsi l'id selectionné sera supprimé
    
    localStorage.setItem("product", JSON.stringify(recup)); //enregistre le nouveau panier
}
paragrapheDelete.addEventListener('click', function(){
    removeFromBasket(paragrapheDelete);
})*/