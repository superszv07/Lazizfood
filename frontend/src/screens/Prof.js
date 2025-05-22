import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Profile() {
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        const response = await fetch("http://localhost:5000/api/getUserData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: localStorage.getItem('userEmail') })
        });

        const json = await response.json();
        if (json.success) {
            setUserData(json.user);
        } else {
            alert(json.message || "User not found");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className='bg-white text-dark'>
            <Navbar />

            <div className='container mt-5 mb-5 p-4 rounded shadow' style={{ backgroundColor: 'blue' }}>
                {userData ? (
                    <div className="card p-4 shadow-sm d-flex flex-row align-items-center bg-white text-dark" >
                        {/* Left Side: User Details */}
                        <div className="flex-grow-1  p-3 rounded">
                            <h4 className="mb-3">Profile Details</h4>
                            <p><strong>Name:</strong> {userData.name}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Address:</strong> {userData.location}</p>
                            <p><strong>Joined On:</strong> {new Date(userData.date).toLocaleDateString()}</p>
                        </div>

                        {/* Right Side: Profile Image */}
                        <div className="ms-4 ">
                            <img
                                src={userData.profilePic || '/profile.png'} // fallback if profilePic is not set
                                alt="User Profile"
                                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-5">Loading user data...</div>
                )}
            </div>

            <Footer />
        </div>
    );
}
