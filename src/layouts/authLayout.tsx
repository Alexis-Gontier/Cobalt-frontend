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
      <div className="flex flex-col gap-4 p-6 w-full md:p-10">
        <div className="flex justify-center gap-2 md:justify-start mt-4 w-full">
          <a
            href="#"
            className="flex flex-col items-center gap-2 font-medium w-full md:flex-row"
          >
            <img src="/logoNoBg.svg" alt="Logo" className="w-30 md:w-10" />
            <h1 className="text-4xl font-bold md:text-2xl">Cobalt</h1>
          </a>
        </div>
        <div className="flex mt-12 justify-center">
          <div className="w-full flex flex-col items-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
