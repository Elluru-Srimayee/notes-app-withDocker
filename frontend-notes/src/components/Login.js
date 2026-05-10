// import { use } from 'react';
import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../config/api";
function Login(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });  
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!formData.email || !formData.password){
            alert("Please fill in all fields");
            return;
        }
        try{
            const response = await fetch(`/api/login`,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email:formData.email,
                    password: formData.password
                })
            });
            if(response.ok){
                const data = await response.json();
                console.log(data.username);
                setMessage(data.message || 'Login Successful');
                localStorage.setItem('username', data.username);
                navigate('/HomePage');
            }else{
                const errorData = await response.json();
                setMessage(errorData.message || 'Login Failed');
            }
        }catch(error){
            alert("An error occurred: "+error.message); 
            console.log("An error occurred: "+error.message);
        }
    };
    
    return(
        <div className = 'Login-page'>
            <div className='Login-form'>
                <h2>Login Page</h2>
                <form>
                    <label>email</label>
                    <input type='email' name='email'value={formData.email} onChange={handleChange} required/>
                    <br/>
                    <label>Password</label>
                    <input type='password' name='password'value={formData.password} onChange={handleChange} required/>
                    <br/>
                    <button type='submit' value='Login' onClick={handleSubmit}>Login</button>
                </form>
                {message&& <p>{message}</p>}
                <a href="https://station-h.hexaware.com/apps">Forgot Password?</a>
                <br/>
                <br/>
                <hr/>
                <div flexDirection='row' style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <p>New User?</p>
                    <a href="/Register">Register Here</a>
                </div>
            </div>
        </div>
    );
}
export default Login;