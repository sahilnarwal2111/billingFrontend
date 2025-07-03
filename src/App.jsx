import { useState } from 'react'
import { Sigin } from './pages/Signin'
import {
    BrowserRouter as Router,
    Route, Routes
} from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { CreateBill } from './pages/CreateBill';

function App() {
  return <Router>
    <div>
      <Routes>
        <Route path='/signin' element={<Sigin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/create' element={<CreateBill/>}></Route>
      </Routes>
    </div>
  </Router>
  
}

export default App
