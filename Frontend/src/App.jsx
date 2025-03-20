import './Styles/Styles.css'
import {Landing,Test,AboutMe} from './Routes/routes'

import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/about' element={<AboutMe/>}/>
    <Route path='/test' element={<Test/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
