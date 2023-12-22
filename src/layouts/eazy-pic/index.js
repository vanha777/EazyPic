import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
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
import AnimatedRoute from "components/AnimatedRoute";

import { useArgonController, setCharacterLink, setCharacterFileName } from 'context';
// import { primitives } from "@tauri-apps/api";
import { invoke } from '@tauri-apps/api/core'

function PhotoSelector() {
  const [controller, dispatch] = useArgonController();

  const updateCharacterLink = (newLink) => {
    setCharacterLink(dispatch, newLink);
  };

  const updateCharacterFileName = (newLink) => {
    setCharacterFileName(dispatch, newLink);
  };


  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  // Handle the photo selection logic here
  const handleUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      console.log("this is your files:", file);
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const bytes = new Uint8Array(arrayBuffer);
        try {
          const response = await invoke("upload_file", {
            fileBytes: Array.from(bytes),
            token: "123",
          });
          updateCharacterLink(response.link);
          updateCharacterFileName(response.file_name)
          handleRouteToCanvas();
          console.log("Response from upload_file:", response);
        } catch (e) {
          console.error("Error sending file to backend:", e);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  function handleRouteToCanvas() {
    console.log("re-route to canvas");
    navigate("/eazy-pic2"); // Replace '/canvas' with the path you want to navigate to
  }

  return (
    <AnimatedRoute>
    <ArgonBox sx={{ padding: "16px", textAlign: "center" }}>
      <ArgonTypography variant="h4" gutterBottom>
        Start from a photo
      </ArgonTypography>
      <ArgonTypography variant="subtitle1" gutterBottom>
        Magically remove the background from one of your pictures.
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
            backgroundImage: `url(${exampleImage})`, // Set the background image
            backgroundSize: "cover", // Ensure the background covers the Card
            position: "relative", // Needed for proper positioning of the ArgonBox
            overflow: "hidden", // To clip the overflow
          }}
        >
          {/*} <ArgonBox display="flex" alignItems="center" component="img" src={exampleImage} />*/}
        </Card>
      </ArgonBox>

      <ArgonBox mb={3}>
        <Stack direction="column" spacing={2} alignItems="center">
          <ArgonButton
            component="label"
            // onClick={handleUpload}
            //loading={loading.theme}
            variant="gradient"
            fullWidth
          >
            <Icon>wallpaper_sharp</Icon>
            &nbsp;Upload Photo
            {/*<VisuallyHiddenInput type="file"  onChange={handleUploadPhoto}/>*/}
            <input
              type="file"
              accept="image/*" // Specify accepted file types (e.g., images)
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </ArgonButton>

          <ArgonButton onClick={handleRouteToCanvas} variant="gradient" fullWidth>
            &nbsp;Skip
          </ArgonButton>
        </Stack>
      </ArgonBox>
    </ArgonBox>
    </AnimatedRoute>
  );
}

export default PhotoSelector;
