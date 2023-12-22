import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import exampleImage from "./example.png";
import { Grid, Paper, Button, Typography } from "@mui/material";
import ArgonBox from "components/ArgonBox"; // Ensure you have this component available
import ArgonButton from "components/ArgonButton";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
// import { primitives } from "@tauri-apps/api";
import { invoke } from '@tauri-apps/api/core'
import { useArgonController, setBackgroundLink } from 'context';
import AnimatedRoute from "components/AnimatedRoute";

function PhotoSelector() {

  const [controller, dispatch] = useArgonController();
  const { backgroundLink } = controller;
  const updateBackgroundLink = (newLink) => {
    setBackgroundLink(dispatch, newLink);
  };

  const navigate = useNavigate();
  // Assuming you have a state to handle the input value
  const [backgroundDescription, setBackgroundDescription] = React.useState('');

  const handleInputChange = (event) => {
    console.log('', event.target.value)
    setBackgroundDescription(event.target.value);

  };
  // Handle the photo selection logic here
  const handleSelectPhoto = (photo) => {
    console.log("Selected photo:", photo);
  };

  const fetchData = async () => {
    try {
      const response = await invoke("background_generate", {
        input: backgroundDescription
      });
      let image = `data:image/jpeg;base64,${response.link}`;
      updateBackgroundLink(image);
      console.log("Response from background_generator:", response.status);
    } catch (e) {
      console.error("Error in background_generate:", e);
    }
  };

const handleRouteToCanvas = async () => {
    console.log("re-route to canvas");
   await fetchData();
    navigate('/eazy-canvas'); // Replace '/canvas' with the path you want to navigate to
  }

  return (
    <AnimatedRoute>
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
            //backgroundImage: `url(${characterLink})`, // Set the background image
            backgroundSize: "cover", // Ensure the background covers the Card
            position: "relative", // Needed for proper positioning of the ArgonBox
            overflow: "hidden", // To clip the overflow
          }}
        >
          <ArgonTypography variant="h4" gutterBottom>
            Created a scene
          </ArgonTypography>
          <ArgonTypography variant="h4" gutterBottom>
            Describe your background !
          </ArgonTypography>
          {/*} <ArgonBox display="flex" alignItems="center" component="img" src={characterLink} />*/}
          <ArgonBox pr={1}>
            <ArgonInput
              value={backgroundDescription}
              onChange={handleInputChange}
              placeholder="Type here..."
              startAdornment={
                <Icon fontSize="small" style={{ marginRight: "6px" }}>
                  search
                </Icon>
              }
            />
          </ArgonBox>
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
    </AnimatedRoute>
  );
}

export default PhotoSelector;
