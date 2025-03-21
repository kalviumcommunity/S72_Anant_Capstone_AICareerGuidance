import './Styles/Styles.css'
import {Landing,Test,AboutMe,SignUp,Login} from './Routes/routes'

import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/about' element={<AboutMe/>}/>
    <Route path='/test' element={<Test/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
