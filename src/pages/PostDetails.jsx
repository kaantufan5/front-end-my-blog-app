import React, { useContext, useState, useEffect} from "react";
import { BlogContext } from '../contexts/BlogContext'
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from '@mui/joy/Link';
import Typography from "@mui/joy/Typography";
import IconButton from '@mui/joy/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import { useNavigate, useParams } from "react-router-dom";


const PostDetails = () => {
  const navigate = useNavigate();
  const {id} = useParams()
  const { postDetails, postLike, postDetailComment, firstGetCategory, postUpdate, deletePost, getPostDetails } = useContext(BlogContext)

  const [detailImage, setDetailImage] = useState(null);
  const [newDetailTitle, setNewDetailTitle] = useState('');
  const [newDetailContext, setNewDetailContext] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const getKey = localStorage.getItem('currentUserToken')
  const getUserID = localStorage.getItem('currentUserID')
  const [comment, setComment] = useState()

  const postDetComment = (e) => {
    postDetailComment(comment, postDetails.id)
  }

  const deleteFunc = (id) => {
    deletePost(id)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postUpdate(detailImage, newDetailTitle, newDetailContext, newCategory, postDetails.id)
  }

  
  const isFoundLikes = postDetails.likes_all?.some(item => {
    if (item.user_id === Number(getUserID)) {
      return true;
    }

    return false;
  });

  useEffect(() => {
    getPostDetails(id)
  }, [getPostDetails, id]);

 
  const handleLike = (e) => {
    // console.log(postDetails.likes_all)
    // console.log(isFoundLikes)
    if (!isFoundLikes) {
      postLike(postDetails.id)
    }
  }


  return (
    <div>
      {getKey ? (
  postDetails?.length === 0 ? (
    <div>
  <h1 style={{color: "#FFFFFF", textAlign: "center"}}>Something went wrong</h1>
  <h1 style={{textAlign: "center"}}><a href="/">Home</a></h1>
  </div>
  ) : (
      <div key={postDetails.id} className="blogs-detail-cards">
        <Card
        variant="outlined"
        sx={{
          minWidth: 440,
          background: "#09090D",
          borderColor: "#272930",
        }}
      >
        <CardOverflow >
          <AspectRatio ratio="5">
            <img className="detail-image" src={postDetails.image} alt="blog-foto"/>
            </AspectRatio>
        </CardOverflow>
        
        <Typography
          level="h2"
          sx={{ fontSize: "28px", mt: 2, color: "#EEEFF0" , textAlign: "center"}}
        >
          <div>
          <IconButton
          color="danger"
          size="lg"
          className="detail-post-count"
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            color: "#000000",
            backgroundColor: "#FFFFFF",
            left: 35,
            mt: -3,
            // bottom: 0,
            transform: 'translateY(50%)',
          }}
        >
          <VisibilityIcon fontSize="large"/>
          {postDetails.post_views}
        </IconButton>
            <Link className="detail-title" sx={{ color: "#EEEFF0", mr: "6px"}}>{postDetails.title.charAt(0).toUpperCase() + postDetails.title.slice(1)}</Link>

            {isFoundLikes ? (
              <IconButton
              onClick={() => handleLike()}
              color="danger"
              size="lg"
              className="detail-like-count"
              sx={{
              position: 'absolute',
              zIndex: 2,
              borderRadius: '50%',
              color: "#FF0000",
              backgroundColor: "#FFFFFF",
              right: '3rem',
              mt: -3,
              // bottom: 0,
              transform: 'translateY(50%)',
              }}
              >
              <Favorite fontSize="large" sx={{color: "#FF0000"}}/>
              {postDetails.likes}
              </IconButton>

            ) : (

              <IconButton
              onClick={() => handleLike()}
              color="danger"
              size="lg"
              className="detail-like-count"
              sx={{
              position: 'absolute',
              zIndex: 2,
              borderRadius: '50%',
              color: "#000000",
              backgroundColor: "#FFFFFF",
              right: '3rem',
              mt: -3,
              // bottom: 0,
              transform: 'translateY(50%)',
              }}
              >
              <Favorite fontSize="large" sx={{color: "#000000"}}/>
              {postDetails.likes}
              </IconButton>
            )
            }

        <Typography
          level="body2"
          sx={{ fontSize: "17px", mt: 0.5, mb: 2, color: "#BDBFC4", textAlign: "center"}}
        >
           - ({postDetails.category})
        </Typography>

            </div>

        </Typography>
        <Typography
          level="body2"
          sx={{ fontSize: "17px", mt: 0.5, mb: 2, color: "#BDBFC4", textAlign: "center"}}
        >
         <Link sx={{ color: "#a9a9a9"}}>{postDetails.author}</Link>  
        </Typography>
        <Typography
          level="body2"
          className="detail-content"
          sx={{ fontSize: "17px", mt: 0.5, mb: 2, color: "#BDBFC4", textAlign: "center"}}
        >
          {postDetails.content}
        </Typography>


        {postDetails.author_id === Number(getUserID) ? (
          <div>
            <div id="myModal" className="modal fade">
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-dark h3" id="exampleModalLabel">Delete Blog</h5>
                <button type="button" className="close bg-danger edit-close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="font">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h5>Do you really want to delete these blog?</h5>
              </div>
              <div className="modal-footer justify-content-center">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => deleteFunc(postDetails.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>     
        
        
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark h3" id="exampleModalLabel">Edit Blog</h5>
                <button type="button" className="close bg-danger edit-close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="font">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label text-dark">Title:</label>
                    <input type="text" name="title" onChange={(e)=> setNewDetailTitle(e.target.value)} required className="form-control"  id="recipient-name"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label text-dark">Context:</label>
                    <textarea className="form-control" name="content" id="message-text" onChange={(e)=> setNewDetailContext(e.target.value)} required></textarea>
                  </div>
                  <div className="form-group">
                            <div className="input-group mb-3 mt-3">
                            <select className="custom-select" value={newCategory} id="inputGroupSelect02" required onChange={(e)=> setNewCategory(e.target.value)}>
                            {firstGetCategory?.length === 0 ? (
                        <p>Something went wrong!</p>
                        ) : (firstGetCategory?.map((item, index) => (
                              <option key={item.id} value={item.id}>{item.name}</option>
                              ))
                      )}
                            </select>
                          </div>
                      
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label text-dark">Image:</label>
                    <input accept=".jpg, .jpeg, .png" type="file" name="imageURL"  className="form-control" required id="recipient-name" onChange={(event) => {
                          setDetailImage(event.target.files[0]);
                        }}/>
                  </div>
                </form>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleSubmit} >Edit Blog</button>
              </div>
              </div>
            </div>
          </div>
        </div>
        
        
              <div className="blog-btn detail-buttons">
              <button
              className="btn btn-danger delete-btn-blog"
              href="#myModal" 
              data-toggle="modal"
              >
              Delete Blog
              </button>
        
              <button
              className="btn btn-warning reset-btn-blog"
              type="button" 
              data-toggle="modal" 
              data-target="#exampleModal"
              >
              Edit Blog
              </button>
              </div>
          </div>
        ) : (
          <div></div>
        )
      }

        <FormControl>
      <FormLabel sx={{color: "#FFFFFF", ml: 1}}>Add comment</FormLabel>
      <Textarea
        label="Plain"
        variant="plain"
        className="detail-comment-form"
        placeholder="Type something here…"
        onChange={(e)=> setComment(e.target.value)}
        minRows={3}
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              gap: 'var(--Textarea-paddingBlock)',
              pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'danger',
              flex: 'auto',
            }}
          >
           <Button onClick={() => postDetComment()} sx={{ ml: 'auto' , pl: 12, pr: 12}}>Send</Button>
          </Box>
        }
        sx={{
          minWidth: 300,
          m: 1,
          fontSize: "1.5rem",
          backgroundColor: "#272930",
          color: "#FFFFFF"
        }}
      />
    </FormControl>

        {postDetails.comments?.length === 0 ? (
          <h4 style={{color: "#FFFFFF"}}>No comments yet</h4>
        ) : (
          postDetails.comments?.map((item, index) => (
          <div key={item.id} className="detail-comment">
            <CardOverflow
          variant="soft"
          sx={{
            "&:hover": { color: "#FFFFFF" },
            "& :hover": { color: "#FFFFFF" },
            gap: 1.5,
            py: 1.5,
            m: 0.75,
            px: "var(--Card-padding)",
            borderTop: "1px solid",
            borderColor: "#272930",
            textAlign: "center",
            color: "#FFFFFF",
            bgcolor: "#272930",
          }}
        >
          <span className="comment-username">{item.user}</span> <br /> <br />
          <p className="comment-content">{item.content}</p> <br /><span className="comment-datetime">{new Date(item.time_stamp).toLocaleDateString('tr-TR')} - {new Date(item.time_stamp).toLocaleTimeString("tr-TR")}</span>
        </CardOverflow>
          </div>
          )
        )
        )
      }
            
      </Card>
      </div>
  )
) : (
  <div>
    <div className="card p-3 py-4" style={{ backgroundColor: "#e6e3db" }}>
          <h2 className="text-center">Profile not found</h2>
          <hr />
          <div className="text-center">
              <button
                className="btn btn-primary px-4 ms-1"
                onClick={() => navigate("/login")}
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
  );
};

export default PostDetails;



