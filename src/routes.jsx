import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import InputProvider from "@app/context/InputContext";
import Navbar from "@app/ui/layouts/navbar";

import Home from "@pages/home";
import NotFound from "@app/pages/404";
import Register from "@pages/auth/register";
import Login from "@app/pages/auth/login";
import Verficiation from "@app/pages/auth/verification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const location = useLocation();

  const notAllowed = [
    "/auth/register",
    "/auth/login",
    "/auth/verify",
    "/auth/forget-password",
  ];
  const hideNav = notAllowed.includes(location.pathname);
  const queryClient = new QueryClient()
  return (
    <>
     <InputProvider>
      {!hideNav && <Navbar />}
      <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/verify" element={<Verficiation />} />
      </Routes>
      </QueryClientProvider>
     </InputProvider>
    </>
  );
}

export default App;
