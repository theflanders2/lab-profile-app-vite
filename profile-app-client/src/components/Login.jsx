import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { username, password };
     
        axios.post(`${API_URL}/auth/login`, requestBody)
          .then((response) => {
          // Request to the server's endpoint `/auth/login` returns a response
          // with the JWT string ->  response.data.authToken
            console.log('JWT token', response.data.authToken );
            storeToken(response.data.authToken) // this will store the token in localStorage   
          })
          .then(()=> {
            authenticateUser() // update the auth state variables accordingly
            navigate('/'); 
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
      };

    return (
      <div>
        <h1>Login</h1>
 
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
        </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }

        <p>If you do not have an account yet, you</p>
        <p>can create your account <Link to={"/signup"}>here</Link></p>
      </div>
    );
  }
   
  export default Login;