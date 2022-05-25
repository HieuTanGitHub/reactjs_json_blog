import React from "react";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
const Search = ({ handleSearch, searchValue, onInputChange }) => {
  return (
    <div>
      <div className="searchForm">
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="search"
            className="form-control"
            placeholder="Search Blog....."
            value={searchValue}
            onChange={onInputChange}
          />
          <MDBBtn type="submit" >Search</MDBBtn>

        </form>
      </div>
    </div>
  );
};

export default Search;
