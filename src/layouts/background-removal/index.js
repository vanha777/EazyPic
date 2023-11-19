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
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import ArgonButton from "components/ArgonButton";
import Grid from "@mui/material/Grid";

function Tables() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <ArgonBox py={3}>
        {/* Container for the image */}
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox
              display="flex"
              alignItems="center"
              component="img"
              src={exampleImage}
              alt="Editable Image"
              //sx={{ width: "auto", height: "auto", marginBottom: "16px" }}
            />
          </Card>
        </ArgonBox>

        <ArgonBox mb={3}>
          <ArgonBox>
            {/*
              <Stack direction="row" spacing={8} justifyContent="center">
                <ArgonBox my={{ xs: 0, md: 2 }} mx={{ xs: 2, md: 0 }}>
                  <Tooltip title="Home" placement="right">
                    <ArgonButton
                      size="large"
                      iconOnly
                      variant="gradient"
                      sx={({ palette: { dark }, borders: { borderRadius } }) => ({
                        color: dark.main,
                        borderRadius: borderRadius.lg,
                      })}
                    >
                      <Icon>home</Icon>
                    </ArgonButton>
                  </Tooltip>
                </ArgonBox>
                <ArgonBox mb={{ xs: 0, md: 2 }} mr={{ xs: 2, md: 0 }}>
                  <Tooltip title="Search" placement="right">
                    <ArgonButton
                      size="large"
                      variant="gradient"
                      iconOnly
                      sx={({ palette: { dark }, borders: { borderRadius } }) => ({
                        color: dark.main,
                        borderRadius: borderRadius.lg,
                      })}
                    >
                      <Icon>search</Icon>
                    </ArgonButton>
                  </Tooltip>
                </ArgonBox>
                <ArgonBox mb={{ xs: 0, md: 2 }} mr={{ xs: 2, md: 0 }}>
                  <Tooltip title="Search" placement="right">
                    <ArgonButton
                      size="large"
                      variant="gradient"
                      iconOnly
                      sx={({ palette: { dark }, borders: { borderRadius } }) => ({
                        color: dark.main,
                        borderRadius: borderRadius.lg,
                      })}
                    >
                      <Icon>more_horiz</Icon>
                    </ArgonButton>
                  </Tooltip>
                </ArgonBox>
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                <ArgonBox my={{ xs: 0, md: 2 }} mx={{ xs: 2, md: 0 }}>
                  <ArgonButton
                    size="large"
                    variant="gradient"
                    //iconOnly
                    sx={({ palette: { dark }, borders: { borderRadius } }) => ({
                      minWidth: "100px",
                      maxWidth: "150px",
                      color: dark.main,
                      borderRadius: borderRadius.lg,
                    })}
                  >
                    <Icon>home</Icon>
                    &nbsp;Layers
                  </ArgonButton>
                </ArgonBox>
                <ArgonBox mb={{ xs: 0, md: 2 }} mr={{ xs: 2, md: 0 }}>
                  <Tooltip title="Search" placement="right">
                    <ArgonButton
                      size="large"
                      variant="gradient"
                      //iconOnly
                      sx={({ palette: { dark }, borders: { borderRadius } }) => ({
                        color: dark.main,
                        borderRadius: borderRadius.lg,
                        minWidth: "100px",
                        maxWidth: "150px",
                      })}
                    >
                      <Icon>search</Icon>
                      &nbsp;Layers
                    </ArgonButton>
                  </Tooltip>
                </ArgonBox>
                <ArgonBox
                  sx={{ maxWidth: "100%", overflow: "auto" }}
                  mb={{ xs: 0, md: 2 }}
                  mr={{ xs: 2, md: 0 }}
                >
                  <Tooltip title="Search" placement="right">
                    <ArgonButton
                      size="large"
                      variant="gradient"
                      // iconOnly
                      sx={({ palette: { dark }, borders: { borderRadius } }) => ({
                        color: dark.main,
                        borderRadius: borderRadius.lg,
                        minWidth: "100px",
                        maxWidth: "150px",
                      })}
                    >
                      <Icon>more_horiz</Icon>
                      &nbsp;Layers
                    </ArgonButton>
                  </Tooltip>
                </ArgonBox>
              </Stack>
              */}
            <Grid container justifyContent="center" spacing={2}>
              {/* First Row */}
              <Grid item xs={12} container spacing={2} justifyContent="space-between">
                <Grid item xs={4}>
                  <ArgonButton variant="gradient" fullWidth>
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
