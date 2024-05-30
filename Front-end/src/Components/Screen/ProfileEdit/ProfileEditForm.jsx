import React, { useEffect, useRef, useState } from "react";
import "./ProfileEditForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileEditForm = () => {
  const [userData, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

  useEffect(() => {
    axios
      .get("/api/users/profile")
      .then((response) => {
        setData(response.data.user);
        console.log(response.data.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const name = useRef(null);
  const email = useRef(null);
  const mobilenum = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (name.current || email.current || mobilenum.current) {
        const DataUpdation = await axios.put("/api/users/profile", {
          name: name?.current.value,
          email: email?.current.value,
          mobilenum: mobilenum?.current.value,
        });

        if (DataUpdation) {
          console.log("data updated successfully");
          setIsEditing(false)
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="signupScreen">
      <form onSubmit={handleSubmit}>
        <h1>Edit Profile</h1>
        <input
          ref={name}
          type="text"
          placeholder="User name"
          defaultValue={userData?.name}
          disabled={!isEditing} // Disable the input when not editing
        />
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          defaultValue={userData?.email}
          disabled={!isEditing} // Disable the input when not editing
        />
        <input
          ref={mobilenum}
          type="number"
          placeholder="Mobile Number"
          defaultValue={userData?.mobilenum}
          disabled={!isEditing} // Disable the input when not editing
        />

        {isEditing ? (
          <button type="submit">Save</button>
        ) : (
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
        )}

        <h5>
          <Link to="/home">
            <span className="signupScreen_link">Home</span>
          </Link>
        </h5>
      </form>
    </div>
  );
};

export default ProfileEditForm;
