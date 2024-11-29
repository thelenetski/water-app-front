import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsSignedIn } from "../../redux/auth/selectors";

export default function PrivateRoute({
  component: Component,
  redirectTo = "/",
}) {
  const IsSignedIn = useSelector(selectIsSignedIn);

  return IsSignedIn ? Component : <Navigate to={redirectTo} />;
}
