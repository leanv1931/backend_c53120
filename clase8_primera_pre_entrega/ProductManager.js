import fs from 'fs'

export class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
        this.nextProductId = 1; // Inicializa el ID autoincrementable

    }

    async init() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
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

    async addProduct(newData) {
        await this.init();

        try {
            if (newData.id) {
                throw new Error("id debe ser auto-generado.");
            }
            if (!newData.title || !newData.description || !newData.price || !newData.code || !newData.stock || !newData.status || !newData.category) {
                throw new Error("Todos los campos son obligatorios.");
            }
        
            const existingProductIndex = this.products.findIndex(product => product.id === newData.id);
            if (existingProductIndex !== -1) {
                    throw new Error("Error: El ID en newData ya existe en otro producto.");
            }   

            if (this.products.some(product => product.code === newData.code)) {
                  throw new Error("El campo 'code' no puede repetirse.");
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

        } catch (error ){
            throw error;
        }
    }

    async updateProductById(id, newData) {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            this.products = JSON.parse(data);

            if (newData.id) {
                throw new Error("payload incorrecto : id no permitido en request");
            }
            const productIndex = this.products.findIndex(product => product.id === parseInt(id));
            if (productIndex === -1) {
                throw new Error("Error: Producto no encontrado.");
            }
        
          
            if (this.products.some(product => product.code === newData.code)) {
                //  throw new Error("El campo 'code' no puede repetirse.");
                  console.error("El campo 'code' no puede repetirse.");
                  return null; 
            }
             if (newData.id == "") {
                throw new Error("id no puede actualizarse.");
            } 
            
            // Actualizar el producto con los nuevos datos
            this.products[productIndex] = { ...this.products[productIndex], ...newData };
            // Guardarr en el archivo
            await this.saveData();
            console.log('Producto actualizado correctamente.');
            return this.products[productIndex];

           
        }catch (error){
            throw error; 
        }
    }

    async deleteProductById(id) {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            this.products = JSON.parse(data);

            const productIndex = this.products.findIndex(product => product.id === parseInt(id));
            if (productIndex === -1) {
                throw new Error("Error: Producto no encontrado.");

            }
            // Eliminar el producto del array
            this.products.splice(productIndex, 1);
            // Guardar los productos actualizados en el archivo
            await this.saveData();
            return id;
        } catch (error) {
            throw error; 
        }
    }


    async saveData() {
        await fs.promises.writeFile(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
     //   const data = await fs.promises.readFile(this.filePath, 'utf-8');

    }


}

