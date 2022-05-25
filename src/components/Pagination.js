import React from "react";
import {
  MDBPagination,
  MDBPaginationLink,
  MDBPaginationItem,
  MDBBtn,
} from "mdb-react-ui-kit";
const Pagination = ({
  currentPage,
  pageLimit,
  loadBlogsData,
  data,
  totalBlog,
  
  
}) => {
  const renderPagination = () => {
    if(currentPage ===0 && data.length<3 || (totalBlog===pageLimit && currentPage === 0)) return null
    if (currentPage === 0) {
      return (
        <MDBPagination center className="md-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>
              <MDBBtn rounded onClick={() => loadBlogsData(3,6,1)}>
                Next
              </MDBBtn>
            </MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit && (totalBlog - data.length) !==pageLimit) {
      return (
        <MDBPagination center className="md-0">
          <MDBPaginationItem>
            <MDBPaginationLink>
              <MDBBtn rounded onClick={() => loadBlogsData((currentPage-1)*3,currentPage*3,-1)}>
                Prev
              </MDBBtn>
            </MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn rounded onClick={() => loadBlogsData((currentPage+1)*3,(currentPage+2)*3,1)}>
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination center className="md-0">
          <MDBPaginationItem>
            <MDBPaginationLink>
              <MDBBtn rounded onClick={() => loadBlogsData((currentPage-1)*3,currentPage*3,-1)}>
                Prev
              </MDBBtn>
            </MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };
  return <div>{renderPagination()}</div>;
};

export default Pagination;
