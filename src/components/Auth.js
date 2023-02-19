import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dashboard from './dashboard';

function Auth() {
    const navigate = useNavigate()

    const [shouldRender, setShouldRender] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            return navigate("/");
        } else {
            setShouldRender(true)
        }
    }, [])
    return shouldRender ? (
        // Render the component here
        <div>
            <Dashboard />
        </div>
    ) : null;
}

export default Auth