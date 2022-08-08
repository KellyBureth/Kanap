/*________RETRIEVE ORDER ID FROM URL________*/
const confirmationUrl = window.location.search;
const urlSearch = new URLSearchParams(confirmationUrl);
const orderId = urlSearch.get('orderId');


/*________DISPLAYS THE ORDER ID________*/ 
const span = document.getElementById('orderId');
span.innerHTML = orderId;