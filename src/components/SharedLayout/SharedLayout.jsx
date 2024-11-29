import Loader from '../Loader/Loader';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

const SharedLayout = ({ children }) => {
  return (
    <main>
      <div className="container">
        <div className="pageContentWrapper">
        <Toaster position="top-center" />
      <Suspense fallback={<Loader />}>{children}</Suspense>
        </div>
      </div>
    </main>
  );
};

export default SharedLayout;