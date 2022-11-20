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

import Select from "@mui/material/Select";
import DatePicker from "react-datepicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CDatePicker } from '@coreui/react-pro'

import "react-datepicker/dist/react-datepicker.css";

const UserDashboard = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      user_email: data.get("user_email"),
      user_password: data.get("user_password"),
    });
  };

  const [user, addUser] = useState({
    user_email: "",
    user_name: "",
    user_phone_no: null,
    user_gender: "",
    user_address: "",
    user_password: "",
  });

  const handleChange = (e) => {
    addUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const [age, setAge] = React.useState("");

  const [value, setValue] = React.useState(null);
  const handleChange1 = (event) => {
    setAge(event.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8801/users", user);
      // navigate("/admindashboard")
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user);

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
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="user_name"
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
                        name="user_email"
                        autoComplete="email"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="user_phone_no"
                        label="Phone Number"
                        type="number"
                        id="phno"
                        autoComplete="Phno"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Blood Group
                        </InputLabel>
                        <Select
                          labelId="demo-simple-autowidth-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Age"
                          onChange={handleChange1}
                        >
                          <MenuItem value={"O+"}>O+ve</MenuItem>
                          <MenuItem value={"O-"}>O-ve</MenuItem>
                          <MenuItem value={"A+"}>A+ve</MenuItem>
                          <MenuItem value={"A-"}>A-ve</MenuItem>
                          <MenuItem value={"B+"}>B+ve</MenuItem>
                          <MenuItem value={"B-"}>B-ve</MenuItem>
                          <MenuItem value={"AB+"}>AB+ve</MenuItem>
                          <MenuItem value={"AB-"}>AB-ve</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        required
                        fullWidth
                        name="age"
                        label="Age"
                        type="number"
                        id="age"
                        autoComplete="age"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Camp Location
                        </InputLabel>
                        <Select
                          labelId="demo-simple-autowidth-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Age"
                          onChange={handleChange1}
                        >
                          <MenuItem value={"Location 1"}>Location 1</MenuItem>
                          <MenuItem value={"Location 2"}>Location 2</MenuItem>
                          <MenuItem value={"Location 3"}>Location 3</MenuItem>
                        </Select>
                      </FormControl>
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
                            name="diabetic"
                            onChange={handleChange}
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="N"
                            name="diabetic"
                            onChange={handleChange}
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <CDatePicker locale="en-US" size="50px" />
                    </Grid>
<Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Time Slot
                        </InputLabel>
                        <Select
                          labelId="demo-simple-autowidth-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Age"
                          onChange={handleChange1}
                        >
                          <MenuItem value={"Time 1"}>Time 1</MenuItem>
                          <MenuItem value={"Time 2"}>Time 2</MenuItem>
                          <MenuItem value={"Time 3"}>Time 3</MenuItem>
                        </Select>
                      </FormControl>
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
