import React, { useState } from 'react'

const Addprod = () => {
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [category, setcat] = useState("");
    const [company, setcomp] = useState("");
    const [error, seterror] = useState(false);
    const handle = async () => {

        if (!name || !price || !category || !company) {
            seterror(true);
            return false;
        }


        const userid = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch('http://localhost:8000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company,userid }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        result = await result.json();
        console.log(result);

    }
    return (
        <>
            <h1>Add Product</h1>

            <input type='text' placeholder='enter name of product' onChange={(e) => { setname(e.target.value) }} value={name} />
            {error && !name && <span style={{ color: "red" }}>Enter valid name</span>}

            <input type='text' placeholder='enter price' onChange={(e) => { setprice(e.target.value) }} value={price} />
            {error && !price && <span style={{ color: "red" }}>Enter price</span>}


            <input type='text' placeholder='enter category' onChange={(e) => { setcat(e.target.value) }} value={category} />
            {error && !category && <span style={{ color: "red" }}>Enter valid category</span>}


            <input type='text' placeholder='enter company' onChange={(e) => { setcomp(e.target.value) }} value={company} />
            {error && !company && <span style={{ color: "red" }}>Enter valid company</span>}


            <button style={{ backgroundColor: "green", color: "cyan" }} onClick={handle}>Add Product</button>
        </>
    )
}

export default Addprod;