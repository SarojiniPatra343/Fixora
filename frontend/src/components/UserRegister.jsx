import { useState } from "react";
import "../assets/css/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    image: null,
    role: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    location: ""
  });

  const handelChange = (event) => {
    const { name, value, files } = event.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handelSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phone", formData.phone);
    data.append("role", formData.role);
    data.append("street", formData.street);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("pincode", formData.pincode);
    data.append("location", formData.location);

    // IMPORTANT: must match backend field name
    data.append("image", formData.image);

    axios
      axios.post(`${import.meta.env.VITE_API_URL}/user/createUser`, data)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>

        <form onSubmit={handelSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handelChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handelChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handelChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handelChange}
            required
          />

          <select name="role" value={formData.role} onChange={handelChange}>
            <option value="" hidden>Select Your Role</option>
            <option value="customer">Customer</option>
            <option value="provider">Provider</option>
          </select>

          <input type="file" name="image" onChange={handelChange} />

          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handelChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handelChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handelChange}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handelChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handelChange}
          />

          <button type="submit">Register</button>
        </form>

        <p onClick={() => navigate("/login")}>
          Already have account? Login
        </p>
      </div>
    </div>
  );
}

export default UserRegister;