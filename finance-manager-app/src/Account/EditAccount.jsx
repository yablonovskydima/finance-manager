import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';

const EditAccount = () => 
{
    const [oldUsername, setOldUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [oldEmail, setOldEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const { username } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = async () => {
        try {
            await axios.put(`http://localhost:8080/api/v1/auth/users/${username}/change-username`, {
                oldValue: oldUsername,
                newValue: newUsername
            });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
            navigate('/login');
        } catch (error) {
            setErrorMessage(error.response.data.message || 'Failed to update username');
        }
    };

    const handleEmailChange = async () => {
        try {
            await axios.put(`http://localhost:8080/api/v1/auth/users/${username}/change-email`, {
                oldValue: oldEmail,
                newValue: newEmail
            });
            alert('Email updated successfully');
            navigate("/categories");
        } catch (error) {
            setErrorMessage(error.response.data.message || 'Failed to update email');
        }
    };

    const handlePasswordChange = async () => {
        try {
            await axios.put(`http://localhost:8080/api/v1/auth/users/${username}/change-password`, {
                oldValue: oldPassword,
                newValue: newPassword
            });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
            navigate('/login');
        } catch (error) {
            setErrorMessage(error.response.data.message || 'Failed to update password');
        }
    };

    const handleDropAccount = async () =>
        {
            const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
           if(confirmDelete)
            {
                try{
                    await axios.delete(`http://localhost:8080/api/v1/auth/users/${username}/drop-account`);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('username');
                    navigate('/login');
                }catch(error){
                    setErrorMessage(error.response.data.message || 'Failed to drop account');
                }
            }
        };

    return(
        <div className="container mt-4">
        <h2>Edit Account</h2>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
        <form className="mb-4">
            <div className="mb-3">
                <label className="form-label">Old Username</label>
                <input type="text" className="form-control" value={oldUsername} onChange={(e) => setOldUsername(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">New Username</label>
                <input type="text" className="form-control" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleUsernameChange}>Change Username</button>
        </form>

        <form className="mb-4">
            <div className="mb-3">
                <label className="form-label">Old Email</label>
                <input type="email" className="form-control" value={oldEmail} onChange={(e) => setOldEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">New Email</label>
                <input type="email" className="form-control" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleEmailChange}>Change Email</button>
        </form>

        <form className="mb-4">
            <div className="mb-3">
                <label className="form-label">Old Password</label>
                <input type="password" className="form-control" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">New Password</label>
                <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <button type="button" className="btn btn-primary" onClick={handlePasswordChange}>Change Password</button>
        </form>
        <button type="button" className="btn btn-danger" onClick={handleDropAccount}>Delete Account</button>
    </div>
    );
}

export default EditAccount;