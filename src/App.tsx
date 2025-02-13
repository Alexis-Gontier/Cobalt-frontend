import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterForm } from "@/components/auth/registerForm/registerForm";
import { LoginForm } from "@/components/auth/loginForm/loginForm";
import { AuthLayout } from "@/layouts/authLayout";
import MainLayout from "@/layouts/MainLayout";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
