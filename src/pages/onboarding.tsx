import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginBackground from '../media/images/loginBackground.webp';
import registerBackground from '../media/images/registerBackground.webp';

interface OnboardingProps {
    direction?: string; 
}

const Onboarding: React.FC<OnboardingProps> = ({ direction }) => {
    const navigate = useNavigate();

    const [registerCredentials, setRegisterCredentials] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [loginCredentials, setLoginCredentials] = useState({
        email: '',
        password: '',
    });

    const [isPasswordMasked, setIsPasswordMasked] = useState(true);

    const isPasswordLengthValid = (password: string) => password.length >= 6;
    const arePasswordsMatching = (password: string, confirmPassword: string) => password === confirmPassword;
    const isEmailValid = (email: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterCredentials({
            ...registerCredentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegisterSubmit = () => {
        const { username, email, password, confirmPassword } = registerCredentials;

        if (!isEmailValid(email) || !isPasswordLengthValid(password) || !arePasswordsMatching(password, confirmPassword)) {
            setRegisterCredentials({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            alert('Please ensure all fields meet validation requirements.');
            return;
        }
        console.log("calling register");
    };

    const handleLoginSubmit = () => {
        const { email, password } = loginCredentials;

        if (!isEmailValid(email) || !isPasswordLengthValid(password)) {
            setLoginCredentials({
                email: '',
                password: '',
            });
            alert('Invalid email or password length.');
            return;
        }
        console.log("Calling login");
    };

    const togglePasswordMask = () => {
        setIsPasswordMasked(!isPasswordMasked);
    };

    return (
        <div style={containerStyle}>
            <div style={{ ...sectionStyle, backgroundImage: `url(${registerBackground})` }}>
                <h2>Register</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={registerCredentials.username}
                    onChange={handleRegisterChange}
                    style={inputStyle}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registerCredentials.email}
                    onChange={handleRegisterChange}
                    style={inputStyle}
                />
                <div style={passwordContainerStyle}>
                    <input
                        type={isPasswordMasked ? 'password' : 'text'}
                        name="password"
                        placeholder="Password"
                        value={registerCredentials.password}
                        onChange={handleRegisterChange}
                        style={passwordInputStyle}
                    />
                    <button onClick={togglePasswordMask} style={toggleButtonStyle}>
                        {isPasswordMasked ? 'Show' : 'Hide'}
                    </button>
                </div>
                <div style={passwordContainerStyle}>
                    <input
                        type={isPasswordMasked ? 'password' : 'text'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={registerCredentials.confirmPassword}
                        onChange={handleRegisterChange}
                        style={passwordInputStyle}
                    />
                    <button onClick={togglePasswordMask} style={toggleButtonStyle}>
                        {isPasswordMasked ? 'Show' : 'Hide'}
                    </button>
                </div>
                <button onClick={handleRegisterSubmit} style={buttonStyle}>Register</button>
            </div>

            <div style={{ ...sectionStyle, backgroundImage: `url(${loginBackground})` }}>
                <h2>Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginCredentials.email}
                    onChange={handleLoginChange}
                    style={inputStyle}
                />
                <div style={passwordContainerStyle}>
                    <input
                        type={isPasswordMasked ? 'password' : 'text'}
                        name="password"
                        placeholder="Password"
                        value={loginCredentials.password}
                        onChange={handleLoginChange}
                        style={passwordInputStyle}
                    />
                    <button onClick={togglePasswordMask} style={toggleButtonStyle}>
                        {isPasswordMasked ? 'Show' : 'Hide'}
                    </button>
                </div>
                <button onClick={handleLoginSubmit} style={buttonStyle}>Login</button>
            </div>
        </div>
    );
};

const containerStyle: React.CSSProperties = {
    display: 'flex',
    height: '100vh',
    width: '100%',
};

const sectionStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderRight: '1px solid #ccc',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

const inputStyle: React.CSSProperties = {
    width: '80%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
};

const passwordContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '83%',
    margin: '10px 0',
};

const passwordInputStyle: React.CSSProperties = {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
};

const toggleButtonStyle: React.CSSProperties = {
    marginLeft: '10px',
    padding: '10px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#ddd',
    border: 'none',
    borderRadius: '5px',
};

const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginTop: '10px',
};

export default Onboarding;