import { Router } from "express";
import manager from "../../managers/Products.js"





const router = Router();

router.get("/", (req, res, next) => {

  try {
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
    
  } catch (error) {
    return res.json(next(error))
    
  }
  
});

router.get("/:pid", (req, res, next) => {
  try {
    let id = Number(params.pid);
    let viewOneProduct = manager.read_product(id);
    console.log(viewOneProduct);
    if (viewOneProduct) {
      return res.send({
        status: true,
        response: viewOneProduct,
      });
    } else {
      return res.send({
        status: false,
        response: {},
      });
    }
    
  } catch (error) {
    return res.json(next(error))
    
  }
});

router.post(
  "/",

  async (req, res,next) => {
    try {
      

      let title = req.body.title ?? null;
      let description = req.body.description ?? null;
      let price = req.body.price ?? null;
      let thumbnail = req.body.thumbnail+ filename ?? null;
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
      return res.json(next(error))
      
    }
  }
);

router.put("/:uid", (req, res, next) => {
  try {
    if (req.body && req.params.uid) {
      let id = Number(req.params.uid);
      let data = req.body;
      manager.updateProduct(id, data);
      return res.json({
        status: 200,
        message: "product updated",
      });
    } else {
      return res.json({
        status: 400,
        response: "check data",
      });
    }
    
  } catch (error) {
    return res.json(next(error))
  }
});

router.delete("/:dpid", (req, res, next) => { 
  try {
    let params = req.params;
    let id = Number(params.dpid);
    let deleted = manager.deleteProduct(id);
    if (deleted === "Error: No se encontro el producto") {
      return res.json({
        status: 400,
        message: "Error: No se encontro el producto!",
      });
    } else {
      return res.json({
        status: 200,
        message: "Producto borrado: " + id,
      });
    }
    
  } catch (error) {
    return res.json(next(error))
  }
});

export default router;
