import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const checkCredentials = () => {
        if  (email === "admin@gmail.com" && password === "admin") {
            setIsAdmin(true);
            console.log("Welcome to Admin");
        } else {
            alert("Incorrect credentials");
        }
    };

    return (
        <div className='flex flex-col justify-center'>
            {!isAdmin && (
                <form className='flex justify-center items-center h-[85vh]' >
                <div className='flex flex-col gap-4'>
                    <h1 className='text-center text-xl mb-7 font-bold'>Admin Login</h1>
                    <input name='email' type="email" className='border border-black py-2 rounded px-8' placeholder='Email'  onChange={(e)=> setemail(e.target.value)} />
                    <input name='password' type="password" className='border border-black py-2 rounded px-8' placeholder='Password' onChange={(e)=> setpassword(e.target.value)}/>
                    
                    <button type="submit" className='border rounded p-2 bg-black text-white' onClick={checkCredentials}>Submit</button>
                </div>
            </form>
            )}
            {isAdmin && (
                <div className='w-3/6 mx-auto mt-10 grid grid-cols-2 gap-4 h-[85vh]'>
                        <Link to='/admin/product'>
                            <div className="text-center flex flex-col justify-center items-center border rounded border-black mt-2 p-2" >
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 1024 1024"><path fill="currentColor" fillRule="evenodd" d="M160 144h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H160c-8.837 0-16-7.163-16-16V160c0-8.837 7.163-16 16-16m564.314-25.333l181.019 181.02c6.248 6.248 6.248 16.378 0 22.627l-181.02 181.019c-6.248 6.248-16.378 6.248-22.627 0l-181.019-181.02c-6.248-6.248-6.248-16.378 0-22.627l181.02-181.019c6.248-6.248 16.378-6.248 22.627 0M160 544h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H160c-8.837 0-16-7.163-16-16V560c0-8.837 7.163-16 16-16m400 0h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H560c-8.837 0-16-7.163-16-16V560c0-8.837 7.163-16 16-16"></path></svg>
                            <h1 className='mt-4 text-xl font-semibold '>Product Management</h1>
                            
                        </div>
                        </Link>
                        <Link to='/admin/customer'>
                            <div className="text-center flex flex-col justify-center items-center border rounded border-black mt-2 p-2" >
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path></svg>
                            <h1 className='mt-4 text-xl font-semibold '>Customer Management</h1>
                            
                        </div>
                        </Link>
            </div>
            )}
        </div>
    );
};

export default AdminPanel;
