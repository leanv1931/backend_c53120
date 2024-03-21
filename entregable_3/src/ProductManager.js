import fs from 'fs'

export class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
        this.nextProductId = 1; // Inicializa el ID autoincrementable
    }

    async getProducts() {
        const data = await fs.promises.readFile(this.filePath, 'utf-8');
        this.products = JSON.parse(data);
        return this.products;
    }

    async getProductById(id) {
        const data = await fs.promises.readFile(this.filePath, 'utf-8');
        this.products = JSON.parse(data);
        const product = this.products.find(product => product.id === id);
        return product;
    }
}

