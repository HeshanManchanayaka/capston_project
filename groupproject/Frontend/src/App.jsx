import Home from "./home/home.jsx";
import Profile from "./home/Profile.jsx";
import Login from "./Login/login.jsx";
import Register from "./Register/register.jsx"
import Plan from "./mindfulness/Plan.jsx"
import Options from "./mindfulness/Options.jsx"
import Music from "./mindfulness/Music.jsx"
import Meditation from "./mindfulness/Meditation.jsx"
import Counceling from "./mindfulness/Counceling.jsx"
import LandingPage from "./admin/LandingPage.jsx";
import AdminPanel from './admin/AdminPanel.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";

function App() {
  // Initialize AOS
  AOS.init({
    offset: 200,
    duration: 600,
    easing: 'ease-in-sine',
    delay: 100,
  });
    axios.defaults.baseURL="http://localhost:5000"
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/landingpage' element={<LandingPage />} />
          <Route path='/AdminPanel' element={<AdminPanel />} />
          <Route path="/Profile" element={<Profile/>} /> 
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/question' element={<Questionn />} /> */}
          <Route path='/plan' element={<Plan />} />
          <Route path='/options' element={<Options />} />
          <Route path='/music' element={<Music />} />
          <Route path='/meditation' element={<Meditation />} />
          <Route path='/counceling' element={<Counceling />}/>


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
