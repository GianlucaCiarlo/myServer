import { Router } from "express";




const cartsRouter = Router();
const carts = [];
cartsRouter.get('/', (req,res) => {
  res.send({carts})
})

cartsRouter.post('/', (req, res) => {
  const cart = req.body;
  carts.push(cart)
  res.send({
    status: "success",
    products
  })
})

import fs from 'fs'

class cartManager {
  constructor(path) {
    this.carts = [];
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
      this.carts = JSON.parse(fs.readFileSync(path, "UTF-8"));
      console.log("datos obtenidos:");
      return "datos obtenidos:";
    }
  }

  
  

  read_carts() {
    return this.carts;
  }
  read_cart(id) {
    let first = this.carts.find((each) => each.id === id);
    if (!first) {
      console.log("error");
      return null;
    } else {
      console.log("carrito encontrado:" + id);
      return first;
    }
  }

  async updateCart(id, data) {
    try {
      let first = this.read_cart(id);
      if (!first) {
        return "Error: No se pudo el carrito";
      }

      for (let prop in data) {
        first[prop] = data[prop];
      }
      let data_json = JSON.stringify(this.carts, null, 2);
      await fs.promises.writeFile(this.path, data_json);
      console.log("Carrito actualizado: " + id);
      return "Carrito actualizado " + id;
    } catch (error) {
      console.log(error);
      return "Error:No se pudo actualizar el carrito";
    }
  }
  async getCartById(id) {
    try {
      let data = await fs.promises.readFile(this.path, "UTF-8");
      this.carts = JSON.parse(data);
      if (id) {
        let carrito = this.carts.find((each) => each.id === id);
        if (carrito) {
          console.log("Carrito Encontrado:");
          console.log(JSON.stringify(carrito));
          return carrito;
        } else {
          console.log(`No se encontró ningún carrito con id ${id}`);
          return null;
        }
      } else {
        console.log("Mostrando todos los carritos:");
        console.log(JSON.stringify(this.carts, null, 2));
        return this.carts;
      }
    } catch (error) {
      console.error(`Error al obtener el carrito con id ${id}: ${error}`);
      return null;
    }
  }

  async delateCart(id) {
    try {
      let first = this.read_cart(id);
      if (!first) {
        return "Error: No se encontro el carrito";
      }
      this.carrito = this.carts.filter((each) => each.id !== id);
      let data_json = JSON.stringify(this.carrito, null, 2);
      await fs.promises.writeFile(this.path, data_json);
      console.log("carrito borrado: " + id);
      return "carrito borrado: " + id;
    } catch (error) {
      console.log(error);
      return "Error: Borrando Producto";
    }
  }
}

let manager = new cartManager("./src/data/carts.json");

async function manage() {}
  

manage()


export default cartManager;
export { cartsRouter };