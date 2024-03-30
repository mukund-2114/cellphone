import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='bg-black p-4 text-white'>
            <nav className='flex w-3/6 mx-auto justify-between '>
                <Link className="logo" to={'/'}>Logo</Link>

                <div className="nav-links w-2/6">
                    <ul className='flex justify-between'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/admin'}>Admin</Link>
                        <Link to={'/addproduct'}>Add Product</Link>
                        <Link to={'/register'}>Register</Link>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar