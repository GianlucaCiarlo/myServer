import { dirname } from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)





export { __filename, __dirname }



//dirname es la direccion url base, por ahora es localhost/8080