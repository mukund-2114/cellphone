import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCustomers = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
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

    // Function to populate form with customer details for editing
    const populateFormForEdit = (user) => {
        setFormData({
            id: user.CUST_NUM,
            fname: user.FIRST_NAME,
            lname: user.LAST_NAME,
            email: user.EMAIL,
            address: user.ADDRESS,
            city: user.CITY,
            province: user.PROVINCE,
            postalcode: user.POSTAL_CODE,
        });
    };

    // Handler function to submit form data
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send form data to the server
            const response = await axios.post('http://localhost:5000/api/updatecustomer', formData);
            alert(response.data.message);
            console.log(response.data.message);
            // Optionally, reset the form after successful submission
            setFormData({
                id: '',
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
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/customers');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const deleleUser = async(id)=>{
        const response = await axios.delete(`http://localhost:5000/api/deletecustomer/${id}`);
            alert(response.data.message);
            console.log(response.data.message);
    }
    return (
        <div className='w-3/6 mx-auto mt-10 flex justify-between items-center h-[85vh]'>
            <div>
                {data.map((user, index) => (
                    <div key={index} className='flex items-center justify-between gap-6'>
                        <b>{index + 1}</b>
                        <p>{user.FIRST_NAME} {user.LAST_NAME}</p>
                        <div>
                            <button className='border text-white bg-black p-2' onClick={() => populateFormForEdit(user)}>Edit</button>
                            <button className='border text-white bg-black p-2' onClick={()=>deleleUser(user.CUST_NUM)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <form className='flex justify-center items-center h-[85vh]' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-center text-xl mb-7 font-bold'>Update Customer</h1>
                    <input name='fname' type="text" className='border border-black py-2 rounded px-8' placeholder='First Name' onChange={handleInputChange} value={formData.fname} />
                    <input name='lname' type="text" className='border border-black py-2 rounded px-8' placeholder='Last Name' onChange={handleInputChange} value={formData.lname} />
                    <input name='email' type="text" className='border border-black py-2 rounded px-8' placeholder='Email' onChange={handleInputChange} value={formData.email} />
                    <textarea name="address" className='border border-black py-2 rounded px-8' placeholder='Address' id="" cols="30" rows="2" onChange={handleInputChange} value={formData.address}></textarea>
                    <input name='city' type="text" className='border border-black py-2 rounded px-8' placeholder='City' onChange={handleInputChange} value={formData.city} />
                    <input name='province' type="text" className='border border-black py-2 rounded px-8' placeholder='Province' onChange={handleInputChange} value={formData.province} />
                    <input name='postalcode' type="text" className='border border-black py-2 rounded
px-8' placeholder='Postal Code' onChange={handleInputChange} value={formData.postalcode} />
                    <button type="submit" className='border rounded p-2 bg-black text-white'>Update</button>
                </div>
            </form>
        </div>
    );
}

export default AdminCustomers;
