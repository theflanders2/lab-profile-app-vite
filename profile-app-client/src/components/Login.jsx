import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { username, password };
     
       authService.logIn(requestBody)
          .then((response) => { storeToken(response.data.authToken) })
          .then(()=> {
            authenticateUser()
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