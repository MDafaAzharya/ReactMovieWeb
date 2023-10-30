import Navbar from './app/component/Navbar'
import Card from './app/component/Card'
import { FooterWithSocialLinks } from './app/component/footer'
import React, { useState } from 'react';


function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
      setSearchResults(results);
  };
  return (
      <div className='overflow-x-hidden'>
          <Navbar OnSearch={handleSearchResults} />
          <Card searchResults={searchResults} />
          <FooterWithSocialLinks/>
      </div>
      
   
  )
}

export default App
