fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        const section = document.getElementById('items');
        for(let i of data){
            let a = document.createElement('a');
            a.href = './product.html?id=' + i._id;
            a;
            section.appendChild(a);
            
            const article = document.createElement('article');
            article;
            a.appendChild(article);


            const image = document.createElement('img');
            image;
            image.src = i.imageUrl;
            image.alt = i.altTxt;
            article.appendChild(image);
            
            const title = document.createElement('h3');
            title.classList.add('productName');
            title;
            article.appendChild(title);
            title.innerHTML = i.name;
            
            const description = document.createElement('p');
            description.classList.add('productDescription');
            description;
            article.appendChild(description);
            description.innerHTML = i.description;
        }
    })
    .catch(error => alert(error))



