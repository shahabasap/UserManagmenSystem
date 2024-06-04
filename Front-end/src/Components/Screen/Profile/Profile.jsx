import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [userData, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [isModified, setIsModified] = useState(false);
  const [isLoading, SetLoading] = useState(false);

  useEffect(() => {
    axios
      .get("/api/users/profile")
      .then((response) => {
        setData(response.data.user);
        setIsModified(false);
        SetLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [isModified]);

  const imageUploader = async () => {
    try {
      let imageUrl = "";

      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "userProfile");
        SetLoading(true);
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/djl33exai/image/upload",
          data
        );

        if (response.data) {
          imageUrl = response.data.url; // Get the URL of the uploaded image
          await axios
            .put("/api/users/profile", {
              imageUrl: imageUrl,
            })
            .then((response) => {
             
              console.log(response.data);
              setIsModified(true); // Trigger re-fetching of user data
            })
            .catch((error) => {
              console.log(error.message);
            });
        } else {
          console.error("Image upload failed");
          return;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Profile-Screen">
      <div className="middleDiv">
        <div className="profile-contents">
          <div className="image-flex">
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <img
                className="profile-image"
                src={userData?.imageUrl}
                alt="Profile"
              />
            )}
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              className="upload-name"
              type="file"
            />
            <button onClick={imageUploader} className="btn-upload">
              Upload
            </button>
          </div>
          <div className="user-details">
            <div>
              <span>Name</span> :{userData?.name}
            </div>{" "}
            <br />
            <div>
              <span>Email</span>:{userData?.email}
            </div>{" "}
            <br />
            <div>
              <span>Number</span>:{userData?.mobilenum}
            </div>
            <br />
            <Link to="/profileEdit">
              <button className="edit-button">Edit</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
