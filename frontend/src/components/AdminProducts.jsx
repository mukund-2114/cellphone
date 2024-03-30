import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminProducts = () => {
    const [data, setData] = useState([]);
    const [productIndex, setProductIndex] = useState(null);
    const [formData, setFormData] = useState({
        id:'',
        pname: '',
        manufactureid: '',
        details: '',
        colour: '',
        size: '',
        storage: '',
        cost: '',
        retail: '',
        sale: '',
        photos: '',
        stock: ''
      });
    
      // Handler function to update form data state
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      // Function to populate form with product details for editing
      const populateFormForEdit = (product) => {
        setFormData({
            id:product.PRODUCT_ID,
            pname: product.PRODUCT_NAME,
            manufactureid: product.MANUF_ID,
            details: product.PROD_DETAILS,
            colour: product.COLOUR,
            size: product.SCREEN_SIZE,
            storage: product.STORAGE_SIZE,
            cost: product.COST,
            retail: product.RETAIL_PRICE,
            sale: product.SALE_PRICE,
            photos: product.PHOTOS,
            stock: product.STOCK
        });
        setProductIndex(product.PRODUCT_ID);
      };
    
      // Handler function to submit form data
      const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
          // Send form data to the server
          const response = await axios.post('http://localhost:5000/api/updateproduct', formData);
          alert(response.data.message)
          console.log(response.data.message);
          // Optionally, reset the form after successful submission
          setFormData({
            pname: '',
            manufactureid: '',
            details: '',
            colour: '',
            size: '',
            storage: '',
            cost: '',
            retail: '',
            sale: '',
            photos: '',
            stock: ''
          });
          console.log('Form submitted successfully');
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const deleteCustomer = async(id)=>{
        // console.log(id)
        const response = await axios.delete(`http://localhost:5000/api/deleteproduct/${id}`);
            alert(response.data.message);
            console.log(response.data.message);
    }
  return (
    <div className='w-3/6 mx-auto mt-10 flex  justify-between items-center h-[85vh]'>
      
        <div>
        {
            data.map((product,index)=>(
                <div key={index} className='flex items-center justify-between gap-6'>
                <b>{index+1}</b>
                <p key={index}>{product.PRODUCT_NAME}</p>
                <div>
                <button className='border text-white bg-black p-2' onClick={()=> populateFormForEdit(product)}>Edit</button>
                <button className='border text-white bg-black p-2' onClick={()=>deleteCustomer(product.PRODUCT_ID)}>Delete</button>
                </div>
                </div>
            ))
        }
        </div>
        <div>
        <h1 className='text-center text-xl font-bold mb-2'>Update Product</h1>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <input type="text" name='pname' className='border border-black py-1 rounded px-8' placeholder='Product Name' onChange={handleInputChange} value={formData.pname} />
        <input type="number" name='manufactureid' className='border border-black py-1 rounded px-8' placeholder='Manufacturer Id' onChange={handleInputChange} value={formData.manufactureid} />
        <textarea name='details' cols="30" rows="5" className='border border-black py-1 rounded px-8' placeholder='Product Details' onChange={handleInputChange} value={formData.details}></textarea>
        <input type="text" name='colour' className='border border-black py-1 rounded px-8' placeholder='Colour' onChange={handleInputChange} value={formData.colour} />
        <input type="number" name='size' className='border border-black py-1 rounded px-8' placeholder='Screen Size' onChange={handleInputChange} value={formData.size} />
        <input type="number" name='storage' className='border border-black py-1 rounded px-8' placeholder='Storage' onChange={handleInputChange} value={formData.storage} />
        <input type="number" name='cost' className='border border-black py-1 rounded px-8' placeholder='Cost' onChange={handleInputChange} value={formData.cost} />
        <input type="number" name='retail' className='border border-black py-1 rounded px-8' placeholder='Retail Price' onChange={handleInputChange} value={formData.retail} />
        <input type="number" name='sale' className='border border-black py-1 rounded px-8' placeholder='Sales Price' onChange={handleInputChange} value={formData.sale} />
        <input type="text" name='photos' className='border border-black py-1 rounded px-8' placeholder='Photo Link' onChange={handleInputChange} value={formData.photos} />
        <input type="number" name='stock' className='border border-black py-1 rounded px-8' placeholder='Stock' onChange={handleInputChange} value={formData.stock} />
        <button type="submit" className='border rounded p-2 bg-black text-white'>Update</button>
      </form>
        </div>
    </div>
  )
}

export default AdminProducts
