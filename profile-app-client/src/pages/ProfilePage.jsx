import { useState, useEffect } from "react";
import service from "../services/file-upload.service"
import { useParams, useNavigate } from 'react-router-dom';
import authService from "../services/auth.service";

function ProfilePage() {
    const [profile, setProfile] = useState({});
    const [image, setImage] = useState("");

    const { userId } = useParams();
    const navigate = useNavigate();

    const handleFileUpload = async (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);
     
        const uploadData = new FormData();
     
        // image => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append("image", e.target.files[0]);
     
        try {
          const response = await service.uploadImage(uploadData)
          setImage(response.fileUrl);
        } catch(err){
          console.log("Error while uploading the file: ", err)
        }
      };

      useEffect(() => {
        authService.getCurrentUser(userId)
          .then((response) => setProfile(response.data))
          .catch((error) => console.log(error));
        
      }, [userId]);

      const handleSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the request body
        const requestBody = { image };
    
        // Make an axios request to the API
        // If the POST request is successful, refresh the states and GamesListPage
        // If the request resolves with an error, set the error message in the state
        authService.editUser(userId, requestBody)
          .then(() => navigate(`/users/${userId}`))
      };

    return (
      <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <h3>{profile.username}</h3>

        <label>Campus</label>
        <h3>{profile.campus}</h3>

        <label>Course</label>
        <h3>{profile.course}</h3>

        <img src={profile.image} />
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        <br/>
        <button type="submit">Update Profile</button>
        </form>
      </div>


    );
  }
   
  export default ProfilePage;