import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer.js';
import Header from './Header.js';
import bloodbg from "./bloodbg.jpg";


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

const theme = createTheme();

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
    
    <Header/>
    {/* <ThemeProvider theme={theme}> */}
      <Grid container component="main" sx={{ height: '100vh'}}>
      
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
        <Grid item xs={2.35}>

        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={10} square style={{marginTop:"120px", borderRadius:"10px", height:"300px",maxWidth:"350px",color:"red", marginBottom:'0px'}}>
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              
              
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3,p:1, bgcolor:'red' ,font:"18px Montserrat, sans-serif"}}
                href="/userlogin"
              >
                <b>Sign In</b>
              </Button>
              
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={2}>

</Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={10} square style={{marginTop:"120px", borderRadius:"10px", height:"300px",maxWidth:"350px",color:"red", marginBottom:'0px'}}>
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
              <b>Hospital Login</b>
            </Typography>
          <br></br>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              
              
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3,p:1, bgcolor:'red' ,font:"18px Montserrat, sans-serif"}}
                href="/hospitallogin"
              >
                <b>Sign In</b>
              </Button>
              
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

export default Login;