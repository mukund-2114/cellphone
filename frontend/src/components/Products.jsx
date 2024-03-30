import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Products = () => {
    const [data, setData] = useState([]);
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
    // console.log(data, setData); 
    
  return (
    <div className='w-3/6 mx-auto mt-10 grid grid-cols-3 gap-4'>
        {
            data.map((product,index)=>(
                <Link to={`/product/${product.PRODUCT_ID}`} key={index}>
                    <div className="text-center flex flex-col justify-center items-center border rounded border-black mt-2 p-2" >
                    <div className="mt-2 w-[250px] h-[300px] border-b-2 border-black pb-3">
                        <img src={`${product.PHOTOS}`} alt="" className='w-full h-full'/>
                    </div>
                    <h1 className='mt-4 text-xl font-semibold '>{product.PRODUCT_NAME}</h1>
                    <p className='text-lg'>${product.SALE_PRICE}</p>
                    {/* <button className='border rounded text-lg border-black'>Add to cart 🛒</button> */}
                </div>
                </Link>
            ))
        }
    </div>
  )
}

export default Products