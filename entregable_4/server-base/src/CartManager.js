import { promises as fsPromises } from 'fs';



class CartManager {
    constructor(filePathCarrito) {
        this.filePathCarrito = filePathCarrito;
        this.shoppingCarts = [];
        this.nextProductId = 1; // Inicializa el ID autoincrementable
    }

    async init() {
        try {
            const data = await fsPromises.readFile(this.filePathCarrito, 'utf8');
            this.shoppingCarts = JSON.parse(data);

            if (this.shoppingCarts.length > 0) {
                const maxId = Math.max(...this.shoppingCarts.map(cart => cart.id));
                this.nextProductId = maxId + 1;
            } else {
                this.nextProductId = 1;
            }
            
        } catch (error) {
            this.shoppingCarts = [];
            this.nextProductId = 1;
        }

    }

    async getCarts() {
        return this.shoppingCarts;
    }

    async getCarritoById(id) {
        try {
            const data = await fs.readFile(this.filePathCarrito, 'utf8');
            this.shoppingCarts = JSON.parse(data);
            
            const cart= this.shoppingCarts.find(cart => cart.id === id);
            if (!cart) {
                console.error("Error: carrito no encontrado.");
            } else {
                return cart;
            }
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            throw error; 
        }
    }

    async addCart(newData) {
        if (this.shoppingCarts.some(cart => cart.id === newData.id)) {
            console.error("El campo 'id' no puede repetirse.");
            return null; 
        }else{
            const cart = {
                id: this.nextProductId,
                carrito: newData.carrito
            };
            this.shoppingCarts.push(cart);
            this.nextProductId++; 
            await this.saveData();
            return cart;
        }
    }

    async addProductToCart(cartId, productId, body) {
        try {
            const data = await fs.readFile(this.filePathCarrito, 'utf8');
            this.shoppingCarts = JSON.parse(data);
    
            const cartIndex = this.shoppingCarts.findIndex(cart => cart.id === cartId);
            
            if (cartIndex === -1) {
                console.error("Error: carrito no encontrado.");
                return null;
            }
    
            const myCarrito = this.shoppingCarts[cartIndex];
            const existingProductIndex = myCarrito.carrito.findIndex(p => p.product === productId);

            const additionalQuantity = parseInt(body.quantity);
            if (isNaN(additionalQuantity)) {
                console.error("Error: cantidad inválida.");
                return null;
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
            console.log('Producto agregado al carrito correctamente.');
            return this.shoppingCarts[cartIndex];
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            throw error;
        }
    }
    

    async saveData() {
        await fs.writeFile(this.filePathCarrito, JSON.stringify(this.shoppingCarts, null, 2), 'utf8');
    }

}


export default CartManager;
