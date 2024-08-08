import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpass] = useState("");
    const navigate = useNavigate();

    const collectdata = async () => {
        try {
            let result = await fetch('http://localhost:8000/register', {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!result.ok) {
                throw new Error('Failed to register');
            }

            result = await result.json();
            console.log(result);
            if (result) {
                localStorage.setItem("user", JSON.stringify(result.result));
                localStorage.setItem("token", JSON.stringify(result.auth));
                navigate("/");
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    return (
        <>
            <h1>Register</h1>
            <input type='text' placeholder="Name" value={name} onChange={(e) => setname(e.target.value)}></input>
            <input type='text' placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)}></input>
            <input type='password' placeholder="Password" value={password} onChange={(e) => setpass(e.target.value)}></input>
            <button onClick={collectdata} style={{ backgroundColor: "cyan" }}>Signup</button>
        </>
    )
}
export default Signup;
