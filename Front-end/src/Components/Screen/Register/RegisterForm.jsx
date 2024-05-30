import React, { useRef, useState } from "react";
import "./RegisterForm.css";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const mobilenum = useRef(null);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "userProfile");
        data.append("cloud_name", "djl33exai");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/djl33exai/image/upload",
          data
        );

        if (response.data) {
          imageUrl = response.data.url; // Get the URL of the uploaded image
          console.log("Image uploaded successfully:", imageUrl);
        } else {
          console.error("Image upload failed");
          return;
        }
      }

      if (name.current && email.current && password.current && mobilenum.current) {
        const DataInsertion = await axios.post('/api/users/', {
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
          mobilenum: mobilenum.current.value,
          imageUrl: imageUrl, // Include the uploaded image URL
        });

        if (DataInsertion) {
          console.log("Data is entered successfully");
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="signupScreen">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <input ref={name} type="text" placeholder="User name" />
        <input ref={email} type="email" placeholder="Email Address" />
        <input ref={password} type="password" placeholder="Password" />
        <input ref={mobilenum} type="number" placeholder="Mobile Number" />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Sign Up</button>

        <h5>
          <Link to="/">
            <span className="signupScreen_link">Sign In now?</span>
          </Link>
        </h5>
      </form>
    </div>
  );
};

export default RegisterForm;
