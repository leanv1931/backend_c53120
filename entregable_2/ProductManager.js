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

    async addProduct(title, description, price, thumbnail, code, stock) {

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
        await this.saveData();
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

    async updateProductById(id, newData) {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);

            const productIndex = this.products.findIndex(product => product.id === id);
            if (productIndex === -1) {
                console.error("Error: Producto no encontrado.");
                return;
            }

            // Actualizar el producto con los nuevos datos
            this.products[productIndex] = {
                ...this.products[productIndex],
                ...newData
            };

            // Guardar los productos actualizados en el archivo
            await this.saveData();

            console.log('Producto actualizado correctamente.');
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            throw error; 
        }
    }




    async saveData() {
        await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
    }
}

module.exports = ProductManager;
