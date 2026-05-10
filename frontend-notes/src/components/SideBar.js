import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function SideBar() {  
  const [notes,setNotes]=useState([]);  
  const navigate = useNavigate();
  useEffect(()=>{  
    fetch(`${API_BASE_URL}/login`,{  
      method:'GET', 
      headers:{  
        'Content-Type':'application/json'  
      },
    })  
    .then((res)=>{  
      if(!res.ok){
        throw new Error('Network response was not ok');
      }
      return res.json();
    })  
    .then((data)=>{  
      setNotes(data);  
      console.log("Got to Fetched notes:",data);
    })  
    .catch((err)=>{  
      console.log("An error occurred: "+err.message);
    });
  },[]);
  const handleNote=(id, title, description)=>{
    console.log("What is happening here", id);
    navigate('/Display', {
      state: { id, title,description }
    });
  }
  return (
    <div className="App-SideBar">
      <h2>Notes</h2>
      <ul>
        {notes.length>0 ? 
        notes.map((note) => (
          <li key={note.id} onClick={()=>handleNote(note.id,note.title,note.description)}>{note.title}</li>
        ))
        :
        <p>No Notes Available</p>
        }
      </ul>
    </div>
  );
}
export default SideBar;