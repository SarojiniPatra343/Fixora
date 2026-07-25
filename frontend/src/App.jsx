import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Landing from "./components/Landing";
import AdminLayout from "./adminpages/AdminLayout";
import UserLayout from "./userpages/UserLayout";
import ProviderLayout from "./providerpages/ProviderLayout";

function App() {

  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>

        {!role && (
          <Route path="/*" element={<Landing />} />
        )}

        {role === "admin" && (
          <Route path="/*" element={<AdminLayout />} />
        )}

        {role === "customer" && (
          <Route path="/*" element={<UserLayout />} />
        )}

        {role === "provider" && (
          <>
            <Route path="/" element={<Navigate to="/provider" />} />
            <Route path="/provider/*" element={<ProviderLayout />} />
          </>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;