import './App.css'
import About from './Pages/About'
import AddDetails from './Pages/AddDetails'
import ChangePassword from './Pages/ChangePassword'
import Edit from './Pages/Edit'
import EditProfile from './Pages/EditProfile'
import Home from './Pages/Home'
import InstMoreDetails from './Pages/InstMoreDetails'
import Instructor01 from './Pages/Instructor01'
import Instructor02 from './Pages/Instructor02'
import Instructor03 from './Pages/Instructor03'
import Instructor04 from './Pages/Instructor04'
import InstructorHome from './Pages/InstructorHome'
import ProfileDisplay from './Pages/ProfileDisplay'
import { BrowserRouter,Routes,Route } from 'react-router-dom'


function App() {
  

  return (

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AddDetails/>}/>
      <Route path='/profiledisplay/:email' element={<ProfileDisplay/>}/>
      <Route path='/editprofile/:email' element={<Edit/>}/>
      <Route path='/instructorhome' element={<InstructorHome/>}/>
      <Route path='/instuructor/:email' element={<Instructor01/>}/>
      <Route path='/InstMoreDetails/:email' element={<InstMoreDetails/>}/>
      <Route path='/changpw' element={<ChangePassword/>}/>
    </Routes>
    </BrowserRouter>
   
  )
}

export default App
