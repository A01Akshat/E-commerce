import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const [email, setemail] = useState("");
    const [password, setpass] = useState("");
    const navigate=useNavigate();

    const handle = async () => {
        console.log("Email : "+email)
        console.log("password : "+password)
        let result = await fetch('http://localhost:8000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        result = await result.json();
        
        console.log(result);
        if(result.auth)
        {
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate("/");
        }
        else
        {
            alert("ENTER DETAILS");
        }
    }



    return (
        <div>

            <input type='text' placeholder='email'
                onChange={(e) => setemail(e.target.value)}
                value={email}
            />

            <input type='password' placeholder='password'
                onChange={(e) => setpass(e.target.value)}
                value={password}
            />


            <button onClick={handle} type='button' style={{ backgroundColor: "darkorange" }}>Login</button>
        </div>
    )
}

export default Login;