import "../assets/css/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

function UserLogin() {
  const navigate = useNavigate();
  const [formData,setFormData]=useState({email:'',password:''});
  const handleChange=(event)=>{
    const {name,value}=event.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
    // console.log(formData)
    axios.post(`${import.meta.env.VITE_API_URL}/user/login`, formData)
    .then(res=>{
      localStorage.setItem('name',res.data.user.name)
      localStorage.setItem('role',res.data.user.role)
      localStorage.setItem('userid',res.data.user._id)
      localStorage.setItem('token',res.data.token)
      
      if(res.data.user.role=='provider'){
        navigate('/provider/landing');
        window.location.reload();
      }
      if(res.data.user.role=='customer'){
        navigate('/user/landing');
        window.location.reload();
      }
      // console.log(res.data)
    }).catch(err=>console.log(err));
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back User👋</h2>
        <p className="subtitle">Login to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="footer-text">
          Don't have an account? <span onClick={() => navigate("/register")}>Register</span>
        </p>
        <p className="footer-text">
          Are you an Admin?<span onClick={() => navigate("/")}>Admin Login</span>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;