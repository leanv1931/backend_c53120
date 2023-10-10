const ProductManager = require('./ProductManager');

async function main() {
    const filePath = './data.json';
    const manager = new ProductManager(filePath);

    await manager.init();

    await manager.addProduct("producto prueba", "description del nuevo producto", 200, "imagen.jpg", "111222282228382289222291", 25);


    const productos = await manager.getProducts();
    console.log('############# MOSTRAR TODOS LOS PRODCUTOS #############');
    console.log(`Productos después de cargar el nuevo producto: 😎`, productos);

    console.log('############# MOSTRAR PRODUCTO BY ID#############');


    const productId = 17; 
    const product = await manager.getProductById(productId);
    console.log('Producto encontrado:', product);

    console.log('############# MODIFICAR Y MOSTAR #############');
    
    const newData = {
        title: "Nuevo título - new ",
        description: "Nueva descripción- new  ",
        price: 11,
        thumbnail: "nueva-imagen.jpg - new ",
        stock: 22
    };

    await manager.updateProductById(productId, newData);
    console.log('producto modificado : ', await manager.getProductById(productId))


    console.log('############# DELETE EL MODIFICADO #############');
    await manager.deleteProductById(18);
    await manager.getProductById(productId);
      
}

main();
