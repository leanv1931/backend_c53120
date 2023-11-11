

const socket = io();



socket.on('mostrar-productos',({ responseProducts }) => {
  const listMessage = document.getElementById('list-message');
  listMessage.innerText = '';

  responseProducts.forEach((data) => {
    const li = document.createElement('li');

    const productInfo = `
    <strong>ID:</strong> ${data.id}<br>
    <strong>Title:</strong> ${data.title}<br>
    <strong>Description:</strong> ${data.description}<br>
    <strong>Code:</strong> ${data.code}<br>
    <strong>Price:</strong> $${data.price.toFixed(2)}<br>
    <strong>Status:</strong> ${data.status ? 'Available' : 'Out of stock'}<br>
    <strong>Stock:</strong> ${data.stock}<br>
    <strong>Category:</strong> ${data.category}<br>
   `;

  li.innerHTML = productInfo;
  listMessage.appendChild(li);
  });

  console.log('mostrar-list-productos', responseProducts);
});