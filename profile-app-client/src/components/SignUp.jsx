import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 
const API_URL = "http://localhost:5005";
 
function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [campus, setCampus] = useState("");
    const [course, setCourse] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
   
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the request body
        const requestBody = { username, password, campus, course };
     
        // Make an axios request to the API
        // If the POST request is a successful redirect to the login page
        // If the request resolves with an error, set the error message in the state
        axios.post(`${API_URL}/auth/signup`, requestBody)
          .then(() => {
            navigate('/login');
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
      };

    return (
        <div className="SignupPage">
            <h1>Sign Up</h1>
        
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
        
                <label>Campus</label>
                <select 
                name="campus"
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                >
                    <option></option>
                    <option>Amsterdam</option>
                    <option>Barcelona</option>
                    <option>Berlin</option>
                    <option>Lisbon</option>
                    <option>Madrid</option>
                    <option>México</option>
                    <option>Miami</option>
                    <option>Paris</option>
                    <option>Sao Paulo</option>
                    <option>Remote</option>
                </select>

                <label>Course</label>
                <select 
                name="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                >
                    <option></option>
                    <option>Cyber Security</option>
                    <option>Data Analytics</option>
                    <option>UX/UI</option>
                    <option>Web Dev</option>
                </select>

                <p>If you signup, you agree with all our terms and conditions</p>
                <p>where we can do whatever we want with the data!</p>
        
                <button type="submit">Create the Account</button>
            </form>
        
            { errorMessage && <p className="error-message">{errorMessage}</p> }
        </div>
    );
  }
   
  export default SignUp;