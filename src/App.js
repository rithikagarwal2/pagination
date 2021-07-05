import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);
  const [userid,setuserid]= useState();
 

  // Get current posts
  const render= ()=>{
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://gitlab.com/api/v4/users?username=rithikagarwal2');
     
      console.log(res);
      setuserid(res.data[0].id);
      console.log(res.data[0].id);
      const projects= await axios.get(`https://gitlab.com/api/v4/users/${res.data[0].id}/projects?access_token=a47babe4ca273839ce99dc4e4a568ec343a17b3ca830128699c32b0f4e1c5555`);

      console.log(projects);
      var arr =[];
      projects.data.map((obj)=>{
        arr.push(obj.id);
      })
      setPosts(arr);
      setLoading(false);
      console.log(arr);
    };

    fetchPosts();
  }
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>Git-Lab</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
