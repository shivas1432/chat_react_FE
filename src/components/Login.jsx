import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/login.css'; // Ensure this path is correct

const Login = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [step, setStep] = useState(1); // Step to manage login and registration flow
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to check if the mobile number is registered
    const handleCheckMobile = async () => {
        const cleanedMobileNumber = mobileNumber.trim(); // Trim spaces
        if (!/^(0)?\d{10}$/.test(cleanedMobileNumber)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8081/api/check-mobile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobile: cleanedMobileNumber }),
            });

            const result = await response.json();

            if (response.ok) {
                if (result.registered) {
                    // Mobile number exists, proceed to the sidebar (chat page)
                    navigate('/chat'); // Navigate to sidebar page
                } else {
                    // Mobile number is not registered, prompt to register
                    setStep(2); // Change step to show registration link or form
                }
            } else {
                // If there was an issue with the response
                console.error('Error:', result.message);
            }
        } catch (error) {
            alert(`Network error: ${error.message || 'Failed to fetch'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login to Your Account</h2>
            <p>Please enter your mobile number to check if you are registered.</p>

            {step === 1 && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        disabled={loading}
                    />
                    <button onClick={handleCheckMobile} disabled={loading}>
                        {loading ? 'Checking...' : 'Check Mobile Number'}
                    </button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <p>It seems you are not registered. Please register to proceed.</p>
                    {/* Link to registration page */}
                    <Link to="/register">Go to Registration</Link>
                </div>
            )}

            <p className="register-link">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;
