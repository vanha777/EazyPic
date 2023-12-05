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
import { useArgonController, setCharacterFileName,setCharacterNoBackGroundLink } from 'context';

function PhotoSelector() {

  const navigate = useNavigate();
  const [controller, dispatch] = useArgonController();
  const { characterLink } = controller;
  const { characterNoBackGroundLink } = controller;
  const { characterFileName } = controller;

  const updatecharacterNoBackGroundLink = (newLink) => {
    setCharacterNoBackGroundLink(dispatch, newLink);
  };

  const updateCharacterFileName = (newLink) => {
    setCharacterFileName(dispatch, newLink);
  };


  console.log("this is global characterLink", characterLink);
  // Handle the photo selection logic here
  const handleSelectPhoto = (photo) => {
    console.log("Selected photo:", photo);
  };

  useEffect(async () => {
    // Set a timer for 2 seconds
    const timer = setTimeout(() => {
      console.log('2 seconds');
      // Place the logic you want to execute after 2 seconds here
    }, 2000); // 2000 milliseconds = 2 seconds
    try {
      const response = await primitives.invoke("get_character", {
        file_name: characterFileName
      });
      updatecharacterNoBackGroundLink(response.link)
      updateCharacterFileName(response.file_name)
      //handleRouteToCanvas();
      console.log("Response from upload_file:", response);
    } catch (e) {
      console.error("Error sending file to backend:", e);
    }
    // Cleanup function to clear the timer if the component unmounts early
    return () => clearTimeout(timer);
  }, []);

  function handleRouteToCanvas() {
    console.log("re-route to canvas");
    navigate('/eazy-description'); // Navigate routes
  }


  return (
    <ArgonBox sx={{ padding: "16px", textAlign: "center" }}>
      <ArgonTypography variant="subtitle1" gutterBottom>
        Just like that.
      </ArgonTypography>
      <ArgonTypography variant="h4" gutterBottom>
        Background Removed!
      </ArgonTypography>

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
            // backgroundImage: `url(${characterLink})`, // Set the background image
            backgroundSize: "cover", // Ensure the background covers the Card
            position: "relative", // Needed for proper positioning of the ArgonBox
            overflow: "hidden", // To clip the overflow
          }}
        >
           <ArgonBox
            display="flex"
            alignItems="center"
            component="img"
            src={characterNoBackGroundLink ? characterNoBackGroundLink : characterLink}
        />
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