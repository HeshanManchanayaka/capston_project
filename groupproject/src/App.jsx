import Home from "./home/home.jsx";
import Login from "./Login/login.jsx";
import Register from "./Register/register.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return(
    <>
       <BrowserRouter>
              <Routes>
                      <Route path='/'  element={<Home/>}> </Route>
                      <Route path='/login'  element={<Login/>}> </Route>
                      <Route path='/Register'  element={<Register/>}> </Route>
              </Routes>
       </BrowserRouter>
  
    </>
  ) ;


}

export default App
