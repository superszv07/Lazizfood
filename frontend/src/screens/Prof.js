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
                    <div>
                        <h2 className="text-center text-white mb-4">User Profile</h2>
                        <div className="card p-4 shadow-sm bg-white text-dark">
                            <div className="row align-items-center">
                                {/* Profile Image */}
                                <div className="col-md-4 text-center mb-4 mb-md-0">
                                    <img
                                        src={userData.profilePic || '/profile.png'}
                                        alt="User Profile"
                                        className="img-fluid rounded-circle"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                </div>

                                {/* User Details */}
                                <div className="col-md-8">
                                    <p className='fs-5'><strong>Name:</strong> {userData.name}</p>
                                    <p className='fs-5'><strong>Email:</strong> {userData.email}</p>
                                    <p className='fs-5'><strong>Address:</strong> {userData.location}</p>
                                    <p className='fs-5'><strong>Joined On:</strong> {new Date(userData.date).toLocaleDateString()}</p>
                                </div>
                            </div>
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
