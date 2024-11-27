import Loader from '../Loader/Loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

const SharedLayout = ({ children }) => {
  return (
    <main>
      <div className="container">
        <div className="pageContentWrapper">
          <Suspense fallback={<Loader />}>
            {children}
            <Outlet />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default SharedLayout;