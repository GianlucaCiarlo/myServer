import { Router } from "express";

const product_router = Router();
const products = [];

product_router.get('/', (req,res) => {
  res.send({products})
})

product_router.post('/', (req, res) => {
  const product = req.body;
  products.push(product)
  res.send({
    status: "success",
    products
  })
})




import fs from 'fs'


class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    this.init(path);
  }
  init(path) {
    let file = fs.existsSync(path);
    if (!file) {
      fs.writeFileSync(path, "[]");
      console.log("file created: " + this.path);
      return "file created: " + this.path;
    } else {
      this.products = JSON.parse(fs.readFileSync(path, "UTF-8"));
      console.log("datos obtenidos:");
      return "datos obtenidos:";
    }
  }

  async addProduct({ title, description, price, thumbnail, code, stock }) {
    try {
      let data = { title, description, price, thumbnail, code, stock };
      if (this.products.length > 0) {
        let nextId = this.products[this.products.length - 1].id + 1;
        data.id = nextId;
      } else {
        data.id = 1;
      }
      this.products.push(data);
      let data_json = JSON.stringify(this.products, null, 2);

      await fs.promises.writeFile(this.path, data_json);
    
      return data;
    } catch (error) {
      console.log(error);
      return "error: creando producto";
    }
  }

  read_products() {
    return this.products;
  }
  read_product(id) {
    let first = this.products.find((each) => each.id === id);
    if (!first) {
      console.log("error");
      return null;
    } else {
      console.log("Producto encontrado:" + id);
      return first;
    }
  }

  async updateProduct(id, data) {
    try {
      let first = this.read_product(id);
      if (!first) {
        return "Error: No se pudo actualizar el producto";
      }

      for (let prop in data) {
        first[prop] = data[prop];
      }
      let data_json = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, data_json);
      console.log("Producto actualizado: " + id);
      return "Producto actualizado " + id;
    } catch (error) {
      console.log(error);
      return "Error:No se pudo actualizar el producto";
    }
  }
  async getProductById(id) {
    try {
      let data = await fs.promises.readFile(this.path, "UTF-8");
      this.products = JSON.parse(data);
      if (id) {
        let producto = this.products.find((each) => each.id === id);
        if (producto) {
          console.log("Producto Encontrado:");
          console.log(JSON.stringify(producto));
          return producto;
        } else {
          console.log(`No se encontró ningún producto con id ${id}`);
          return null;
        }
      } else {
        console.log("Mostrando todos los productos:");
        console.log(JSON.stringify(this.products, null, 2));
        return this.products;
      }
    } catch (error) {
      console.error(`Error al obtener el producto con id ${id}: ${error}`);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      let first = this.read_product(id);
      if (!first) {
        return "Error: No se encontro el producto";
      }
      this.products = this.products.filter((each) => each.id !== id);
      let data_json = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, data_json);
      
      return "Producto borrado: " + id;
    } catch (error) {
      
      return "Error: Borrando Producto";
    }
  }
}

let manager = new ProductManager("./src/data/productos.json");

async function manage() {
  await manager.addProduct({
    title: "Pepsi 2,25L",
    description: "Gaseosa sabor Cola 2,25L x 8u.",
    price: 3000,
    thumbnail: "sin IMG",
    code: "pep225",
    stock: 10,
  });
  await manager.addProduct({
    title: "Mirinda 2,25L",
    description: "Gaseosa sabor Naranja 2,25L x 8u",
    price: 3000,
    thumbnail: "sin IMG",
    code: "mir225",
    stock: 10,
  });
  await manager.addProduct({
    title: "7up 2,25L",
    description: "Gaseosa sabor lima 2,25L x 8u",
    price: 3000,
    thumbnail: "sin IMG",
    code: "sev225",
    stock: 10,
  });
  await manager.addProduct({
    title: "Estancia Tinto",
    description: "Vino tinto malbec x 6u",
    price: 2500,
    thumbnail: "sin IMG",
    code: "estMALB6",
    stock: 10,
  });
  await manager.addProduct({
    title: "Estancia Blanco",
    description: "Vino blanco chardonnay x 6u",
    price: 2500,
    thumbnail: "sin IMG",
    code: "estCHARD6",
    stock: 10,
  });
  await manager.addProduct({
    title: "Pepsi 2L retornable",
    description: "Gaseosa sabor cola 2L retornable x 10u",
    price: 2500,
    thumbnail: "sin IMG",
    code: "Pep2lr",
    stock: 10,
  });
  await manager.addProduct({
    title: "Mirinda naranja 2l Retornable",
    description: "Gaseosa sabor naranja 2l retornable x 10u",
    price: 2500,
    thumbnail: "sin IMG",
    code: "Mir2lr",
    stock: 10,
  });
  await manager.addProduct({
    title: "7up 2L retornable",
    description: "Gaseosa sabor lima 2L retornable x 10u",
    price: 2500,
    thumbnail: "sin IMG",
    code: "Sev2lr",
    stock: 10,
  });
  await manager.addProduct({
    title: "Champagne la llave 750ml",
    description: "Champagne extra brut 750ml x 6u",
    price: 9500,
    thumbnail: "sin IMG",
    code: "Champllav750",
    stock: 10,
  });
  await manager.addProduct({
    title: "Sidra 1988",
    description: "Sidra de manzana 1988 x 6u",
    price: 2500,
    thumbnail: "sin IMG",
    code: "Sid1988",
    stock: 10,
  });
}


export default manager



