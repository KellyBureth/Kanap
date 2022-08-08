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



