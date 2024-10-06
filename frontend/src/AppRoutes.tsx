import { Navigate, Route, Routes } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/user-profile" element={<h1>User Profile Page</h1>} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

export default AppRoutes;