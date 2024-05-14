import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import Body from "./home/home.jsx";


function App() {
  return(
    <>
       <BrowserRouter>
              <Routes>
                      <Route path='/'  element={<Body/>}> </Route>
              </Routes>
       </BrowserRouter>
  
    </>
  ) ;


}

export default App
