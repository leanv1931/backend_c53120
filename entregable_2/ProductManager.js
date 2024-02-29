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
        const data = await fs.readFile(this.filePath, 'utf8');
        this.products = JSON.parse(data);

        return this.products;
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

        // guardar en el file
       
        await this.saveData();
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

    async updateProduct(id, newData) {
        if (newData.id) {
            console.error("Error: ID no puede ser modificado.");
        }
        const data = this.products.find(product => product.id === id);
        for(let key in data){
            if(newData[key]){
                data[key] = newData[key];
            }
        }
        await this.saveData();
        return data
    }

    async saveData() {
        await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
    }

    async deleteProduct(id){
        const data = this.products.find(product => product.id === id )
        if (data){
            const indexNum= this.products.findIndex(product => product.id === data.id)
            console.log('DELETED ; ', this.products.splice(indexNum, 1))
        } else {
            console.log('Error: producto no encontrado.no fue eliminado')
        }
        await this.saveData();
    }


    async buscar(id){
        const data = this.products.find(product => product.id === id)
        if(data){
            console.log('busqueda exitosa : ', data)
        } else {
            console.log('producto no encontrado.')
        }

    }




}

module.exports = ProductManager;
