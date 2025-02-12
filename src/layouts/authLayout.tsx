import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/illustre_auth.avif"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <h1 className="text-2xl font-bold">Cobalt</h1>
          </a>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <div className="w-full flex flex-col items-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
