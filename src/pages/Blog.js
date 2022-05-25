import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardOverlay,
  MDBCardImage,
  MDBTypography,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Badge from "../components/Badge";
import { toast } from "react-toastify";
const Blog = () => {
  const [blog, setBlog] = useState();
  const [relatedPost, setRelatedPost] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleBlog();
    }
  }, [id]);
  const getSingleBlog = async () => {
    const resp = await axios.get(`http://localhost:5000/blogs/${id}`);
    const relatedPostData = await axios.get(
      `http://localhost:5000/blogs?category=${resp.data.category}&_start=0&_end=3`
    );
    
    if (resp.status === 200 || relatedPostData.status === 200) {
      setBlog(resp.data);
      setRelatedPost(relatedPostData.data); 
    } else {
      toast.error("Something went wrong");
    }
  };
  const styleInfo = {
    display: "inline",
    marginLeft: "5px",
    float: "right",
    marginTop: "7px",
  };
  return (
    <div>
      <MDBContainer className="mt-4">
        <MDBCard background="dark" className="text-white">
          <MDBCardImage
            overlay
            src={blog && blog.imageUrl}
            alt={blog && blog.title}
          />
          <MDBCardOverlay>
            <MDBTypography>
              {blog && blog.title}
              <Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>
            </MDBTypography>
            <MDBCardText>{blog && blog.description}</MDBCardText>
            <MDBCardText>Date Post: {blog && blog.date}</MDBCardText>
          </MDBCardOverlay>
        </MDBCard>
        {relatedPost && relatedPost.length > 0 && (
          <>
            {relatedPost.length > 1 && <h4>Related Post</h4>}

            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
              {relatedPost
                .filter((item) => item.id != id)
                .map((item, index) => (
                  <MDBCol>
                    <MDBCard>
                      <Link to={`/blog/${item.id}`}>
                        <MDBCardImage
                          src={item.imageUrl}
                          alt={item.title}
                          position="top"
                        />
                        <MDBCardBody>
                          <MDBCardTitle>{item.title}</MDBCardTitle>
                          <MDBCardText>{item.description}</MDBCardText>
                        </MDBCardBody>
                      </Link>
                    </MDBCard>
                  </MDBCol>
                ))}
            </MDBRow>
          </>
        )}
      </MDBContainer>
    </div>
  );
};

export default Blog;
