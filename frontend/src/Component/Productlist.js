import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Productlist = () => {
  const [products, setproducts] = useState([]);


  useEffect(() => {
    getprod();
  }, [])

  const getprod = async () => {
    let result = await fetch('http://localhost:8000/products',{
      headers:{
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    });
    result = await result.json();
    setproducts(result);
  }
  console.log(products)

  const handle=async(id)=>{
    console.log(id);
    let result = await fetch(`http://localhost:8000/product/${id}`, {
      method: 'Delete',
  });

  result = await result.json();
  if(result)
  {
    getprod();
  }
  }

 const handlesearch=async (event)=>{
  let key=event.target.value;
  if(key)
  {
    let result=await fetch(`http://localhost:8000/search/${key}`);
    result=await result.json();
    if(result){
      setproducts(result);
    }
  }
  else{
    getprod();
  }
 
 }


  return (
    <div>
      <h1>Product List</h1>
      <input type='text' placeholder='search' onChange={handlesearch}/>
      <ul>
        <li>S.no:</li>
        <li>Name:</li>
        <li>Price:</li>
        <li>category:</li>
        <li>Operations:</li>
      </ul>
      {
        products.length>0 ? products.map((item, index) =>
          <ul key={item._id}>
            <li>{index}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li><button onClick={()=>handle(item._id)} style={{ backgroundColor: "red" }}>Delete</button></li>
            <Link to={"/update/"+item._id}>Update</Link>
          </ul>
        )
        :
        <h1>No result Found</h1>
      }
    </div>
  )
}

export default Productlist