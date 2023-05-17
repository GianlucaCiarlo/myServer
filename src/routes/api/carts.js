import { Router } from "express";

const cartsRouter = Router();
import fs from "fs";

const cartsFilePath = "/carrito.json";

let carts = [];
let cartIdCounter = 1;

const loadCarts = () => {
    try {
      const cartsData = fs.readFileSync(cartsFilePath, "utf-8");
      carts = JSON.parse(cartsData);
    } catch (error) {
      carts = [];
    }
  };
  
  const saveCarts = () => {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts));
  };
  
  const generateCartId = () => {
    return cartIdCounter++;
  };
  
  loadCarts();
  
cartsRouter.post("/", (req, res, next) => {
    try {
      const { products } = req.body;
      const cartId = generateCartId();
      const cart = {
        id: cartId,
        products: products || [],
      };
      carts.push(cart);
      saveCarts();
      res.send(cart);
      
    } catch (error) {
      return res.json(next(error))
    }
  });
cartsRouter.get("/", (req, res, next) => {

  try {
    let limit = req.query.limit ?? 10;
    let response;
  
    if (carts.length >= 0) {
      response = {
        success: true,
        response: carts.slice(0, limit),
      };
    } else {
      response = {
        success: false,
        response: "not Found!",
      };
    }
  
    res.send(response);
    
  } catch (error) {
    return res.json(next(error))
  }
});

cartsRouter.get("/:cid", (req, res, next) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find((cart) => cart.id === cartId);
  
    if (cart) {
      res.send({
        success: true,
        response: cart.products,
      });
    } else {
      res.send({
        success: false,
        response: "Cart not found!",
      });
    }
    
  } catch (error) {
    return res.json(next(error))
  }
});

cartsRouter.post("/:cid/product/:pid", (req, res, next) => {
  try {
    
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const unitsToAdd = 1;
  
    const cart = carts.find((cart) => cart.id === cartId);
  
    if (cart) {
      const existingProduct = cart.products.find(
        (product) => product.product === productId
      );
  
      if (existingProduct) {
        existingProduct.quantity += unitsToAdd;
      } else {
        cart.products.push({ product: productId, quantity: unitsToAdd });
      }
  
      saveCarts();
      res.send({
        success: true,
        response: cart.products,
      });
    } else {
      res.send({
        success: false,
        response: "Cart not found!",
      });
    }
  } catch (error) {
    return res.json(next(error))
  }
});

cartsRouter.delete("/:cid/product/:pid/:units", (req, res, next) => {
  try {
    
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const unitsToRemove = parseInt(req.params.units);
  
    const cart = carts.find((cart) => cart.id === cartId);
  
    if (cart) {
      const existingProduct = cart.products.find(
        (product) => product.product === productId
      );
  
      if (existingProduct) {
        if (unitsToRemove >= existingProduct.quantity) {
          cart.products = cart.products.filter(
            (product) => product.product !== productId
          );
        } else {
          existingProduct.quantity -= unitsToRemove;
        }
  
        saveCarts();
        res.send({
          success: true,
          response: cart.products,
        });
      } else {
        res.send({
          success: false,
          response: "Product not found in cart!",
        });
      }
    } else {
      res.send({
        success: false,
        response: "Cart not found!",
      });
    }
  } catch (error) {
    return res.json(next(error))
  }
});

export default cartsRouter;
