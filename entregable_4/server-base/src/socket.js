import { Server } from 'socket.io'
import ProductManager from'./ProductManager.js';
import { __dirname } from './utils.js';
const filePath = './src/data.json';
const productManager = new ProductManager(filePath);
await productManager.init();
let responseProducts = await productManager.getProducts();

let socketServer;

export const init = (httpServer) => {
  socketServer = new Server(httpServer);
  socketServer.on('connection', (socketClient) => {
    console.log(`Nuevo cliente socket conectado ${socketClient.id} 🎊`);
    socketServer.emit('mostrar-productos', {responseProducts} );

  });
}
