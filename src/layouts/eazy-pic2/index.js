import React, { useEffect, useState } from "react";
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
import { useArgonController, setCharacterFileName, setCharacterNoBackGroundLink } from 'context';
import { primitives } from "@tauri-apps/api";

import { motion, AnimatePresence } from "framer-motion"

function PhotoSelector() {

  const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
  const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

  const navigate = useNavigate();
  const [controller, dispatch] = useArgonController();
  const { characterLink } = controller;
  const { characterNoBackGroundLink } = controller;
  const { characterFileName } = controller;

  const [currentImage, setCurrentImage] = useState(characterNoBackGroundLink ? characterNoBackGroundLink : characterLink);

  const updatecharacterNoBackGroundLink = (newLink) => {
    setCharacterNoBackGroundLink(dispatch, newLink);
  };

  const updateCharacterFileName = (newLink) => {
    setCharacterFileName(dispatch, newLink);
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  console.log("this is global characterLink", characterLink);
  // Handle the photo selection logic here
  const handleSelectPhoto = (photo) => {
    console.log("Selected photo:", photo);
  };

  const fetchData = async () => {
    try {
      const response = await primitives.invoke("get_character", {
        fileName: characterFileName
      });
      updatecharacterNoBackGroundLink(response.link);
      setCurrentImage(response.link);
      updateCharacterFileName(response.fileName);
      console.log("Response from get_character:", response.link);
    } catch (e) {
      console.error("Error in get_character:", e);
    }
  };

  useEffect(() => {
    console.log('Fetching image');
    fetchData();
    // // Set a timer for 5 seconds
    // const timer = setTimeout(() => {
    //   console.log('Switching image');

    // }, 10000);
    // // Call the async function inside useEffect

    // // Cleanup function
    // return () => clearTimeout(timer);
  }, []);



  function handleRouteToCanvas() {
    console.log("re-route to canvas");
    navigate('/eazy-canvas'); // Navigate routes
  }


  return (
    <ArgonBox sx={{ padding: "16px", textAlign: "center" }}>
      <ArgonTypography variant="subtitle1" gutterBottom
      >
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
        
        <motion.div
          initial={{ WebkitMaskImage: hiddenMask, maskImage: hiddenMask }}
          key={currentImage}
          animate={
            isLoaded && isInView
              ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
              : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
          }
          transition={{ duration: 2, delay: 0 }}
          viewport={{ once: false }}
          onViewportEnter={() => setIsInView(true)}
        >
          <Card
            style={{
              width: "500px",
              height: "500px",
              // backgroundImage: `url(${characterLink})`, // Set the background image
              //backgroundSize: "cover", // Ensure the background covers the Card
              position: "relative", // Needed for proper positioning of the ArgonBox
              overflow: "hidden", // To clip the overflow
            }}
          >
            <ArgonBox
              display="flex"
              alignItems="center"
              component="img"
              src={currentImage}
              onLoad={() => setIsLoaded(true)}
            />
          </Card>
        </motion.div>

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
