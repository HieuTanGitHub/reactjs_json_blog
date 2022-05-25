import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Badge from "./Badge";
const Blogs = ({
  title,
  category,
  description,
  id,
  imageUrl,
  excerpt,
  handleDelete,
}) => {
  return (
    
      <MDBCol size="4" className="mt-2">
        <MDBCard className="h-100 " style={{maxWidth:"22rem"}}>
          <MDBCardImage
            src={imageUrl}
            alt={title}
            style={{width:"100%"}}
            position="top"
          />
          <MDBCardBody>
            <MDBCardTitle>{title}</MDBCardTitle>
            <MDBCardText>
              {excerpt(description)}
              <Link to={`/blog/${id}`}>Read More</Link>
            </MDBCardText>
            <Badge>{category}</Badge>
            <span>
              <MDBBtn
                className="mt-1"
                tag="a"
                color="none"
                onClick={() => handleDelete(id)}
              >
                <MDBIcon
                  fas
                  icon="trash"
                  style={{ color: "#dd4b39" }}
                  size="lg"
                ></MDBIcon>
              </MDBBtn>
              <Link to={`/editBlog/${id}`}>
              <MDBIcon
                fas
                icon="edit"
                style={{ color: "#55acee", marginLeft: "10px" }}
                size="lg"
              ></MDBIcon>
             </Link>
            </span>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
   
  );
};

export default Blogs;
