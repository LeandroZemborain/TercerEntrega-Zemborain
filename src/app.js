import express from 'express'
import {productManager} from './ProductManager.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {

  try {
    const products = await productManager.getProducts()
    const limit =req.query.limit
    const prodLimit = products.slice(0,limit)
    if (!limit) {
      res.status(200).json({ message: 'Productos totales', products })
    }else{
      res.status(200).json({ message: 'Listado productos limitado', prodLimit })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.get('/products/:pid', async (req, res) => {
  const { pid } = req.params
  try {
    const product = await productManager.getProductById(+pid)
    if(pid==0){
      res.status(200).json({message: "Producto no encontrado"})
    }else{
      res.status(200).json({ message: 'Producto encontrado', product })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
})



app.listen(8080, () => {
  console.log('Escuchando al puerto 8080')
})