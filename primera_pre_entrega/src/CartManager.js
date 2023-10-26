const fs = require('fs').promises;


class CartManager {
    constructor(filePathCarrito) {
        this.filePathCarrito = filePathCarrito;
        this.shoppingCarts = [];
        this.nextProductId = 1; // Inicializa el ID autoincrementable
    }
    

    async init() {
        try {
            const data = await fs.readFile(this.filePathCarrito, 'utf8');
            this.shoppingCarts = JSON.parse(data);

            if (this.shoppingCarts.length > 0) {
                const maxId = Math.max(...this.shoppingCarts.map(cart => cart.id));
                this.nextProductId = maxId + 1;
            } else {
                this.nextProductId = 1;
            }
            
        } catch (error) {
            // Si el archivo no existe o hay un error al leerlo, inicializamos con un array vacío.
            this.shoppingCarts = [];
            this.nextProductId = 1;
        }

    }

    async getCarts() {
        return this.shoppingCarts;
    }

    async getProductById(id) {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            this.shoppingCarts = JSON.parse(data);
            return this.shoppingCarts;
            
        /*     const product = this.products.find(product => product.id === id);
            if (!product) {
                console.error("Error: Producto no encontrado.");
            } else {
                return product;
            }*/
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            throw error; 
        } 
    }



    async addCart(newData, cartId, prodId) {

    /*     if (newData.id) {
            console.error("id debe ser auto-generado.");
            return null; 
        }
 */
       /*  if (!newData.products) {
            console.error("Todos los campos son obligatorios.");
            return null; 
        } */
        
       
       /*  const existingIndex = this.shoppingCarts.findIndex(cart => cart.id === newData.id);
        if (existingIndex !== -1) {
                console.error("Error: El ID en newData ya existe en otro carrito de compras.");
                return null; 
        }
 */


        if (newData) {
            const cart = {
                id: this.nextProductId,
                ...newData,
            };
            this.shoppingCarts.push(cart);
            this.nextProductId++; 
            await this.saveData();
            return cart;

        }       
    }




    async saveData() {
        await fs.writeFile(this.filePathCarrito, JSON.stringify(this.shoppingCarts, null, 2), 'utf8');
    }




}
module.exports = CartManager;