import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterForm } from "@/components/auth/registerForm/registerForm";
import { LoginForm } from "@/components/auth/loginForm/loginForm";
import { AuthLayout } from "@/layouts/authLayout";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<h1 className="">home</h1>} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
