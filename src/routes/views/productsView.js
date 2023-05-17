import { Router } from "express";

const viewsRouter = Router()

viewsRouter.get('/realTimeProducts', (req, res, next) => {
    try {
        const productos = [
            {
              "title": "Pepsi 2,25L",
              "description": "Gaseosa sabor Cola 2,25L x 8u.",
              "price": 3000,
              "thumbnail": "https://res.cloudinary.com/drfhxh99i/image/upload/v1676434536/pepsi-2l25_zrnl0m.jpg",
              "code": "pep225",
              "stock": 10,
              "id": 1
            },
            {
              "title": "Mirinda 2,25L",
              "description": "Gaseosa sabor Naranja 2,25L x 8u",
              "price": 3000,
              "thumbnail": "https://res.cloudinary.com/drfhxh99i/image/upload/v1676434535/mirinda-2-25_tnj66t.jpg",
              "code": "mir225",
              "stock": 10,
              "id": 2
            },
            {
              "title": "7up 2,25L",
              "description": "Gaseosa sabor lima 2,25L x 8u",
              "price": 3000,
              "thumbnail": "https://res.cloudinary.com/drfhxh99i/image/upload/v1676434535/7up-2l25_vbtwij.png",
              "code": "sev225",
              "stock": 10,
              "id": 3
            },
            {
              "title": "Estancia Tinto",
              "description": "Vino tinto malbec x 6u",
              "price": 2500,
              "thumbnail": "https://res.cloudinary.com/drfhxh99i/image/upload/v1684271919/estancia-mendoza-cabernet-malbec-750cc_ofyk0t.jpg",
              "code": "estMALB6",
              "stock": 10,
              "id": 4
            },
            {
              "title": "Estancia Blanco",
              "description": "Vino blanco chardonnay x 6u",
              "price": 2500,
              "thumbnail": "https://res.cloudinary.com/drfhxh99i/image/upload/v1684271999/estancia-chenin-2_nf9tcx.png",
              "code": "estCHARD6",
              "stock": 10,
              "id": 5
            },
            {
              "title": "Pepsi 2L retornable",
              "description": "Gaseosa sabor cola 2L retornable x 10u",
              "price": 2500,
              "thumbnail": "https://res.cloudinary.com/drfhxh99i/image/upload/v1676434536/pepsi2L_sfhud7.jpg",
              "code": "Pep2lr",
              "stock": 10,
              "id": 6
            },
            {
              "title": "Mirinda naranja 2l Retornable",
              "description": "Gaseosa sabor naranja 2l retornable x 10u",
              "price": 2500,
              "thumbnail": "https://res.cloudinary.com/drfhxh99i/image/upload/v1676434536/mirinda-2l_xaqeb6.png",
              "code": "Mir2lr",
              "stock": 10,
              "id": 7
            },
            {
              "title": "7up 2L retornable",
              "description": "Gaseosa sabor lima 2L retornable x 10u",
              "price": 2500,
              "thumbnail": "https://res.cloudinary.com/drfhxh99i/image/upload/v1676434535/7up2L_zczn3k.png",
              "code": "Sev2lr",
              "stock": 10,
              "id": 8
            },
            {
              "title": "Champagne la llave 750ml",
              "description": "Champagne extra brut 750ml x 6u",
              "price": 9500,
              "thumbnail": "https://res.cloudinary.com/drfhxh99i/image/upload/v1684272279/Champan-Bodega-Priv.-x-750.-cc_fktgea.jpg",
              "code": "Champllav750",
              "stock": 10,
              "id": 9
            },
            {
              "title": "Sidra 1888",
              "description": "Sidra de manzana 1988 x 6u",
              "price": 2500,
              "thumbnail": "https://res.cloudinary.com/drfhxh99i/image/upload/v1684272273/sidra-18881-c4a84a6f2a42babc7b16422129093097-640-0_hdrb6n.jpg",
              "code": "Sid1888",
              "stock": 10,
              "id": 10
            }
      ]
      
      
      
        
        
        return res.render(
          'products', { productos },
          
            
            
            
        )
        
            
            
        
    } catch (error) {
        return next(error)
    }


})





export default viewsRouter