import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';

const UpdateProd = () => {
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [category, setcat] = useState("");
    const [company, setcomp] = useState("");
    const [error, seterror] = useState(false);
    const params = useParams();
    const navigate=useNavigate();

    useEffect(() => {
        getprod();
    }, [])

    const getprod = async () => {
        let result = await fetch(`http://localhost:8000/product/${params.id}`);
        result = await result.json();
        console.log(result);
        setname(result.name);
        setprice(result.price);
        setcat(result.category);
        setcomp(result.company);
    }

    const handle = async () => {
        let result = await fetch(`http://localhost:8000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        result = await result.json();
        console.log(result);
        navigate("/")
    }


    return (
        <>
            <h1>Update Product</h1>

            <input type='text' placeholder='enter name of product' onChange={(e) => { setname(e.target.value) }} value={name} />


            <input type='text' placeholder='enter price' onChange={(e) => { setprice(e.target.value) }} value={price} />



            <input type='text' placeholder='enter category' onChange={(e) => { setcat(e.target.value) }} value={category} />



            <input type='text' placeholder='enter company' onChange={(e) => { setcomp(e.target.value) }} value={company} />



            <button style={{ backgroundColor: "yellow", color: "black" }} onClick={handle}>Update Product</button>
        </>
    )
}

export default UpdateProd;