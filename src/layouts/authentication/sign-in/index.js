/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useContext,useState } from 'react';


// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

//Context
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function Illustration() {
  const { login,logout } = useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleEmailChange = (event) => {
    console.log('', event.target.value)
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    console.log('', event.target.value)
    setPassword(event.target.value);
  };

  async function handleLogin() {
    try {
      let credentials = {
        email: email,
        password: password
      };
      // Assuming login is an async function that returns a promise
      const loginResponse = await login(credentials);
      // Handle the response from the login operation
      // For example, redirecting the user, updating the UI, etc.
      console.log("Login successful", loginResponse);

      navigate('/dashboard'); // Navigate routes
      // Additional logic after successful login
      // ...
    } catch (error) {
      // Handle any errors that occurred during login
      console.error("Login failed", error);
      // Possible UI update to inform the user about the login failure
    }
  }

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput
           value={email}
           onChange={handleEmailChange}
           type="email" placeholder="Email" size="large" />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput 
             value={password}
             onChange={handlePasswordChange}
          type="password" placeholder="Password" size="large" />
        </ArgonBox>
        <ArgonBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <ArgonTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton color="info" size="large" fullWidth onClick={handleLogin}>
            Sign In
          </ArgonButton>
        </ArgonBox>
        <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <ArgonTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Sign up
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
