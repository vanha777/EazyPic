import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import exampleImage from "./example.png";
import { Grid, Paper, Button, Typography } from "@mui/material";
import ArgonBox from "components/ArgonBox"; // Ensure you have this component available
import ArgonButton from "components/ArgonButton";
import ArgonTypography from "components/ArgonTypography";

function PhotoSelector() {
  const navigate = useNavigate();
  // Handle the photo selection logic here
  const handleSelectPhoto = (photo) => {
    console.log("Selected photo:", photo);
  };

  function handleRouteToCanvas() {
    console.log("re-route to canvas");
    navigate('/background-removal'); // Replace '/canvas' with the path you want to navigate to
  }

  return (
    <ArgonBox sx={{ padding: "16px", textAlign: "center" }}>

      <ArgonBox
        mb={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ width: "100%" }}
      >
        <Card
          style={{
            width: "500px",
            height: "500px",
           // backgroundImage: `url(${exampleImage})`, // Set the background image
            backgroundSize: "cover", // Ensure the background covers the Card
            position: "relative", // Needed for proper positioning of the ArgonBox
            overflow: "hidden", // To clip the overflow
          }}
        >
             <ArgonTypography variant="h4" gutterBottom>
        Created a scene
      </ArgonTypography>
          {/*} <ArgonBox display="flex" alignItems="center" component="img" src={exampleImage} />*/}
        </Card>
      </ArgonBox>

      <ArgonBox mb={3}>

          <ArgonButton
            onClick={handleRouteToCanvas}
            //loading={loading.theme}
            variant="gradient"
            fullWidth
          >
            <Icon>wallpaper_sharp</Icon>
            &nbsp;Start Creating
          </ArgonButton>

    
      </ArgonBox>
    </ArgonBox>
  );
}

export default PhotoSelector;
