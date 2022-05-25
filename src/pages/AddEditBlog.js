import React, { useEffect, useState } from "react";
import { MDBValidation, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const AddEditBlog = () => {
  const initialState = {
    title: "",
    description: "",
    category: "",
    imageUrl: "",
  };

  const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const { title, description, category, imageUrl } = formValue;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      getSingleBlog(id);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
    if (singleBlog.status === 200) {
      setFormValue({ ...singleBlog.data });
    } else {
      toast.error("Something went wrong");
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrMsg("Please select a category");
    }
    const imageValidate = !editMode ? imageUrl : true;
    if (title && description && imageUrl && category) {
      const currentDate = getDate();
      if (!editMode) {
        const updateBlogData = { ...formValue, date: currentDate };
        const response = await axios.post(
          "http://localhost:5000/blogs",
          updateBlogData
        );
        if (response.status === 201) {
          toast.success("Blog Created Successfully");
        } else {
          toast.error("Something went wrong");
        }
        setFormValue({
          title: "",
          description: "",
          category: "",
          imageUrl: "",
        });
        navigate("/");
      } else {
        const response = await axios.put(
          `http://localhost:5000/blogs/${id}`,
          formValue
        );
        if (response.status === 200) {
          toast.success("Blog Updated Successfully");
          navigate("/");
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };
  const onUploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "svvy7znh");
    axios
      .post("https://api.cloudinary.com/v1_1/d5gdt/image/upload", formData)
      .then((res) => {
        toast.info("Uploaded Successfully");
        setFormValue({ ...formValue, imageUrl: res.data.url });
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };
  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };
  return (
    <div>
      <MDBValidation
        className="row g-3"
        style={{ marginTop: "100px" }}
        noValidate
        onSubmit={handleSubmit}
      >
        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
        >
          <h3>{editMode ? "Upload Blog" : "Add Blog"}</h3>
          <MDBInput
            value={title || ""}
            name="title"
            type="text"
            onChange={onInputChange}
            required
            label="Title"
            validation="Please provide a title"
            invalid
          ></MDBInput>
          <br />
          <MDBInput
            value={description || ""}
            name="description"
            type="text"
            onChange={onInputChange}
            textarea
            rows={4}
            required
            label="Description"
            validation="Please provide a description"
            invalid
          ></MDBInput>
          <br />
          {!editMode && (
            <>
              <MDBInput
                name="imageUrl"
                type="file"
                onChange={(e) => onUploadImage(e.target.files[0])}
                required
                validation="Please provide a image"
                invalid
              ></MDBInput>
              <br />
            </>
          )}
          <select
            className="categoryDropdown"
            onChange={onCategoryChange}
            value={category}
          >
            <option>Please select category</option>
            {options.map((option, index) => (
              <option value={option || ""} key={index}>
                {option}
              </option>
            ))}
          </select>
          {categoryErrMsg && (
            <div className="categoryErrorMessage">{categoryErrMsg}</div>
          )}
          <br />
          <br />
          <MDBBtn type="submit" style={{ marginRight: "10px" }}>
            {editMode ? "Update" : "Add"}
          </MDBBtn>
          <MDBBtn
            type="submit"
            color="danger"
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/")}
          >
            Go Back
          </MDBBtn>
        </div>
      </MDBValidation>
    </div>
  );
};

export default AddEditBlog;
