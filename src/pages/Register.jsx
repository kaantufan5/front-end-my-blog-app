import * as React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../contexts/AuthContext";
import {
    toastErrorNotify,
  } from "../helpers/toastNotify.js";

const theme = createTheme();

const Register = () => {

const {createUser} = useContext(AuthContext);
  const navigate = useNavigate()
  const getKey = localStorage.getItem('currentUserToken')
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [password1, setPassword1] = useState()
  const [usernick, setUsernick] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
        if (email && password && password1 && usernick && firstName && lastName) {
            if (password1 === password) {
                createUser(email,password,navigate,firstName,lastName,usernick)
            } else {
                toastErrorNotify("Passwords not match!")
            }
        } else {
            toastErrorNotify("Please fill all the fields");
        }        
  };


  return (
    <div>
      {!getKey ? (
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
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
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="name"
                  onChange={(e)=>setUsernick(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  autoComplete="email"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  onChange={(e)=>setFirstName(e.target.value)}
                  autoComplete="firstname"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  onChange={(e)=>setLastName(e.target.value)}
                  autoComplete="lastname"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e)=>setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password1"
                  label="Confirm Password"
                  type="password"
                  id="password1"
                  onChange={(e)=>setPassword1(e.target.value)}
                  autoComplete="current-password1"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register Now
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"Already have an account? Sign in"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      ) : (
        <div>
    <div className="card p-3 py-4" style={{ backgroundColor: "#e6e3db" }}>
          <h2 className="text-center">You're already logged</h2>
          <hr />
          <div className="text-center">
              <button
                className="btn btn-primary px-4 ms-1"
                onClick={() => navigate("/")}
                style={{ backgroundColor: "#0b022d" }}
              >
                Home
              </button>
          </div>
        </div>
  </div>
      )
    }
    </div>
  );
};

export default Register;
