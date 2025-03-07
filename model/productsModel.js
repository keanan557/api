// products model page

// import pool
import {pool} from '../config/config.js'

// delete products function
export const deleteProductsById =  async (id) => {
    return await pool.execute('DELETE FROM products WHERE product_id=?', [id]);
}

// add products
export const addProducts=async(name, description, price, image, productQuantity)=>{
    return await pool.query(
        'INSERT INTO products (name, description, price, image, quantity) VALUES (?, ?, ?, ?, ?)',
        [name, description, price, image, productQuantity]
      );
}

// fetch products
export const fetchProducts= async ()=>{
    let [products] = await pool.query('SELECT * FROM products');
    console.log(products);
    return  products
}

// update products
export const checkIfProducts = async(id)=>{
    const [rows]= await pool.execute('SELECT * FROM products WHERE product_id = ?', [id]);
    return rows
}

export const updateProduct = async(name, description, price, image, quantity, id)=>{
    const query = 'UPDATE products SET name=?, description=?, price=?, quantity=?, image=?  WHERE product_id=?';
    return await pool.execute(query, [name, description, price, image, quantity, id]);
}

// get product by id
export const getProductById = async(id)=>{
    const [product] = await pool.query("SELECT * FROM products WHERE product_id = ?", [id]);
    return product
}

  
  
  