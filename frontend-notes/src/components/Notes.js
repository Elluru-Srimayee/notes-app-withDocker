import NavigationBar from "./NavigationBar";
import SideBar from "./SideBar";
import {React, useEffect, useState} from "react";  
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";
function Notes(){
    const navigate= useNavigate();
    const location = useLocation();
    const [formData,setFormData]=useState({
        title:'',
        description:''
    });
    useEffect(()=>{
        if(location.state){
            const {title,description}=location.state;
            setFormData({  
                title:title,
                description:description
            });
        }
    },[location.state]);

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const handleClick=(e)=>{
        e.preventDefault();
        const isEdit = location.state?.id;
        const endpoint = isEdit
            ? `api/UpdateNotes`
            : `api/AddNotes`;

        const payload = {
            title: formData.title,
            description: formData.description,
            ...(isEdit && { id: location.state.id }) // include id only if editing
        };


        // const endpoint= location.state ? `http://localhost:8080/UpdateNotes` : "http://localhost:8080/AddNotes";
        fetch(endpoint,{
            method: location.state?'PUT':'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
        })
        .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
        })
            .then(() => {
            alert(isEdit ? "Note Updated Successfully" : "Note Saved Successfully");
            navigate('/HomePage');
            })
            .catch((err) => {
            console.error("Fetch error:", err);
            alert("Failed to save note. Please check your backend.");
            });
                console.log("Note Submitted");
        };
    return (
        <div className="Add-Notes">
            <div className="App-header">
            <NavigationBar/>
            </div>
            <div className="App-Body" style={{ backgroundColor: 'white', height: '50vh', display: 'flex' }}>
                <div className="App-Sidebar">
                    <SideBar/>
                </div>
                <div className="Add-Notes" style={{ margin: '5% auto',
                    width: '100%',
                    height: '100%',
                    maxWidth: '100vh',
                    padding: '30px',
                    marginLeft: '25%',
                    marginTop: '7%',
                    border: '1px solid #dee2e6',
                    borderRadius: '12px',
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'Segoe UI, sans-serif'
                }}>
                    <form>
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
                        <br />
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required/>
                        <br />
                        <button type="submit" onClick={handleClick}>
                            {location.state?.id ? "Update" : "Save"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Notes;