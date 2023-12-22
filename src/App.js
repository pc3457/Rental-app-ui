import "../src/dist/styles.css";
import React, { useState }  from 'react';
import { Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import CarRentalSearch from "../src/components/common/CarRental/CarRentalSearch"
import Home from "./Pages/Home";
// Make sure to adjust the import paths based on your project's folder structure

function App() {

  const [username, setUsername] = useState('');
  return (
    <>
      <Navbar onUsernameChange={setUsername} />
       <Routes>
          <Route index path="/" element={<Home />}/>
      </Routes> 
      <CarRentalSearch username={username} />
    </>
  );
}

export default App;
