const ProductManager = require('./ProductManager');

async function main() {
    const filePath = './data.json';
    const manager = new ProductManager(filePath);

    await manager.init();

    await manager.addProduct("producto prueba", "description del nuevo producto", 200, "imagen.jpg", "888899", 25);


    const productos = await manager.getProducts();
    console.log('############# MOSTRAR TODOS LOS PRODCUTOS #############');
    console.log(`Productos después de cargar el nuevo producto: 😎`, productos);

    console.log('############# MOSTRAR PRODUCTO BY ID#############');


    const productId = 2; 
    const product = await manager.getProductById(productId);
    console.log('Producto encontrado:', product);

    console.log('############# MODIFICAR Y MOSTAR #############');
    
    const newData = {
        title: "Nuevo título x2",
        description: "Nueva descripción x2 ",
        price: 11,
        thumbnail: "nueva-imagen.jpg x2",
        stock: 22
    };

    await manager.updateProductById(productId, newData);



    console.log('producto modificado : ', await manager.getProductById(productId))







      
}

main();
