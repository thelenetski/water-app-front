import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }) => {
  return (
    <div>
      <Suspense fallback={null}>{children}</Suspense>
      <Toaster />
    </div>
  );
};
