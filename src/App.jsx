import { lazy, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Layout } from "./components/Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors.js";
import { refreshUser } from "./redux/auth/operations.js";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage.jsx"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage.jsx"));
// const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage.jsx"));

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <RestrictedRoute component={<SignUpPage />} redirectTo="/tracker" />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute component={<SignInPage />} redirectTo="/tracker" />
          }
        />
        <Route
          path="/tracker"
          element={
            <PrivateRoute component={<TrackerPage />} redirectTo="/signin" />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
