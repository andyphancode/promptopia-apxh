"use client";
import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt-layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm)
    const filtered = posts.filter((post) => {
      return (
        post.tag.includes(searchTerm) || post.creator.username.toLowerCase().includes(searchTerm.toLowerCase()) || post.prompt.includes(searchTerm)
      );
    })

    setFilteredPosts(filtered);
  }

  const handleTagClick = (tag) => {

    const searchTerm = tag.target.innerText 
    setSearchText(searchTerm)
    const filtered = posts.filter((post) => {
      return (
        post.tag.includes(searchTerm)
      );
    })

    setFilteredPosts(filtered);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data);
    }
    
    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text"
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      <PromptCardList
      data={filteredPosts}
      handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed