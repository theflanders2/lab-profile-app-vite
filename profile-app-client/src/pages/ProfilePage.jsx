import { useState, useEffect } from "react";
import service from "../services/file-upload.service"
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:5005";

function ProfilePage() {
    const [profile, setProfile] = useState({});
    const [imageUrl, setImageUrl] = useState("");

    const { userId } = useParams();
    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);
     
        const uploadData = new FormData();
     
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append("image", e.target.files[0]);
     
        service
          .uploadImage(uploadData)
          .then(response => {
            // console.log("response is: ", response);
            // response carries "fileUrl" which we can use to update the state
            setImageUrl(response.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

    useEffect(() => {
        axios
          .get(`${API_URL}/api/users/${userId}`)
          .then((foundUser) => {
            setProfile(foundUser.data);
          })
          .then(() => {
            navigate(`/users/${userId}`);
          })
          .catch((error) => console.log(error));
        
      }, [userId]);

    return (
      <div>
        <label>Username</label>
        <h3>{profile.username}</h3>

        <label>Campus</label>
        <h3>{profile.campus}</h3>

        <label>Course</label>
        <h3>{profile.course}</h3>

        <img src={profile.image} />
        <input type="file" onChange={(e) => handleFileUpload(e)} />
      </div>


    );
  }
   
  export default ProfilePage;