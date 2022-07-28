
const confirmationUrl = window.location.search;

const urlSearch = new URLSearchParams(confirmationUrl);

const orderId = urlSearch.get('orderId');

const span = document.getElementById('orderId');
span.innerHTML = orderId;