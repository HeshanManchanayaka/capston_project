import Home from "./home/home.jsx";
import Login from "./Login/login.jsx";
import Register from "./Register/register.jsx";
import Profile from "./userprofile/userprofile.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return(
    <>
       <BrowserRouter>
              <Routes>
                      <Route path='/'  element={<Home/>}> </Route>
                      <Route path='/login'  element={<Login/>}> </Route>
                      <Route path='/Register'  element={<Register/>}> </Route>
                      <Route path='/Profile'  element={<Profile/>}> </Route>
              </Routes>
       </BrowserRouter>
  
    </>
  ) ;


}

export default App
