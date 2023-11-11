

import { Server } from 'socket.io'
import ProductManager from'./ProductManager.js';
import { __dirname } from './utils.js';

const filePath = './src/data.json';
const productManager = new ProductManager(filePath);
await productManager.init();
let responseProducts = await productManager.getProducts();


export const init = (httpServer) => {

  const socketServer = new Server(httpServer);
  
  socketServer.on('connection', (socketClient) => {

    socketServer.emit('mostrar-productos', {responseProducts} );



  });
} 




