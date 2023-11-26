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

// @mui material components
import React, { useState } from "react";
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

import exampleImage1 from "./example/example1.png";
import exampleImage2 from "./example/example2.png";
import exampleImage3 from "./example/example3.png";
import exampleImage4 from "./example/example4.png";

import DefaultBackGround from "./background.png";
import DefaultComponent from "./defaultcomponent.png";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import ArgonButton from "components/ArgonButton";
import Grid from "@mui/material/Grid";

import { primitives } from "@tauri-apps/api";

function Tables() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });

  const [backGround, setBackGround] = useState(DefaultBackGround);
  const [characters, setCharacters] = useState(DefaultComponent);
  const [loading, setLoading] = useState({
    inserts: false,
    theme: false,
    characters: false,
    // ... other buttons
  });

  // An array of images
  const exampleCharacters = [exampleImage1, exampleImage2, exampleImage3,exampleImage4];
  //this is test only
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleCharactersGenerator() {
    setLoading({ ...loading, characters: true });
    console.log("generating characters");
    setTimeout(() => {
      setLoading({ ...loading, characters: false });
      setCurrentIndex((prevIndex) => (prevIndex + 1) % exampleCharacters.length);
      setCharacters(exampleCharacters[currentIndex]);
    }, 2000);
  }

  // testing function
  function handleLayersClick() {
    setLoading({ ...loading, inserts: true });
    primitives
      .invoke("greet", { name: "Van Jiro" })
      .then((response) => {
        console.log("Invoke fn from Rust BE:", response);
        setTimeout(() => {
          setLoading({ ...loading, inserts: false });
        }, 2000);
        // Additional logic to handle the response
      })
      .catch((error) => {
        setLoading({ ...loading, inserts: false });
        console.error("Error:", error);
        // Additional logic to handle the error
      });
  }

  function handleBackgroundGenerator() {
    console.log("generating background");
    setLoading({ ...loading, theme: true });
    primitives
      .invoke("background_generate")
      .then((response) => {
        let image = `data:image/jpeg;base64,${response}`;
        setBackGround(image);
        setLoading({ ...loading, theme: false });
        // Additional logic to handle the response
      })
      .catch((error) => {
        setLoading({ ...loading, theme: false });
        console.error("Error:", error);
        // Additional logic to handle the error
      });
  }

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartDragPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - startDragPosition.x;
      const newY = e.clientY - startDragPosition.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    setScale((prevScale) => prevScale + e.deltaY * -0.01);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartDragPosition({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      const newX = touch.clientX - startDragPosition.x;
      const newY = touch.clientY - startDragPosition.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <ArgonBox py={3}>
        {/* Container for the image */}
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
              backgroundImage: `url(${backGround})`, // Set the background image
              backgroundSize: "cover", // Ensure the background covers the Card
              position: "relative", // Needed for proper positioning of the ArgonBox
              overflow: "hidden", // To clip the overflow
            }}
          >
            <ArgonBox
              display="flex"
              alignItems="center"
              component="img"
              src={characters}
              alt="Editable Image"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor: isDragging ? "grabbing" : "grab",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </Card>
        </ArgonBox>

        <ArgonBox mb={3}>
          <ArgonBox>
            <Grid container justifyContent="center" spacing={2}>
              {/* First Row */}
              <Grid item xs={12} container spacing={2} justifyContent="space-between">
                <Grid item xs={4}>
                  <ArgonButton
                    onClick={handleCharactersGenerator}
                    loading={loading.characters}
                    variant="gradient"
                    fullWidth
                  >
                    <Icon>layers_sharp</Icon>
                    &nbsp;characters
                  </ArgonButton>
                </Grid>
                <Grid item xs={4}>
                  <ArgonButton
                    onClick={handleLayersClick}
                    loading={loading.inserts}
                    variant="gradient"
                    fullWidth
                  >
                    <Icon>add_circle_outline_sharp</Icon>
                    &nbsp;Inserts
                  </ArgonButton>
                </Grid>
                <Grid item xs={4}>
                  <ArgonButton variant="gradient" fullWidth>
                    <Icon>font_download_sharp</Icon>
                    &nbsp;Text
                  </ArgonButton>
                </Grid>
              </Grid>

              {/* Second Row */}
              <Grid item xs={12} container spacing={2} justifyContent="space-between">
                <Grid item xs={4}>
                  <ArgonButton
                    onClick={handleBackgroundGenerator}
                    loading={loading.theme}
                    variant="gradient"
                    fullWidth
                  >
                    <Icon>wallpaper_sharp</Icon>
                    &nbsp;Theme
                  </ArgonButton>
                </Grid>
                <Grid item xs={4}>
                  <ArgonButton variant="gradient" fullWidth>
                    <Icon>co_present_sharp</Icon>
                    &nbsp;Shadows
                  </ArgonButton>
                </Grid>
                <Grid item xs={4}>
                  <ArgonButton variant="gradient" fullWidth>
                    <Icon>height_sharp</Icon>
                    &nbsp;Resize
                  </ArgonButton>
                </Grid>
              </Grid>
            </Grid>
          </ArgonBox>
        </ArgonBox>
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
