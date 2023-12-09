import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useArgonController, setAccessToken, setIsLogin } from 'context';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [controller, dispatch] = useArgonController();
    const { accessToken, isLogin } = controller;
    const updateAccessToken = (newLink) => {
        setAccessToken(dispatch, newLink);
    };
    const updateIsLogin = (newLink) => {
        setIsLogin(dispatch, newLink);
    };

    const login = (credentials) => {
        // Implement login logic
        console.log("log in : ", credentials);
        updateAccessToken("123");
        updateIsLogin(true)
    };

    const logout = () => {
        // Implement logout logic
        updateAccessToken(null);
        updateIsLogin(false)
    };

    return (
        <AuthContext.Provider value={{ accessToken, isLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
