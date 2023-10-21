const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
        this.nextProductId = 1; // Inicializa el ID autoincrementable
    }

    async init() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);

            if (this.products.length > 0) {
                const maxId = Math.max(...this.products.map(product => product.id));
                this.nextProductId = maxId + 1;
            } else {
                this.nextProductId = 1; // Si no hay productos, comenzar desde 1
            }
            
        } catch (error) {
            // Si el archivo no existe o hay un error al leerlo, inicializamos con un array vacío.
            this.products = [];
            this.nextProductId = 1;
        }
    }

    async getProducts() {
        return this.products;
    }

    async getProductById(id) {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);
            
            const product = this.products.find(product => product.id === id);
            if (!product) {
                console.error("Error: Producto no encontrado.");
            } else {
                return product;
            }
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            throw error; 
        }
    }
}

module.exports = ProductManager;