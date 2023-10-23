import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import Footer from './Footer';
import Header from './Header';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css"


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         BloodX
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const theme = createTheme();

function UserLogin() {
  // const login1 = () =>{
  //   Axios.post("https://localhost:8801/userlogin",{
  //     user_email: user_email,
  //     user_password: user_password,
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };
  const [loading, setLoading] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();


  const handleSendOtp = async (e) => {
    e.preventDefault();
    const regexExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!user_email) {
      setWarningText("Please enter email address !!");
      setTimeout(() => {
        setWarningText("");
      }, 2000);
      return;
    }
    else if (!regexExp.test(user_email)) { 
      setWarningText("Please enter valid email address !!");
      setTimeout(() => {
        setWarningText("");
      }, 2000);
      return;
    }
    setLoading(true);
    let res = await fetch("http://localhost:8801/send-otp", {
      method: "POST",
      headers: {
        // "X-CSRFToken": getCookie("csrftoken"),
        "Content-Type": "application/json"
        // Authorization: `${token}`,
      },
      // credentials: "include",
      body: JSON.stringify({user_email: user_email}),
    });
    let data = await res.json();
    console.log(data);

    if (data.status === "success") {
      setLoading(false);
      setSuccessText(data.message);
      setTimeout(() => {
        setSuccessText("");
        setIsOtpSent(true);
      }, 2000);
    }
    else {
      setLoading(false);
      setWarningText(data.message);
      setTimeout(() => {
        setWarningText("");
      }, 2000);
    }

  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length!=6) {
      setWarningText("Please enter valid 6-digit OTP");
      setTimeout(() => {
        setWarningText("");
      }, 1500);
      return;
    }
    setLoading(true);
    let res = await fetch("http://localhost:8801/verify-otp", {
      method: "POST",
      headers: {
        // "X-CSRFToken": getCookie("csrftoken"),
        "Content-Type": "application/json",
        // Authorization: `${token}`,
      },
      // credentials: "include",
      body: JSON.stringify({ user_email: user_email , user_otp: otp}),
    });
    let data = await res.json();
    console.log(data);

    if (data.status === "success") {
      setLoading(false);
      setSuccessText(data.message);
      setTimeout(() => {
        setSuccessText("");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_type", data.user_type);
        localStorage.setItem("user_name", data.user_name);
        navigate("/userdashboard");
      }, 2000);
    } else {
      setLoading(false);
      setWarningText(data.message);
      setTimeout(() => {
        setWarningText("");
      }, 2000);
    }
  }

    // const handleClick = async e =>{
    //   e.preventDefault()
    //     await axios.post("http://localhost:8801/api/users/login",{
    //       user_email:user_email,
    //       user_password:user_password,
    //     })
    //     .then((response)=>{
    //       if(response.data.message){
    //         setLoginStatus(response.data.message);
    //       }else{
    //         setLoginStatus(response.data[0].user_email);
    //         setauthenticated(true)
    //         localStorage.setItem("authenticated", true);
    //         navigate("/userdashboard")
    //       }
    //     })
    //     .catch(err=>{
    //       console.log(err);
    //     })
    //       // navigate("/userdashboard")   
    // };
  
  return (
    <>
      <Header/>
      {loading ? <div id="loader" className="lds-dual-ring overlay" /> : null}
      {/* <ThemeProvider theme={theme}> */}
      <Grid container component="main" sx={{ marginTop: "80px" }}>
        {/* <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> */}
        <Grid item xs={3.6}></Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={10}
          square
          style={{
            marginTop: "35px",
            borderRadius: "10px",
            height: "550px",
            color: "red",
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
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "red" }}>
              <LockOutlinedIcon />
            </Avatar>
            <hr color="red"></hr>
            <Typography
              component="h1"
              variant="h5"
              style={{ font: " 25px Montserrat, sans-serif" }}
            >
              <b>User Login</b>
            </Typography>
            <br></br>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              style={{ width: "75%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="user_email"
                autoComplete="email"
                autoFocus
                disabled={isOtpSent ? true : false}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
              {isOtpSent ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="user_password"
                  label="OTP"
                  placeholder="Enter 6 digit OTP sent on your registered Email Address"
                  type="text"
                  id="otp"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
              ) : (
                ""
              )}

              <div
                style={{
                  display: warningText ? "block" : "none",
                  textAlign: "center",
                  marginLeft: "0px",
                  marginTop: "10px",
                  maxWidth: "710px",
                  marginBottom: "-10px",
                }}
                className="alert alert-warning"
              >
                {warningText}
              </div>

              <div
                style={{
                  display: successText ? "block" : "none",
                  textAlign: "center",
                  marginTop: "10px",
                  maxWidth: "710px",
                  marginBottom: "-10px",
                }}
                className="alert alert-success"
              >
                {successText}
              </div>

              {isOtpSent ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={handleVerifyOtp}
                  style={{
                    marginLeft: "140px",
                    width: "150px",
                    borderRadius: "15px",
                  }}
                  sx={{
                    mt: 3,
                    mb: 3,
                    p: 1,
                    bgcolor: "red",
                    font: "18px Montserrat, sans-serif",
                  }}
                >
                  <b>Verify OTP</b>
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSendOtp}
                  style={{
                    marginLeft: "140px",
                    width: "150px",
                    borderRadius: "15px",
                  }}
                  sx={{
                    mt: 3,
                    mb: 3,
                    p: 1,
                    bgcolor: "red",
                    font: "18px Montserrat, sans-serif",
                  }}
                >
                  <b>Get OTP</b>
                </Button>
              )}

              <Grid container style={{ textAlign: "center" }}>
                {/* <Grid item xs align="left">
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item style={{ width: "100%", marginTop: "20px" }}>
                  <Link href="/usersignup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* </ThemeProvider> */}
      {/* <Footer/> */}
    </>
  );
}

export default UserLogin;