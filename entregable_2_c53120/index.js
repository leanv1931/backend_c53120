const ProductManager = require('./ProductManager');

async function main() {
    const filePath = './data.json';
    const manager = new ProductManager(filePath);
    await manager.init();
    console.log('########### TESTING ###############');
    console.log('############# 1.MOSTRAR ARREGLO VACIO #############');
    const productosList1 = await manager.getProducts();
    console.log(productosList1);
    console.log('############# 2.AGREGAR PRODCUTO #############');
    manager.addProduct('remeraXXL - 2', 'este es un producto', 200, 'sin imagen.jpg', 'ABC123', 25);
    console.log('############# 3.MOSTRAR PRODUCTO DESPUES DE AGREGAR #############');
    const productosList2 = await manager.getProducts();
    console.log(productosList2);
    console.log('########### 4.BUSCAR PRODUCTO POR ID ###############');
    const productId = 1; 
    const product = await manager.getProductById(productId);
    if(product){
        console.log('############# MOSTRAR PRODUCTO BY ID #############');
        console.log('Resultado de busqueda:', product);
    }
    console.log('########### 5.BUSCAR PRODUCTO QUE NO EXISTE###############');
    const productIdnotFound = 5000; 
    await manager.getProductById(productIdnotFound);
    console.log('##########################');
    console.log('##########################');
    console.log('##########################');
    console.log('##########################');
    console.log('########### 5.UPDATE PRODUCT###############');
    const data =  await manager.updateProduct(1 , { title:'QA- QA4-id4' , price:44, stock:44 });
    if(data){
        console.log('############# PRODUCTO MODIFICADO #############');
        console.log(data);
    }
    console.log('##########################');
    console.log('##########################');
    console.log('##########################');
    console.log('##########################');
    console.log('########### 6.DELETE PRODUCT###############');
    await manager.deleteProduct(1);
}

main();
