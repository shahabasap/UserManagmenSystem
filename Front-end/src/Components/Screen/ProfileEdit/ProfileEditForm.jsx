import React, { useEffect, useRef, useState } from "react";
import "./ProfileEditForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast,ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileEditForm = () => {
  const [userData, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/users/profile")
      .then((response) => {
        setData(response.data.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const name = useRef(null);
  const email = useRef(null);
  const mobilenum = useRef(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileNumError, setMobileNumError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        name: name.current.value,
        email: email.current.value,
        mobilenum: mobilenum.current.value,
      };

      // Validation
      let isValid = true;
      if (!updatedData.name.trim()) {
        setNameError("Name cannot be empty");
        isValid = false;
      } else {
        setNameError("");
      }

      if (!/^\S+@\S+\.\S+$/.test(updatedData.email)) {
        setEmailError("Invalid email format");
        isValid = false;
      } else {
        setEmailError("");
      }

      if (!/^\d{10}$/.test(updatedData.mobilenum)) {
        setMobileNumError("Mobile number must be 10 digits");
        isValid = false;
      } else {
        setMobileNumError("");
      }

      if (isValid) {
        const response = await axios.put("/api/users/profile", updatedData);

        if (response) {
          toast.success("Update SuccessFully");
          setIsEditing(false);
        }
        else{
          toast.error("Update Gone Wrong");
        }
      }
    } catch (error) {
      toast.error("Update Gone Wrong");
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="signupScreen">
      <form>
        <h1>Edit Profile</h1>
        <input
          ref={name}
          type="text"
          placeholder="User name"
          defaultValue={userData?.name}
          disabled={!isEditing}
        />
        {nameError && <div className="error">{nameError}</div>}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          defaultValue={userData?.email}
          disabled={!isEditing}
        />
        {emailError && <div className="error">{emailError}</div>}
        <input
          ref={mobilenum}
          type="number"
          placeholder="Mobile Number"
          defaultValue={userData?.mobilenum}
          disabled={!isEditing}
        />
        {mobileNumError && <div className="error">{mobileNumError}</div>}
        {isEditing ? (
          <button type="button" onClick={handleSubmit}>Save</button>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <h5>
          <Link to="/home">
            <span className="signupScreen_link">Home</span>
          </Link>
        </h5>
      </form>
      <ToastContainer /> 
    </div>
  );
};

export default ProfileEditForm;
