import express from 'express'
import manager from './products.js'

let server = express()

let PORT = 8080

let ready = () => console.log('Server ready on port: ' + PORT)
server.listen(PORT, ready)
server.use(express.urlencoded({ extended: true }))

let index_route = '/product'

let indexFunction = (req, res) => {
    let products = manager.read_products()
    return res.send(products)
}
server.get(index_route, indexFunction)

let oneProduct = '/products/:id'
let oneProductFuncion = (req, res) => {
    let params = req.params
    let id = Number(params.id)
    let viewOneProduct = manager.read_product(id)
    console.log(viewOneProduct)
    if (viewOneProduct) {
        return res.send({
            success: true,
            product: viewOneProduct,})
    } else {
        return res.send({
            success: false ,
            product: "Not Found!"
        })}
    
}
server.get(oneProduct, oneProductFuncion)

let limit_route = '/products'
let limit_function = (req, res) => {
    let limit = req.query.limit ?? 5;
    
    let products = manager.read_products().slice(0, limit)

    if (products.length>=0) {
        
        return res.send({
            success: true ,
            products: products,
            
        })
    } else {
        return res.send({
            success: false ,
            products: "not Found!",
            
        })
    }
    
}


server.get(limit_route,limit_function)