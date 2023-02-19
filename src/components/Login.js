import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const login = async (e) => {
        e.preventDefault()
        let response = await axios.post("https://inquisitive-jumper-dog.cyclic.app/login", { email, password }).catch((err) => {
            alert("please enter correct email or password")
        })
        localStorage.setItem("token", response.data.token)
        navigate('/dashboard')
    }
    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Login</h2>
                <form>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <button type="submit" onClick={login}>Login</button>
                    <br />
                    <br />
                    <button type="submit" onClick={(e) => {
                        e.preventDefault()
                        navigate('/register')
                    }}>Register</button>
                </form>
            </div>
        </div>
    );
}

export default Login;