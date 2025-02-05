import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import InputProvider from "@app/context/InputContext";
import Navbar from "@app/ui/layouts/navbar";

import Home from "@pages/home";
import NotFound from "@app/pages/404";
import Register from "@pages/auth/register";
import Login from "@app/pages/auth/login";
import Verficiation from "@app/pages/auth/verification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Recovery from "@app/pages/auth/Password recovery";

function App() {
  const location = useLocation();

  const notAllowed = [
    "/auth/register",
    "/auth/login",
    "/auth/verify",
    "/auth/R-password",
  ];
  const hideNav = notAllowed.includes(location.pathname);
  return (
    <>
     <InputProvider>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/verify" element={<Verficiation />} />
        <Route path="/auth/R-password" element={<Recovery />} />
      </Routes>
     </InputProvider>
    </>
  );
}

export default App;
