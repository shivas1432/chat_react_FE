import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../css/register.css'; // Import the CSS file

const Register = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to track registration success
    const [errorMessage, setErrorMessage] = useState(''); // State to track error messages
    const navigate = useNavigate(); // Create navigate instance

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('Registering with:', { name, mobile, email }); // Log the values being sent

        try {
            const response = await fetch('http://localhost:8081/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, mobile, email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed.');
            }

            const data = await response.json();
            console.log(data); // Handle successful registration

            // Set success message and reset form fields
            setRegistrationSuccess(true);
            setName('');
            setMobile('');
            setEmail('');
            setErrorMessage('');
        } catch (error) {
            console.error('Error during registration:', error.message);
            setErrorMessage(error.message); // Set error message
            setRegistrationSuccess(false); // Ensure success is false on error
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Mobile Number"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <button type="submit">Register</button>
            </form>

            {/* Display success message and login link */}
            {registrationSuccess && (
                <div className="success-message">
                    <p>Registration successful!</p>
                    <button onClick={() => navigate('/login')}>Login Now</button> {/* Navigate to login */}
                </div>
            )}

            {/* Display error message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Already have an account link */}
            <p className="login-link">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;
