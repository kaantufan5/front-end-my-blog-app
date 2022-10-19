import React, { useContext } from 'react'
import { BlogContext } from '../contexts/BlogContext'
import Button from "@mui/joy/Button";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from '@mui/joy/Link';
import Typography from "@mui/joy/Typography";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineSharpIcon from '@mui/icons-material/ChatBubbleOutlineSharp';
import IconButton from '@mui/joy/IconButton';
import { useNavigate } from "react-router-dom";

  

const HomePage = () => {
  const getKey = localStorage.getItem('currentUserToken')
  const { posts, getPostDetails, viewPost } = useContext(BlogContext)

const detailFunc = (id) => {
  viewPost(id)
  navigate(`/details/${id}`);
  getPostDetails(String(id))
};
const navigate = useNavigate()


// console.log(posts)

  return (
    <div>
      {getKey ? (
        posts?.length === 0 ? (
          <h1>No result found</h1>
        ) : (
          posts?.map((item, index) => (
            <div key={item.id} className="blogs-cards">
              <Card
              variant="outlined"
              sx={{
                minWidth: 100,
                background: "#09090D",
                borderColor: "#272930",
              }}
            >
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img src={item.image} alt="blog-foto" />
                </AspectRatio>
              </CardOverflow>
              <Typography
                level="h2"
                sx={{ fontSize: "28px", mt: 2, color: "#EEEFF0" , textAlign: "center"}}
              >
                <Link sx={{ color: "#EEEFF0"}} onClick={() => detailFunc(item.id)}>{item.title.charAt(0).toUpperCase() + item.title.substr(1, 25)}...</Link>
              </Typography>
              <Typography
                level="body2"
                sx={{ fontSize: "17px", mt: 0.5, mb: 2, color: "#BDBFC4", textAlign: "center"}}
              >
               <Link sx={{ color: "#a9a9a9"}}>{item.author}</Link>  
              </Typography>
              <CardOverflow
                variant="soft"
                sx={{
                  display: "flex",
                  gap: 1.5,
                  py: 1.5,
                  px: "var(--Card-padding)",
                  borderTop: "1px solid",
                  borderColor: "#272930",
                  bgcolor: "#272930",
                }}
              >
                  <IconButton className='noHover' sx={{
                    backgroundColor: "#272930",
                    color: "#FFFFFF",
                    }}>
                    <FavoriteBorderIcon sx={{color: "#FFFFFF"}}/>
                    {item.likes}
                    </IconButton>

                <IconButton className='noHover' sx={{
                  backgroundColor: "#272930",
                  color: "#FFFFFF",
                }}>
                <ChatBubbleOutlineSharpIcon sx={{color: "#FFFFFF"}}/>
                {item.comment_count}
                </IconButton>
                <Button
                  variant="solid"
                  className='home-detail-button'
                  size="sm"
                  onClick={() => detailFunc(`${item.id}`)}
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{
                    ml: '14.6rem',
                    fontWeight: 600,
                  }}
                >
                  Details
                </Button>
              </CardOverflow>
            </Card>
            </div>
          ))
        )
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
      )}
    </div>
  )
};

export default HomePage;
