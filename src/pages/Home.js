import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import {MDBRow,MDBCol,MDBContainer,MDBTypography} from "mdb-react-ui-kit"
import Blog from './Blog';
import Blogs from '../components/Blogs';
import Search from '../components/Search';
import Category from '../components/Category';
import LastestBlog from '../components/LastestBlog';
import Pagination from '../components/Pagination';

const Home = () => {
  const [data,setData] = useState([]);
  const [searchValue,setSearchValue] = useState("");
  const [latestBlog, setLatestBlog] = useState([]);
  const [currentPage,setcurrentPage] = useState(0);
  const [totalBlog,settotalBlog] = useState(null);
  const [pageLimit] = useState(3);

  const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];
  useEffect(()=>{
     loadBlogsData(0,3,0);
     fetchLastestBlog();
  },[])
  const fetchLastestBlog = async () =>{
    const totalBlog = await axios.get('http://localhost:5000/blogs');
    const start = totalBlog.data.length - 1;
    const end = totalBlog.data.length;
    const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
    if(response.status === 200){
      setLatestBlog(response.data);
     
    }else{
      toast.error("Something went wrong");
    }
  }
  const loadBlogsData = async (start,end,increase,operation) =>{
    const totalBlog = await axios.get('http://localhost:5000/blogs');
    settotalBlog(totalBlog.data.length);
    const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
    if(operation){
      setcurrentPage(0)
    }else{
      setcurrentPage(currentPage+increase);
    }
    if(response.status === 200){
      setData(response.data);
      setcurrentPage(currentPage + increase);
    }else{
      toast.error("Something went wrong");
    }
  }
  const handleDelete = async (id) => {
    if(window.confirm("Are you want to delete this??")){
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if(response.status === 200){
        toast.success("Blog Deleted!");
        loadBlogsData(0,3,0,"delete");
      }else{
        toast.error("Something went wrong");
      }
    }

  };
  const excerpt = (str) => {
    if(str.length > 50){
      str = str.substring(0,50) + "...";
    }
    return str;
  }
  const onInputChange = (e) => {
    if(!e.target.value){
      loadBlogsData();
    }
    setSearchValue(e.target.value);
  }
  const handleSearch = async (e) =>{
    e.preventDefault();
    const resp = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`)
    if(resp.status === 200){
      setData(resp.data)
    }else{
      toast.error("Something went wrong")
    }
  }
  const handleCategory = async (category) => {
    const response = await axios.get(`http://localhost:5000/blogs?category=${category}`)
    if(response.status === 200)
    {
      setData(response.data)
    }else{
      toast.error("Something went wrong");
    }
  }
  return (
    <>
    <MDBContainer>
    <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch}/>
    <MDBRow className="row-cols-1 row-cols-md-2 g-2 mt-2">
      {data.length===0 && (
        <MDBTypography className="text-center mb-0" tags="h2">
          No Blog Found
        </MDBTypography>
      )}
      <MDBCol size="1">
        <MDBContainer>
          <MDBRow>
            {data && data.map((item,index)=>(
              <Blogs key={index} {...item} excerpt={excerpt} handleDelete={handleDelete}/>
            ))}
          </MDBRow>
        </MDBContainer>
      </MDBCol>
      <MDBCol size="3">
        <h4 className='text-start'>Latest Post</h4>
        {latestBlog && latestBlog.map((item,index)=>(
          <LastestBlog key={index} {...item}></LastestBlog>
        ))}
        <Category options={options} handleCategory={handleCategory}/>
      </MDBCol>

    </MDBRow>
    <div className='mt-3'>
      <Pagination currentPage={currentPage} loadBlogsData ={loadBlogsData} pageLimit={pageLimit} data={data} totalBlog={totalBlog}></Pagination>
    </div>
    </MDBContainer>
    
    </>
  )
}

export default Home