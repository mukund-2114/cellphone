const express = require('express');
const { getProducts, getCustomers, getManufacturers, getOrders, getOrderItems, getSingleProduct, addProduct, registerUser, updateProduct, updatecustomer, deleteuser, deleteproduct } = require('../controllers/cp_controller');


const router = express.Router();

router.get('/',(req,res) => {
    res.status(200).json({"message": "OK"});
})
// Example API endpoint to fetch data from the database
router.get('/api/products', getProducts);
router.get('/api/products/:id', getSingleProduct);
router.get('/api/customers',getCustomers)
router.get('/api/manufacturers',getManufacturers)
router.get('/api/orders',getOrders)
router.get('/api/orderitems',getOrderItems)
router.post('/api/addproducts',addProduct)
router.post('/api/registerUser',registerUser)
router.post('/api/updateproduct',updateProduct)
router.post('/api/updatecustomer',updatecustomer)
router.delete('/api/deletecustomer/:id',deleteuser)
router.delete('/api/deleteproduct/:id',deleteproduct)



module.exports =router;