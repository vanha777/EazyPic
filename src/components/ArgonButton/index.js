/**
=========================================================
* Argon Dashboard 2 MUI - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for ArgonButton
import ArgonButtonRoot from "components/ArgonButton/ArgonButtonRoot";
// #Material Mui
import CircularProgress from '@mui/material/CircularProgress';

const ArgonButton = forwardRef(
  ({ color, variant, size, circular, iconOnly, loading, children, ...rest }, ref) => (
    <ArgonButtonRoot
      {...rest}
      ref={ref}
      variant={variant === "gradient" ? "contained" : variant}
      size={size}
      disabled={loading} // Disable button when loading
      ownerState={{ color, variant, size, circular, iconOnly }}
    >
      {loading ? <CircularProgress size={24} /> : children}
    </ArgonButtonRoot>
  )
);

ArgonButton.defaultProps = {
  size: "medium",
  variant: "contained",
  color: "white",
  circular: false,
  iconOnly: false,
  loading: false, // Default loading state is false
};

ArgonButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  loading: PropTypes.bool, // Add propType for loading
  children: PropTypes.node.isRequired,
};

export default ArgonButton;
