import { Route, Routes } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";

function Landing() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/register" element={<UserRegister />} />
            </Routes>
        </>
    )
}
export default Landing;