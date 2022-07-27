//récupération de la chaine de requête de l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);


//extraction de l'id 
const id = queryString_url_id.slice(4);
console.log(id);



const image = document.createElement('img');
image;
document.getElementsByClassName('item__img')[0].appendChild(image);

    const newParagraphColor = document.createElement('p');
    document.querySelector('.item__content__settings .item__content__settings__color').appendChild(newParagraphColor);
    newParagraphColor.style.color = ' var(--footer-secondary-color)';
    newParagraphColor.style.display = 'none';


    const newParagraphQuantity = document.createElement('p');
    document.querySelector('.item__content__settings .item__content__settings__quantity').appendChild(newParagraphQuantity);
    newParagraphQuantity.style.color = ' var(--footer-secondary-color)';
    newParagraphQuantity.style.display = 'none';

    const newParagraphAddProduct = document.createElement('p');
    document.querySelector('.item__content').appendChild(newParagraphAddProduct);
    newParagraphAddProduct.style.color = ' var(--footer-secondary-color)';
    newParagraphAddProduct.style.display = 'none';

//récupère les info du produit et les affiche

fetch("http://localhost:3000/api/products/" + id)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        image.src = data.imageUrl;
        image.alt = data.altTxt;
        document.getElementById('title').innerHTML = data.name;
        document.getElementById('price').innerHTML = data.price;
        document.getElementById('description').innerHTML = data.description;
        const option = document.getElementById("colors");

        for (let i of data.colors){
            let option = document.createElement("option");
            colors.appendChild(option);
            option.value = i;
            option.text = i;
            console.log(i)
        }
    })


const addButton = document.getElementById("addToCart");

addButton.addEventListener('click',function(event){
    const option = document.getElementById("colors").value;
    const amount = Number(document.getElementById("quantity").value);

    let article = {
        id: id,
        quantity: amount,
        color: option
    } 

    if(document.getElementById("colors").selectedIndex == "0" && amount == 0){
        event.preventDefault();
        newParagraphColor.innerHTML = 'Veuillez choisir une couleur.';
        newParagraphColor.style.display = 'flex';

        newParagraphQuantity.innerHTML = 'Veuillez choisir une quantité.';
        newParagraphQuantity.style.display = 'flex';

    }

    if(document.getElementById("colors").selectedIndex == "0" && amount != 0 && amount < 101 ){
        
        newParagraphColor.innerHTML = 'Veuillez choisir une couleur.';
        newParagraphColor.style.display = 'flex';

        newParagraphQuantity.style.display = 'none';
    }

    if(document.getElementById("colors").selectedIndex != "0" && amount == 0){
        newParagraphColor.style.display = 'none';

        newParagraphQuantity.innerHTML = 'Veuillez choisir une quantité.';
        newParagraphQuantity.style.display = 'flex';
    }

    if(document.getElementById("colors").selectedIndex == "0" && amount > 100){        
        newParagraphColor.innerHTML = 'Veuillez choisir une couleur.';
        newParagraphColor.style.display = 'flex';

        newParagraphQuantity.innerHTML = 'Veuillez choisir une quantité comprise entre 1 et 100.';
        newParagraphQuantity.style.display = 'flex';
    }

    if(document.getElementById("colors").selectedIndex != "0" && amount > 100){
        newParagraphColor.style.display = 'none';

        newParagraphQuantity.innerHTML = 'Veuillez choisir une quantité comprise entre 1 et 100.';
        newParagraphQuantity.style.display = 'flex';
    }

    if(document.getElementById("colors").selectedIndex != "0" && amount > 0 && amount < 101 ){

        let exemplaire = localStorage.length * amount ;
        console.log(exemplaire);
        if(amount == 1){
            newParagraphAddProduct.style.display = 'none';
            newParagraphAddProduct.innerHTML = "Vous venez d'ajouter " + amount + " Kanap ! <p><a href='cart.html'><strong>Voir mon panier </strong></a></p>";
        }
        if(amount > 1){
            newParagraphAddProduct.style.display = 'none';
        newParagraphAddProduct.innerHTML = "Vous venez d'ajouter " + amount + " Kanaps ! <p><a href='cart.html'><strong>Voir mon panier </strong></a></p>";
    }
    newParagraphColor.style.display = 'none';
    newParagraphQuantity.style.display = 'none';
    newParagraphAddProduct.style.textAlign = 'center';
    setTimeout(() => {
        newParagraphAddProduct.style.display = 'initial';
    }, 400);
    

        if(localStorage.length < 1){
            console.log('ok');
            cart = [];
            cart.push(article);
            return localStorage.setItem("product", JSON.stringify(cart));
        } 
        if(localStorage.length >= 1){
            let recup = JSON.parse(localStorage.getItem ("product"));
            let findItem = false; //aucun produitsimilaire
            for(const i of recup){
                if(i.id == id && i.color == option){
                    i.quantity = i.quantity + amount;
                    findItem = true;
                }
            } 
            if (findItem == false){
                recup.push(article);
            }
            localStorage.setItem("product", JSON.stringify(recup));
        }
    
    }
})
//decimale 