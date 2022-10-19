import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext, useState} from "react";
import { BlogContext } from '../contexts/BlogContext'

const theme = createTheme();

// background: #DFC2F2;
//   background-image: linear-gradient(to right, #0f0c29, #302b63, #24243e);

const NewBlog = () => {
  const getKey = localStorage.getItem('currentUserToken')
  const { firstGetCategory, postPost} = useContext(BlogContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContext, setNewContext] = useState('');
  const navigate = useNavigate();
  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postPost(newTitle, newContext, category, selectedImage, navigate)
  }

  return (
    <div>
      {getKey ? (
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={3}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
  
          <Grid item xs={12} sm={8} md={9} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, p: 4, bgcolor: 'success.main' }}>
                <LibraryAddIcon fontSize="large"/>
              </Avatar>
              <Typography component="h1" variant="h4">
                New Blog
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                focused
                name="title"
                autoComplete="title"
                onChange={(e)=> setNewTitle(e.target.value)}
                autoFocus
                />
                <TextField
                required
                name="context"
                fullWidth
                multiline
                focused
                rows={15}
                onChange={(e)=> setNewContext(e.target.value)}
                label="Context"
                />
                <div>
                <FormControl required focused sx={{ mt: 2, minWidth: 120 }}>
                <InputLabel id="category-select">Category</InputLabel>
                <Select
                  required
                  labelId="category-select"
                  id="category-select"
                  value={category}
                  label="Category"
                  onChange={handleChange}
                >
                  {firstGetCategory?.length === 0 ? (
                  <MenuItem>Something went wrong!</MenuItem>
                  ) : (
                    firstGetCategory?.map((item, index) => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))
                )}
                </Select>
              </FormControl>
                </div>     
                <div>
                {selectedImage && (
                  <div>
                  <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} style={{marginTop: '10px', border: '1px solid black'}}/>
                  <br />
                  <Button sx={{
                    border: 2,
                    mt: 2
                  }} variant="outlined" color="error" onClick={()=>setSelectedImage(null) }>Remove</Button>
                  </div>
                )}
                <br />
              
                <Button variant="contained" component="label">
                Upload Image
                <input
                  required
                  hidden accept="image/*"
                  type="file"
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                  }}
                />
                </Button>
              </div>
              
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Grid>
  
        </Grid>
      </ThemeProvider>
      ) : (
        <div>
    <div className="card p-3 py-4" style={{ backgroundColor: "#e6e3db" }}>
          <h2 className="text-center">Profile not found</h2>
          <hr />
          <div className="text-center">
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary px-4 ms-1"
                style={{ backgroundColor: "#0b022d" }}
              >
                Login
              </button>

            <hr />

              <button
                className="btn btn-primary px-4 ms-1"
                onClick={() => navigate("/register")}
                style={{ backgroundColor: "#0b022d" }}
              >
                Register
              </button>
          </div>
        </div>
  </div>
      )
    }
    </div>
  );
};

export default NewBlog;
