import { Suspense } from "react";
import PropTypes from 'prop-types';
//import Loader from "../Loader/Loader.jsx";
import css from "./SharedLayout.module.css";

const SharedLayout = ({ children }) => {
  return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
};

SharedLayout.propTypes = {
    children: PropTypes.node.isRequired, 
};

export default SharedLayout;