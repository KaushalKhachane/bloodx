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

import Footer from './Footer.js';
import Header from './Header.js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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



  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const [loginStatus, setLoginStatus] = useState("");

const navigate = useNavigate()

    const handleClick = async e =>{
      e.preventDefault()
        await axios.post("http://localhost:8801/userlogin",{
          user_email:user_email,
          user_password:user_password,
        })
        .then((response)=>{
          if(response.data.message){
            setLoginStatus(response.data.message);
          }else{
            setLoginStatus(response.data[0].user_email);
            setauthenticated(true)
            localStorage.setItem("authenticated", true);
            navigate("/userdashboard")
          }
        })
        .catch(err=>{
          console.log(err);
        })
          // navigate("/userdashboard")   
    };
  
  return (
    <>
    
    <Header/>
    {/* <ThemeProvider theme={theme}> */}
      <Grid container component="main" sx={{ height: '100vh', marginTop:"80px"}}>
      
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
        <Grid item xs={3.6}>

        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={10} square style={{marginTop:"35px", borderRadius:"10px", height:"550px",color:"red", marginBottom:'0px'}}>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'red' }}>
              <LockOutlinedIcon />
            </Avatar>
            <hr color="red"></hr>
            <Typography component="h1" variant="h5" style={{font:" 25px Montserrat, sans-serif"}}>
              <b>User Login</b>
            </Typography>
          <br></br>
            <Box component="form" noValidate  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="user_email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="user_password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleClick}
                sx={{ mt: 3, mb: 3,p:1, bgcolor:'red' ,font:"18px Montserrat, sans-serif"}}
              >

                <b>Sign In</b>
              </Button>
              <Grid container>
                <Grid item xs align="left">
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
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
    <Footer/>
    </>
  );
}

export default UserLogin;