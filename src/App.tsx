import { lazy } from "react";
import { Routes, Route } from "react-router";

import PrivateRoute from "src/components/privateroute";
import Login from "src/pages/login/login";
import Register from "src/pages/register/register";
import Error from "src/pages/error";
const Chat = lazy(() => import("src/pages/chat/chat"));

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute redirect="/login" />}>
        <Route element={<Chat />} path="/" />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
