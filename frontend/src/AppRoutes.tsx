import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout>Home Page</Layout>} />
      <Route path="/user-profile" element={<h1>User Profile Page</h1>} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

export default AppRoutes;