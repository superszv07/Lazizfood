import './App.css';
import React from 'react';
import Home from './screens/Home';
import Login from './screens/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContexReducer.js';
import MyOrder from './screens/MyOrder.js';
import Profile from './screens/Prof.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProfile from './screens/Edit.js';
function App() {
  return (
  <CartProvider>
   <Router>
      <div>
         <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
         <Route exact path="/" element={<Home/>}/>
         <Route exact path="/login" element={<Login/>}/>
         <Route exact path="/signup" element={<Signup/>}/>
         <Route exact path="/myOrder" element={<MyOrder/>}/>
         <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
    </Router>
  </CartProvider>
  );
}

export default App;
