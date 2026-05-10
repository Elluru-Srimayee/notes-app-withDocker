import { useNavigate } from "react-router-dom";
function NavigationBar(){
    const navigate = useNavigate();
    return(
        <div className="NavigationBar">
        <div flexDirection="row" style = {{display: 'flex', justifyContent: 'space-around', width: '500px'}}>
            <p onClick={()=>navigate('/Homepage')} style={{}}>Home</p>
            <p onClick={()=>navigate('/Display')}>Display</p>
            <p>Test</p>
            <p>About</p>
            <p>Contact Us</p>
        </div>

        {localStorage.getItem('username') ? (
        <div flexDirection="row" style = {{display: 'flex', justifyContent: 'space-around', width: '150px'}}>
            <select
                onChange={(e) => {
                const selected = e.target.value;
                if (selected === 'logout') {localStorage.removeItem('username'); navigate('/')};
                }}
                defaultValue="username"
                style={{ padding: '5px', borderRadius: '4px' }}
                >
                <option value={"username"} disabled>{localStorage.getItem('username')}</option>
                <option value={"logout"}>Logout</option>
            </select>
        </div>
        ) :
        <div flexDirection="row" style = {{display: 'flex', justifyContent: 'space-around', width: '250px'}}>
            <select
                onChange={(e) => {
                const selected = e.target.value;
                if (selected === 'login') navigate('/');
                else if (selected === 'register') navigate('/Register');
                }}
                defaultValue=""
                style={{ padding: '5px', borderRadius: '4px' }}
            >
                <option value="" disabled>Login/Register</option>
                <option value="login">Login</option>
                <option value="register">Register</option>
            </select>
        </div>}
        </div>
    ); 
}
export default NavigationBar;