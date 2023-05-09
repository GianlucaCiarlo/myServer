import express from "express";
import manager from "./products.js";

let server = express();

let PORT = 8080;

let ready = () => console.log("Server ready on port: " + PORT);
server.listen(PORT, ready);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

let index_route = "/";

let indexFunction = (req, res) => {
  let products = manager.read_products();
  return res.send(products);
};
server.get(index_route, indexFunction);

let oneProduct = "/products/:pid";
let oneProductFuncion = (req, res) => {
  let params = req.params;
  let id = Number(params.pid);
  let viewOneProduct = manager.read_product(id);
  console.log(viewOneProduct);
  if (viewOneProduct) {
    return res.send({
      success: true,
      response: viewOneProduct,
    });
  } else {
    return res.send({
      success: false,
      response: {},
    });
  }
};
server.get(oneProduct, oneProductFuncion);

let limit_route = "/products";
let limit_function = (req, res) => {
  let limit = req.query.limit ?? 10;

  let products = manager.read_products().slice(0, limit);

  if (products.length >= 0) {
    return res.send({
      success: true,
      response: products,
    });
  } else {
    return res.send({
      success: false,
      response: "not Found!",
    });
  }
};
server.get(limit_route, limit_function);

server.post(
  "/products",

  async (req, res) => {
    try {
      let title = req.body.title ?? null;
      let description = req.body.description ?? null;
      let price = req.body.description ?? null;
      let thumbnail = req.body.thumbnail ?? null;
      let code = req.body.code ?? null;
      let stock = req.body.stock ?? null;
      if (title && description && price && thumbnail && code && stock) {
        let newProduct = await manager.addProduct({
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        });
        return res.json({
          status: 201,
          product_ID: newProduct.id,
          message: "created",
        });
      } else {
        return res.json({
          status: 404,
          message: "check data",
        });
      }
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message:'addProduct: error'
        })
    }
  }
);

server.put("/products/:uid", (req, res) => {
    if (req.body && req.params.uid) {
        let id = Number(req.params.uid);
        let data = req.body;
        manager.updateProduct(id, data);
        return res.json({
            status: 200,
            message: 'product updated'
        })
    } else {
        return res.json({
            status: 400,
            response: 'check data'
        })
    }
        
    
});
