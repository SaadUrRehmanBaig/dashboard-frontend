import React, { useState } from 'react';
import './Register.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setrePassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()

        if (name !== "" & email !== "" & password === rePassword & password !== "") {
            console.log(name, email, password, rePassword)
            const response = await axios.post("https://inquisitive-jumper-dog.cyclic.app/register", { name, email, password }).catch(() => {
                alert("user already exists")
            })
            console.log(response)
            response.data.redirect ? navigate('/') : console.log()
        } else {
            alert("please enter details correctly")
        }
    }

    return (
        <div className="register-wrapper">
            <div className="register-container">
                <h2>Register</h2>
                <form>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="names" onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password-confirm">Confirm Password</label>
                        <input type="password" name="password-confirm" id="password-confirm" onChange={(e) => { setrePassword(e.target.value) }} />
                    </div>
                    <button type="submit" onClick={submit}>Register</button>
                    <br />
                    <br />

                    <button type="submit" onClick={(e) => {
                        e.preventDefault()
                        navigate('/')
                    }}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Register;