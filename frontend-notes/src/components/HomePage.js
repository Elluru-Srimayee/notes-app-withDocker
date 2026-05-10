import NavigationBar from "./NavigationBar";
import NotesBody from "./NotesBody";
import SideBar from "./SideBar";
function HomePage() {
  return (
    <div className="HomePage">
        <div className="App-header">
            <NavigationBar/>
        </div>
        <div className="App-Body">
            <div className="App-Sidebar">
                <SideBar/>
            </div>
            <div className="App-NotesBody"> 
                <NotesBody/>
            </div>
        </div>
    </div>
  );
}
export default HomePage;