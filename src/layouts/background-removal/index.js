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
import exampleImage from "./example.png";
import backGround from "./background.png";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import ArgonButton from "components/ArgonButton";
import Grid from "@mui/material/Grid";

import { primitives } from "@tauri-apps/api";

function Tables() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  function handleLayersClick() {
    // Assuming primitives.invoke is a function that returns a promise
    primitives
      .invoke("greet", { name: "Van Jiro" })
      .then((response) => {
        console.log("Invoke fn from Rust BE:", response);
        // Additional logic to handle the response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Additional logic to handle the error
      });
  }

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });

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
              src={exampleImage}
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
                  <ArgonButton onClick={handleLayersClick} variant="gradient" fullWidth>
                    <Icon>layers_sharp</Icon>
                    &nbsp;Layers
                  </ArgonButton>
                </Grid>
                <Grid item xs={4}>
                  <ArgonButton variant="gradient" fullWidth>
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
                  <ArgonButton variant="gradient" fullWidth>
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
