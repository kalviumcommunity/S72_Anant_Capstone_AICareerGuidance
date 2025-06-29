import './Styles/Styles.css'
import {Landing,Test,AboutMe,SignUp,Login, Profile} from './Routes/routes'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './Components/AuthProvider'
import ProtectedRoute from './Components/ProtectedRoute'
import BackToTop from "./Components/BackToTop"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/about' element={<AboutMe/>}/>
          <Route path='/test' element={
            <ProtectedRoute>
              <Test/>
            </ProtectedRoute>
          }/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }/>
        </Routes>
        <BackToTop/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
