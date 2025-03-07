// products controller page

// import model
import * as  productModel from '../model/productsModel.js'

// delete products function
export const deleteProductsById =  async (req, res) => {
    const { id } = req.params;
    try {
        await productModel.deleteProductsById(id)
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Database error:", error)
        res.status(500).json({ error: 'Database error' });
    }
}

// update product
export const updateProduct =async (req, res) => {
  const { id } = req.params;
  const { name, description, price,  quantity ,image} = req.body;

  try {
    // Check if product exists
    const [existingProduct]=await productModel.checkIfProducts(id)
    if (existingProduct.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product
    await productModel.updateProduct(name, description, price,  quantity ,image,id)

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: 'Database error' });
  }
}

// add products
export const addProducts= async (req, res) => {
  try {
    // Extract text fields from req.body (note: no file processing)
    const { name, description, price, quantity, image } = req.body;
    
    // Default quantity to 0 if missing
    const productQuantity = quantity ? parseInt(quantity) : 0;
    
    if (!name || !description || !price || !image) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    
    const result = await productModel.addProducts(name, description, price,  image, quantity)
    
    res.status(201).json({
      message: 'Product inserted successfully',
      productId: result.insertId
    });
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ error: 'Failed to insert product.' });
  }
}

// get products
export  const fetchProducts =async (req, res) => {
  try {
      // await productModel.fetchProducts()
      const products=await productModel.fetchProducts()
      res.json(products)
  } catch (error) {
      console.error('Error fetching products(controller):', error);
      res.status(500).json({ error: 'Failed to fetch products.' });
  }
}

// get products by id


export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
      let products = await productModel.getProductById(id);
      if (!products || products.length === 0) { // Corrected line
          return res.status(404).json({ message: "Product not found" });
      }

      res.json(products[0]); // Corrected line
  } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};


