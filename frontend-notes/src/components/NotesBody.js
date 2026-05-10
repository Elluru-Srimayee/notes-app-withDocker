import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Notes from './Notes';
// import API_BASE_URL from "../config/api";

function NotesBody() {
  const [notes, setNotes] = useState([]);  // Store fetched notes
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`api/notes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setNotes(data);  // Assume data is an array of notes
        console.log("Fetched notes:", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);  // Empty dependency array: fetch once on mount
  const handleEdit=(id,title,description)=>{
    console.log("Edit note with ID:", id);
    navigate('/Display',{
      state:{id,title,description}
    });
  }
  const handleClick=async(id,e)=>{
    e.stopPropagation(); // Prevents triggering parent div's onClick
    e.preventDefault();
    try{
        const response = await fetch(`api/DeleteNotes/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'note-id': id
            },
        });
        if (!response.ok) {
        throw new Error(`Failed to delete note with ID ${id}`);
      }
      alert("Note Deleted Successfully");
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }catch(error){
        console.log("An error occurred: "+error.message);
    }
    console.log("Delete Button clicked");
    alert("Note Deleted Successfully");
  }
  if (loading) {
    return (
      <div className="notes-body" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="note-card">
          <p>Loading notes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notes-body" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="note-card">
          <p>Error loading notes: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-body" style={{ display: 'flex', flexDirection: 'column' }}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id}  className="note-card" onClick={()=>handleEdit(note.id,note.title,note.description)} style={{ marginBottom: '20px', justifyContent:'space-between', display:'flex' }}>
              <div>
                <p>{note.title}</p>
                <p style={{color:'grey'}}>{note.description}</p>
              </div>
              <div>
                <button type='submit' value="Delete" onClick={(e)=>handleClick(note.id,e)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <>
            <h1>Welcome to Notes App</h1>
            <p>Select a note from the sidebar to view or edit it.</p>
          </>
        )}
        <button onClick={() => navigate('/Notes')} className='AddButton'>+</button>
    </div>
  );
}

export default NotesBody;