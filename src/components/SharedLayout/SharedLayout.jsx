import { Suspense } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import { Outlet } from 'react-router-dom';

const SharedLayout = ({ children }) => {
  return (
      <main>
        <Suspense fallback={<Loader />}>
          {children || <Outlet />} 
        </Suspense>
      </main>
  );
};

SharedLayout.propTypes = {
  children: PropTypes.node,
};

export default SharedLayout;
