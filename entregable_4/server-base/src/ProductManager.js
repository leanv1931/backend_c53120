
import { promises as fsPromises } from 'fs';



class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
        this.nextProductId = 1; // Inicializa el ID autoincrementable
    }



    async init() {
        try {
            const data = await fsPromises.readFile(this.filePath, 'utf8');
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
            const data = await fsPromises.readFile(this.filePath, 'utf8');
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

    async addProduct(newData) {

        if (newData.id) {
            console.error("id debe ser auto-generado.");
            return null; 
        }

        if (!newData.title || !newData.description || !newData.price || !newData.thumbnail || !newData.code || !newData.stock || !newData.status || !newData.category) {
            console.error("Todos los campos son obligatorios.");
            return null; 
        }
        
       
        const existingProductIndex = this.products.findIndex(product => product.id === newData.id);
        if (existingProductIndex !== -1) {
                console.error("Error: El ID en newData ya existe en otro producto.");
                return null; 
        }



        if (this.products.some(product => product.code === newData.code)) {
          //  throw new Error("El campo 'code' no puede repetirse.");
            console.error("El campo 'code' no puede repetirse.");
            return null; 
        }else{
            const product = {
                id: this.nextProductId,
                ...newData,
            };
            this.products.push(product);
            this.nextProductId++; 
            await this.saveData();
            return product;

        }       
    }

    async updateProductById(id, newData) {
        try {
            const data = await fsPromises.readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);

            if (newData.id) {
                console.error("payload incorrecto : id no permitido en request");
                return null; 
            }
            const productIndex = this.products.findIndex(product => product.id === parseInt(id));
            if (productIndex === -1) {
                console.error("Error: Producto no encontrado.");
                return null; 
            }
             // Validar si el ID en newData coincide con el ID en req.params.id
            if (newData.id && newData.id !== parseInt(id)) {
                console.error("Error: El ID en newData no coincide con el ID en req.params.");
                return null; 
            }
           // Validar si el ID en newData ya existe en otro producto
            const existingProductIndex = this.products.findIndex(product => product.id === newData.id);
            if (existingProductIndex !== -1 && existingProductIndex !== productIndex) {
                console.error("Error: El ID en newData ya existe en otro producto.");
                return null; 
            }
            if (this.products.some(product => product.code === newData.code)) {
                //  throw new Error("El campo 'code' no puede repetirse.");
                  console.error("El campo 'code' no puede repetirse.");
                  return null; 
            }      
            // Actualizar el producto con los nuevos datos
            this.products[productIndex] = { ...this.products[productIndex], ...newData };
            // Guardarr en el archivo
            await this.saveData();
            console.log('Producto actualizado correctamente.');
            return this.products[productIndex];

           
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            throw error; 
        }
    }

    async deleteProductById(id) {
        try {
            const data = await fsPromises.readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);

            const productIndex = this.products.findIndex(product => product.id === parseInt(id));
            if (productIndex === -1) {
                console.error("Error: Producto no encontrado.");
                return null; 
            }
            // Eliminar el producto del array
            this.products.splice(productIndex, 1);
            // Guardar los productos actualizados en el archivo
            await this.saveData();
            console.log('Producto eliminado correctamente.');
            return id;
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            throw error; 
        }
    }



    async saveData() {
        await fsPromises.writeFile(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
    }


}
export default ProductManager;