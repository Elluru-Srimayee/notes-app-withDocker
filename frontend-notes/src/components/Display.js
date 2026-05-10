import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Removed React import as it's not needed in modern React
import NavigationBar from "./NavigationBar";
import SideBar from "./SideBar";
import '../App.css'

function Display() {
    const location = useLocation();
    const navigate = useNavigate();
    const [noteData, setNoteData] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        if (location.state) {
            const { title, description } = location.state;
            setNoteData({
                title: title,
                description: description
            });
        }
    }, [location.state]);

    return (
        <div className="Display">
            <div className="App-header">
                <NavigationBar />
            </div>
            <div className="App-Body">
                <div className = "App-Sidebar">
                    <SideBar/>
                </div>
                <div className="Display-Body">
                    {noteData.title && noteData.description ? (
                        <div className="notes-card">
                            <div className="card-header">
                                <h2 className="notes-title">{noteData.title}</h2>
                            </div>
                            <div className="card-body">
                                <p className="notes-description">{noteData.description}</p>
                            </div>
                            <div className="card-actions">
                                <button className="btn btn-secondary" onClick={() => navigate('/HomePage')}>Back to Home</button>
                                <button className="btn btn-primary" onClick={() => navigate('/Notes', { state: { id: location.state.id, title: noteData.title, description: noteData.description } })}>Edit Note</button>
                                <button className="btn btn-success" onClick={() => navigate('/Notes')}>Add New Note</button>
                                <button className="btn btn-danger" onClick={() => navigate('/DeleteNote', { state: { id: location.state.id } })}>Delete Note</button>
                            </div>
                        </div>
                    ) : (
                        <div className="notes-card empty-card">
                            <p>No note data available. Please Select a note from SideBar.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Display;