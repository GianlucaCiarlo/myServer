import express from "express";
import router from "./routes/index_router.js";

let PORT = 8080;
let server = express();



let ready = () => console.log("Server ready on port: " + PORT);
server.listen(PORT, ready);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/',router)



