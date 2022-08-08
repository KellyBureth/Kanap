fetch('http://localhost:3000/api/products') //RETRIEVES PRODUCT INFO FROM API AND DISPLAYS IT
  .then(res => res.json())
  .then(data => {
    const section = document.getElementById('items'); //WHERE TO PLACE THE CARDS
    for(let i of data){ //FOR EACH PRODUCT OF THE API
      /*________THE LINK________*/ 
      let a = document.createElement('a');
      a.href = './product.html?id=' + i._id; //REDIRECTS TO THE PRODUCT PAGE WITH THE ID
      section.appendChild(a);
      
      /*________THE IMAGE________*/ 
      const article = document.createElement('article');
      a.appendChild(article)  
      const image = document.createElement('img');
      image.src = i.imageUrl;
      image.alt = i.altTxt;
      article.appendChild(image);
      
      /*________THE TITLE________*/   
      const title = document.createElement('h3');
      title.classList.add('productName');
      article.appendChild(title);
      title.innerHTML = i.name;
      
      /*________THE DESCRIPTION________*/ 
      const description = document.createElement('p');
      description.classList.add('productDescription');
      article.appendChild(description);
      description.innerHTML = i.description;
    }
  })
  .catch(error => alert(error))


/*________RETRIEVE DATA FROM LOCAL STORAGE________*/ 
let productInLocalStorage  = JSON.parse(localStorage.getItem("product"));

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
    divIcone.style.display = 'flex'; 
    quantityInCard.style.display = 'initial';
    iconeKanap.style.display = 'initial';
    divIcone.style.border = '0.1rem dotted var(--main-color)';
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