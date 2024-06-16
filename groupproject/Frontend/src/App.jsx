import Home from "./home/home.jsx";
import Login from "./Login/login.jsx";
import Register from "./Register/register.jsx"
import Plan from "./mindfulness/Plan.jsx"
import Plan1 from "./mindfulness/Plan1.jsx"
import Options from "./mindfulness/Options.jsx"
import Music from "./mindfulness/Music.jsx"
import Meditation from "./mindfulness/Meditation.jsx"
import Counceling from "./mindfulness/Counceling.jsx"
import Audios from "./mindfulness/Audios.jsx"
import Questionn from "./mindfulness/Questionn.jsx"
import Videos from "./mindfulness/VideoManagement.jsx"
import Adminmusic from "./mindfulness/Adminmusic.jsx"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  // Initialize AOS
  AOS.init({
    offset: 200,
    duration: 600,
    easing: 'ease-in-sine',
    delay: 100,
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/UserProfile' element={<UserProfile />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/question' element={<Questionn />} />
          <Route path='/plan' element={<Plan />} />
          <Route path='/plan1' element={<Plan1 />} />
          <Route path='/options' element={<Options />} />
          <Route path='/music' element={<Music />} />
          <Route path='/meditation' element={<Meditation />} />
          <Route path='/counceling' element={<Counceling />}/>
          <Route path='/audios' element={<Audios />}/>
          <Route path='/videos' element={<Videos />}/>
          <Route path='/adminmusic' element={<Adminmusic />}/>
         
           <Route path="/plan" element={Plan} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
