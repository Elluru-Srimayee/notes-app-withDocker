// import logo from './logo.svg';
import './App.css';
// import NavigationBar from './components/NavigationBar';
// import SideBar from './components/SideBar';
import './components/sidebar.css';
// import NotesBody from './components/NotesBody';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Notes from './components/Notes';
import Display from './components/Display';
import Welcome from './components/Welcome';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <div>
          <NavigationBar/>
        </div>
      </header>
      <div className='App-Body' >
        <div className= 'App-Sidebar' >
            <SideBar/>
        </div>
        <div className= 'App-NotesBody'>
          <div>
          <NotesBody/>
          <NotesBody/>
          </div>
          <div>
          <NotesBody/>
          <NotesBody/>
          </div>
        </div>
      </div> */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/HomePage' element={<HomePage/>}/>
        <Route path='/Notes' element={<Notes/>}/>
        <Route path='/Display' element={<Display/>}/>
        <Route path='/Welcome' element={<Welcome/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
