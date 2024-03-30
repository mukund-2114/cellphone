import React, { useState } from 'react';
import axios from 'axios';

const AddProducts = () => {
  // State to store form data
  const [formData, setFormData] = useState({
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

  // Handler function to submit form data
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Send form data to the server
      const response = await axios.post('http://localhost:5000/api/addproducts', formData);
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

  return (
    <div className='w-80 mx-auto p-6'>
      <h1 className='text-center text-xl'>Add Products</h1>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <input type="text" name='pname' className='border border-black py-2 rounded px-8' placeholder='Product Name' onChange={handleInputChange} value={formData.pname} />
        <input type="number" name='manufactureid' className='border border-black py-2 rounded px-8' placeholder='Manufacturer Id' onChange={handleInputChange} value={formData.manufactureid} />
        <textarea name='details' cols="30" rows="5" className='border border-black py-2 rounded px-8' placeholder='Product Details' onChange={handleInputChange} value={formData.details}></textarea>
        <input type="text" name='colour' className='border border-black py-2 rounded px-8' placeholder='Colour' onChange={handleInputChange} value={formData.colour} />
        <input type="number" name='size' className='border border-black py-2 rounded px-8' placeholder='Screen Size' onChange={handleInputChange} value={formData.size} />
        <input type="number" name='storage' className='border border-black py-2 rounded px-8' placeholder='Storage' onChange={handleInputChange} value={formData.storage} />
        <input type="number" name='cost' className='border border-black py-2 rounded px-8' placeholder='Cost' onChange={handleInputChange} value={formData.cost} />
        <input type="number" name='retail' className='border border-black py-2 rounded px-8' placeholder='Retail Price' onChange={handleInputChange} value={formData.retail} />
        <input type="number" name='sale' className='border border-black py-2 rounded px-8' placeholder='Sales Price' onChange={handleInputChange} value={formData.sale} />
        <input type="text" name='photos' className='border border-black py-2 rounded px-8' placeholder='Photo Link' onChange={handleInputChange} value={formData.photos} />
        <input type="number" name='stock' className='border border-black py-2 rounded px-8' placeholder='Stock' onChange={handleInputChange} value={formData.stock} />
        <button type="submit" className='border rounded p-2 bg-black text-white'>Submit</button>
      </form>
    </div>
  );
}

export default AddProducts;
