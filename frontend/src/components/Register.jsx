import React, { useState } from 'react'
import axios from 'axios'
const Register = () => {

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        address: '',
        city: '',
        province: '',
        postalcode: '',
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
            const response = await axios.post('http://localhost:5000/api/registerUser', formData);
            alert(response.data.message)
            console.log(response.data.message);
            // Optionally, reset the form after successful submission
            setFormData({
                fname: '',
                lname: '',
                email: '',
                address: '',
                city: '',
                province: '',
                postalcode: '',
            });
            console.log('Form submitted successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        // console.log(formData)
    };
    return (
        <form className='flex justify-center items-center h-[85vh]' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
                <h1 className='text-center text-xl mb-7 font-bold'>Register</h1>
                <input name='fname' type="text" className='border border-black py-2 rounded px-8' placeholder='First Name' onChange={handleInputChange} />
                <input name='lname' type="text" className='border border-black py-2 rounded px-8' placeholder='Last Name' onChange={handleInputChange}/>
                <input name='email' type="text" className='border border-black py-2 rounded px-8' placeholder='Email' onChange={handleInputChange}/>
                <textarea name="address" className='border border-black py-2 rounded px-8' placeholder='Address' id="" cols="30" rows="2" onChange={handleInputChange}></textarea>
                <input name='city' type="text" className='border border-black py-2 rounded px-8' placeholder='City' onChange={handleInputChange}/>
                <input name='province' type="text" className='border border-black py-2 rounded px-8' placeholder='Province' onChange={handleInputChange}/>
                <input name='postalcode' type="text" className='border border-black py-2 rounded px-8' placeholder='Postal Code' onChange={handleInputChange}/>
                <button type="submit" className='border rounded p-2 bg-black text-white'>Submit</button>
            </div>
        </form>
    )
}

export default Register