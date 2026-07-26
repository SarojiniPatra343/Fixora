import { useState } from "react";
import "../assets/css/Login.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function AdminLogin() {
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
      email:'',
      password:''
    })
    const handleChange=(event)=>{
      const {name,value}=event.target;
      setFormData({
        ...formData,
        [name]:value
      })
    }
    const handleSubmit=(event)=>{
      event.preventDefault();
      axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, formData)
      .then((res)=>{
        console.log(res.data);
        if(res.data.role=='admin'){
          localStorage.setItem('role',res.data.role);
          navigate('/admin/landing');
          window.location.reload()
        }else{
          navigate('/')
        }
      })
      .catch(err=>console.log(err));
    }
    return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back Admin👋</h2>
        <p className="subtitle">Login to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
          <p className="footer-text">
          Are you an user?<span onClick={() => navigate("/login")}>UserLogin</span>
        </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;