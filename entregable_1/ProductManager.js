class ProductManager {
    constructor() {
        this.products = []; // Crea un arreglo vacío para almacenar los productos
        this.nextProductId = 1; // Inicializa el ID autoincrementable

    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios.");
        }

        if (this.products.some(product => product.code === code)) {
            throw new Error("El campo 'code' no puede repetirse.");
        }

        const product = {
            id: this.nextProductId,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };

        this.products.push(product);
        this.nextProductId++; 
    }

    getProducts() {
        return this.products; // Devuelve el arreglo con todos los productos
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("Error: Producto no encontrado.");
        } else {
            return product;
        }
    }
}



// Testing :
const manager = new ProductManager();
console.log('clase ProdcutManage iniciada: ', manager.getProducts())

try {
    manager.addProduct("producto prueba", "este es un producto de prueba", 200, "sin imagen", "abc123", 25);
    manager.addProduct("producto prueba", "este es un producto de prueba", 200, "sin imagen", "abc1234", 25);
} catch (error) {
    console.error(error.message);
}

console.log('mostar productos existentes: ', manager.getProducts())

//validar si code esta repetido 
//manager.addProduct("producto prueba", "este es un producto de prueba", 200, "sin imagen", "abc123", 25);

// Obtener y mostrar un producto por su ID
const foundProduct = manager.getProductById(2);
if (foundProduct) {
    console.log(`Producto encontrado :`, foundProduct);
}

const nonExistentProductId = 4;
manager.getProductById(nonExistentProductId)
