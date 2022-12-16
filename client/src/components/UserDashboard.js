import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Footer from "./Footer";
import Header from "./Header";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { Paper } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Form from 'react-bootstrap/Form';
import Select from "@mui/material/Select";
import DatePicker from "react-datepicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CDatePicker } from '@coreui/react-pro'

import "react-datepicker/dist/react-datepicker.css";

const UserDashboard = () => {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     user_email: data.get("user_email"),
  //     user_password: data.get("user_password"),
  //   });
  // };

  const [appointment, addAppointment] = useState({
    app_email: "",
    app_name: "",
    app_phone_no: null,
    app_age: null,
    app_diabetic: "",
    app_donated:"N",
    app_camp_address:"",
    app_date:"new Date()",
    app_time:null,
    app_blood_type:"",
  });

  const handleChange = (e) => {
    addAppointment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  
  };
  
  const navigate = useNavigate();


  // const [value, setValue] = React.useState(null);
  // const handleChange1 = (e1) => {
  //   setBloodGroup((prev) => ({ ...prev, [e1.target.value]: e1.target.value }));
  //   setCampAddress((prev) => ({ ...prev, [e1.target.innerText]: e1.target.innerText }));
  //   setTime((prev) => ({ ...prev, [e1.target.innerText]: e1.target.innerText }));
  // };

  const handleClick = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8801/bookappnts", appointment);
      navigate("/userlogin")
      // navigate("/admindashboard")
    } catch (err) {
      console.log(err);
    }
  };

  console.log(appointment);

  

  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
  if (!authenticated) {
    // Redirect
    navigate("/userlogin");
  } else {
    return (
      <>
        <Header />
        <Container
          component="main"
          maxWidth="sm"
          style={{ marginBottom: "100px" }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={10}
            square
            style={{
              marginTop: "10px",
              borderRadius: "10px",
              height: "750px",
              maxWidth: "600px",
              marginBottom: "0px",
            }}
          >
            <Box
              sx={{
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                font: " 25px Montserrat, sans-serif",
              }}
            >
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Book Your Donation Appointment
                </Typography>
                <Box
                  component="form"
                  noValidate
                
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="app_name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="app_email"
                        autoComplete="email"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="app_phone_no"
                        label="Phone Number"
                        type="number"
                        id="phno"
                        autoComplete="Phno"
                        onChange={handleChange}
                      />
                    </Grid>
                    
                    <Grid item xs={4}>
                      <TextField
                        required
                        fullWidth
                        name="app_age"
                        label="Age"
                        type="number"
                        id="age"
                        autoComplete="age"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={4}>
                    <TextField
                        required
                        fullWidth
                        name="app_blood_type"
                        label="Blood Group"
                        type="text"
                        id="blood_group"
                        autoComplete="blood_group"
                        onChange={handleChange}
                      />
                    </Grid>

                    

                    <Grid item xs={4}>
                    <TextField
                        required
                        fullWidth
                        name="app_camp_address"
                        label="Camp Location"
                        type="text"
                        id="blood_group"
                        autoComplete="blood_group"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Are you Diabetic?
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="Y"
                            name="app_diabetic"
                            onChange={handleChange}
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="N"
                            name="app_diabetic"
                            onChange={handleChange}
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Appointment Date"
                        name="app_date"
                        autoComplete="email"
                        onChange={handleChange}
                      />
                    </Grid>

                  <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        name="app_time"
                        label="Time Slot (10:00/2:00/5:00)"
                        type="text"
                        id="blood_group"
                        autoComplete="blood_group"
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleClick}
                  >
                    Book Appointment
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Container>
        <Footer />
      </>
    );
  }
};
export default UserDashboard;
