import React, { useRef, useState } from "react";
import Navbar from '../Nav';
import "./addUser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const AddUser = () => {
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const mobilenum = useRef(null);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = "";
            if (image && !imageUrl ) {
                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", "userProfile");
                console.log(data);

                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/djl33exai/image/upload",
                    data
                );

                if (response.data) {
                    imageUrl = response.data.url; // Get the URL of the uploaded image
                    console.log("image url",imageUrl)
                } else {
                    console.error("Image upload failed");
                    return;
                }
            }

            if (name.current && email.current && password.current && mobilenum.current && imageUrl) {
                const DataInsertion = await axios.post('/api/admin/AddUser', {
                    name: name.current.value,
                    email: email.current.value,
                    password: password.current.value,
                    mobilenum: mobilenum.current.value,
                    imageUrl: imageUrl, // Include the uploaded image URL
                });

                if (DataInsertion) {
                    navigate('/admin'); // Redirect to the users list page
                }
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="signupScreen">
                <form onSubmit={handleSubmit}>
                    <h1>Add User</h1>
                    <input ref={name} type="text" placeholder="User name" />
                    <input ref={email} type="email" placeholder="Email Address" />
                    <input ref={password} type="password" placeholder="Password" />
                    <input ref={mobilenum} type="number" placeholder="Mobile Number" />
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />

                    <button type="submit">Add User</button>
                    <Link to='/admin/home'><span className="Back-track">Back</span></Link>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
