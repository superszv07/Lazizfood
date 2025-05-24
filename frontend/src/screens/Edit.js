import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function EditProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state?.userData;

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [previewPic, setPreviewPic] = useState('');

    useEffect(() => {
        if (!userData) {
            alert('User not found. Please go back.');
            navigate('/profile');
            return;
        }

        setName(userData.name);
        setAddress(userData.location);
        setEmail(userData.email);
        setProfilePic(userData.profilePic || '');
        setPreviewPic(userData.profilePic || '');
    }, [userData, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                setPreviewPic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/updateUserData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                name,
                location: address,
                profilePic
            })
        });

        const json = await response.json();
        if (json.success) {
            alert('Profile updated successfully!');
            navigate('/profile');
        } else {
            alert('Failed to update profile.');
        }
    };

    return (
        <div className="bg-light text-dark min-vh-100">
            <Navbar />
            <div className="container mt-5 mb-5 p-4 rounded shadow bg-white">
                <h2 className="text-center mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="text-center mb-4">
                        <img
                            src={previewPic || '/profile.png'}
                            alt="Profile"
                            className="rounded-circle"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <div className="text-center mb-4">
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div>

                    <div className="form-group mb-3">
                        <label><strong>Name</strong></label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="form-group mb-3">
                        <label><strong>Address</strong></label>
                        <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>

                    <div className="form-group mb-3">
                        <label><strong>Email</strong></label>
                        <input type="email" className="form-control" value={email} disabled />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Save Changes</button>
                        <button type="button" className="btn btn-secondary ms-3" onClick={() => navigate('/profile')}>Cancel</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}
