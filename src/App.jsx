import { lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Layout } from "./components/Layout.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage.jsx"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage.jsx"));
// const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage.jsx"));

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
           <Route
            path="/signup"
            element={
              <RestrictedRoute
                component={<SignUpPage />}
                redirectTo="/tracker"
              />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute
                component={<SignInPage />}
                redirectTo="/tracker"
              />
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
    </div>
  );
}

export default App;
