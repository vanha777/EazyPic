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
import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import AnimatedRoute from "components/AnimatedRoute";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import ArgonButton from "components/ArgonButton";
import Grid from "@mui/material/Grid";
import { useArgonController, setBackgroundLink } from 'context';
import ArgonInput from "components/ArgonInput";

// import { primitives } from "@tauri-apps/api";
import { invoke } from '@tauri-apps/api/core'

import example from "layouts/eazy-canvas/example.png";
import { writeFile, BaseDirectory } from '@tauri-apps/plugin-fs'
import { save, message } from '@tauri-apps/plugin-dialog'

function Tables() {
  const [backgroundDescription, setBackgroundDescription] = React.useState('');

  const [controller, dispatch] = useArgonController();
  const { backgroundLink } = controller;
  const { characterNoBackGroundLink } = controller;

  const updateBackgroundLink = (newLink) => {
    setBackgroundLink(dispatch, newLink);
  };

  const handleInputChange = (event) => {
    console.log('', event.target.value)
    setBackgroundDescription(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await invoke("background_generate", {
        input: backgroundDescription
      });
      let image = `data:image/jpeg;base64,${response.link}`;
      setBackGround(image);
      updateBackgroundLink(image);
      console.log("Response from background_generator:", response.status);
    } catch (e) {
      console.error("Error in background_generate:", e);
    }
  };


  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });

  const [backGround, setBackGround] = useState(backgroundLink);
  const [characters, setCharacters] = useState(characterNoBackGroundLink);
  const [loading, setLoading] = useState({
    inserts: false,
    theme: false,
    characters: false,
    // ... other buttons
  });

  // An array of images
  const exampleCharacters = [characterNoBackGroundLink];
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
    invoke("greet", { name: "Van Jiro" })
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

  async function handleBackgroundGenerator() {
    // Store the current input value in a temporary variable
    const currentInput = backgroundDescription;
    // Reset the backgroundDescription immediately when sending starts
    setBackgroundDescription('');
    try {
      console.log("Generating background");
      setLoading({ ...loading, theme: true });

      const response = await invoke("background_generate", {
        input: currentInput
      });

      let image = `data:image/jpeg;base64,${response.link}`;
      setBackGround(image);
      updateBackgroundLink(image);

      console.log("Response from background_generator:", response.status);
    } catch (e) {
      console.error("Error in background_generate:", e);
    } finally {
      // Reset the loading state here if necessary
      setLoading({ ...loading, theme: false });
    }
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

  const canvasRef = useRef(null);

  const drawOnCanvas = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const background = new Image();
    const character = new Image();

    let scaledWidth = null;
    let scaledHeight = null;

    const loadBackground = new Promise((resolve, reject) => {
      background.onload = () => resolve();
      background.onerror = reject;
      background.src = backGround;
    });

    const loadCharacter = new Promise((resolve, reject) => {
      character.onload = () => {
        scaledWidth = character.naturalWidth * scale;
        scaledHeight = character.naturalHeight * scale;
        resolve()
      };
      character.onerror = reject;
      character.crossOrigin = "anonymous";
      character.src = characters;
    });
    console.log("this is position of character , ", position);

    await Promise.all([loadBackground, loadCharacter]).then(() => {
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(character, position.x, position.y, scaledWidth, scaledHeight);
    }).catch(error => {
      console.error('Error loading images:', error);
    });
  };

  const downloadImage = async () => {
    await drawOnCanvas();
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');

    fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const arrayBuffer = e.target.result;
          const bytes = new Uint8Array(arrayBuffer);

          try {
            const path = await save({
              filters: [{
                name: 'Image',
                extensions: ['png', 'jpeg']
              }]
            });
            console.log(" this is path , ", path);
            await writeFile(path, bytes, { dir: BaseDirectory.App }).then(await message('Successfull Download Images', 'Tauri'));
          } catch (e) {
            console.error("Error saving file:", e);
            await message('File not found', { title: 'Tauri', type: 'error' });
          }
        };
        reader.readAsArrayBuffer(blob);
      });
  };

  return (
    <AnimatedRoute>
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
              <img
                display="flex"
                // alignItems="center"
                // component="img"
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
          {/* Container for the image end. */}
          <canvas ref={canvasRef} width="500" height="500" style={{ display: 'none' }} />

          <ArgonBox mb={3}>
            <ArgonBox>
              <Grid container justifyContent="center" spacing={2}>

                {/* First Row */}
                <Grid item xs={12} container spacing={2} justifyContent="space-between">
                  <Grid item xs={12}>
                    <ArgonInput
                      fullWidth
                      multiline
                      // rows={1} // Adjust the number of rows as needed
                      value={backgroundDescription}
                      onChange={handleInputChange}
                      placeholder="Describe your background..."
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          // Prevent the default action to avoid submitting the form
                          event.preventDefault();
                          handleBackgroundGenerator();
                        }
                      }}
                      startAdornment={
                        <Icon fontSize="small" style={{ marginRight: "6px" }}>
                          search
                        </Icon>
                      }
                      endAdornment={
                        <ArgonButton
                          onClick={handleBackgroundGenerator}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              handleBackgroundGenerator();
                            }
                          }}
                          loading={loading.theme}
                          variant="gradient"
                          style={{ marginRight: "-12px" }} // Adjust as needed to align the button
                          tabIndex="0" // Ensure the button is focusable
                        >
                          <Icon>layers_sharp</Icon>
                        </ArgonButton>

                      }
                    />
                  </Grid>
                </Grid>
                {/* Seconds Row */}
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

                {/* Third Row */}
                <Grid item xs={12} container spacing={2} justifyContent="space-between">
                  <Grid item xs={4}>
                    <ArgonButton
                      // onClick={handleBackgroundGenerator}
                      // loading={loading.theme}
                      variant="gradient"
                      fullWidth
                    >
                      <Icon>wallpaper_sharp</Icon>
                      &nbsp;Theme
                    </ArgonButton>
                  </Grid>
                  <Grid item xs={4}>
                    <ArgonButton onClick={downloadImage} variant="gradient" fullWidth>
                      <Icon>co_present_sharp</Icon>
                      &nbsp;Download
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
    </AnimatedRoute>
  );
}

export default Tables;
