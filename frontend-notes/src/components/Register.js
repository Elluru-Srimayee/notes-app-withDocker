import "./Login.css"
import React, { useState } from "react";
import API_BASE_URL from "../config/api";

function Register() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword){
            setMessage("Passwords do not match");
            return;
        }
        setIsLoading(true);
        setMessage('');
        try{
            const response = await fetch(`${API_BASE_URL}/register`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  
        },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    username: formData.username
                })
        });
        if(response.ok){
            const data = await response.json();
            setMessage("Registration Successful! Please Login."+(data.message || ''));
        }else{
            const errorData = await response.json();
            setMessage("Registration Failed! "+(errorData.message || ''));
        }
        }catch(error){
            setMessage("An error occurred: "+error.message);
        }finally{
            setIsLoading(false);
        }
    };
    return (
        <div className="Login-page">
            <div className="Login-form">
                <h2>Register Page</h2>
                <form>
                    <label>Email</label>
                    <input type='email' name='email' value={formData.email} onChange={handleChange} required />
                    <br />
                    <label>Password</label>
                    <input type='password' name='password' value={formData.password} onChange={handleChange} required/>
                    <br />
                    <label>Confirm Password</label>
                    <input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} required />
                    <br />
                    <label>username</label>
                    <input type='username' name='username' value={formData.username} onChange={handleChange} required />
                    <button type='submit' value='Register' disabled={isLoading} onClick={handleSubmit}>{isLoading?'Registering...' :'Register'}</button>
                </form>
                {message&& <p>{message}</p>}
                <div>
                    <p>Already have an account? <a href="/">Login here</a></p>
                </div>
            </div>
        </div>
    );
}
export default Register;