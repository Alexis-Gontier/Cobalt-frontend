import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegisterForm } from "@/components/auth/registerForm/registerForm";
import { LoginForm } from "@/components/auth/loginForm/loginForm";
import { AuthLayout } from "@/layouts/authLayout";
import MainLayout from "@/layouts/MainLayout";
import ProductScroll from "@/components/products/ProductsScroll";
import ProductById from "@/components/products/ProductById";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<ProductScroll />} />
          <Route path="/product/" element={<Navigate to={"/"} />} />
          <Route path="/product/:id" element={<ProductById />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="/auth/login" />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
