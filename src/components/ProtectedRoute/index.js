import React from 'react';
import { Navigate } from 'react-router-dom';
import { useArgonController } from 'context';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element }) => {
    const [controller] = useArgonController();
    const { isLogin } = controller;

    return isLogin ? element : <Navigate to="/authentication/sign-in" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired
};

export default ProtectedRoute;
