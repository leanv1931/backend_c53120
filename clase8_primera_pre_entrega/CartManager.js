import fs from 'fs'

export class CartManager {

    constructor(filePath) {
        this.filePath = filePath;
        this.shoppingCarts = [];
        this.nextProductId = 1; // Inicializa el ID autoincrementable

    }


    async init() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            this.shoppingCarts = JSON.parse(data);

            if (this.shoppingCarts.length > 0) {
                const maxId = Math.max(...this.shoppingCarts.map(product => product.id));
                this.nextProductId = maxId + 1;
            } else {
                this.nextProductId = 1; // Si no hay productos, comenzar desde 1
            }
            
        } catch (error) {
            // Si el archivo no existe o hay un error al leerlo, inicializamos con un array vacío.
            this.shoppingCarts = [];
            this.nextProductId = 1;
        }
    }

    async getProducts() {
        const data = await fs.promises.readFile(this.filePath, 'utf-8');
        this.shoppingCarts = JSON.parse(data);
        return this.shoppingCarts;
    }


    async addProduct(newData) {
        await this.init();
        try {

            for (const item of newData.carrito) {
                if (item.quantity === undefined) {
                    throw new Error("El campo 'quantity' es obligatorio en cada objeto del carrito.");
                }
            }
            // mejora : VERIFICAR QUE EL productId exista en prodcutos.json


    
            const product = {
                id: this.nextProductId,
                carrito: newData.carrito
            };
            this.shoppingCarts.push(product);
            this.nextProductId++; 
            await this.saveData();
            return product;
        } catch (error ){
            throw error;
        }
    }


    async addProductToCart(cartId, productId, body) {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            this.shoppingCarts = JSON.parse(data);
            const cartIndex = this.shoppingCarts.findIndex(cart => cart.id === cartId);
            
            if (cartIndex === -1) {
                throw new Error("carrito no existe.");
            }
    
            const myCarrito = this.shoppingCarts[cartIndex];
            const existingProductIndex = myCarrito.carrito.findIndex(p => p.product === productId);

            const additionalQuantity = parseInt(body.quantity);
            if (isNaN(additionalQuantity)) {
                throw new Error("formato de cantidad es inválida.");
            }
        
            if (existingProductIndex !== -1) {
            // Si el producto ya existe, actualizar su cantidad
                myCarrito.carrito[existingProductIndex].quantity += parseInt(body.quantity);
            } else {
            // Si el producto no existe, añadirlo al carrito
                myCarrito.carrito.push({
                    quantity: additionalQuantity,
                    product: productId
                });
            }   
            // Actualiza el carrito en el array de shoppingCarts
            this.shoppingCarts[cartIndex] = myCarrito;
    
            // Guarda el carrito actualizado en el archivo
            await this.saveData();
            return this.shoppingCarts[cartIndex];
        } catch (error) {
            throw error;
        }
    }
 
    async getProductById(id) {
        const data = await fs.promises.readFile(this.filePath, 'utf-8');
        this.products = JSON.parse(data);
        const product = this.products.find(product => product.id === id);
        return product;
    }

    async saveData() {
        await fs.promises.writeFile(this.filePath, JSON.stringify(this.shoppingCarts, null, 2), 'utf-8');
     //   const data = await fs.promises.readFile(this.filePath, 'utf-8');

    }



}