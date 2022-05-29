
import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Layout/Header';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import { Navigate, Outlet } from 'react-router-dom';
import Challenge from './Components/Challenge';
import ForgotEmpolyee from './Components/Login/ForgotEmpolyee';

const PrivateRoute = () => {
    const auth = sessionStorage.getItem('Empid'); 
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

function App() { 
  return (
    <React.Fragment>
    <Header/>
    <Routes>
    <Route exact path='/' element={<PrivateRoute/>}>
      <Route exact path='/' element={<Home/>}/>
    </Route>
    <Route exact path='/challenge' element={<PrivateRoute/>}>
       <Route exact path='/challenge' element={<Challenge/>}/>
    </Route>
     <Route exact path='/home' element={<PrivateRoute/>}>
       <Route exact path='/home' element={<Home/>}/>
     </Route>
     <Route exact path='/forgotempid' element={<ForgotEmpolyee/>}/>
    <Route exact path='/signup' element={<SignUp/>}/>
      <Route exact path='/login' element={<Login/>}/>
    </Routes>
   </React.Fragment>
  );
}

export default App;
