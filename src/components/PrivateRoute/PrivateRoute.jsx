import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsSignedIn } from "../../redux/auth/selectors";

export default function PrivateRoute({ component, redirectTo }) {
  const IsSignedIn = useSelector(selectIsSignedIn);

  return IsSignedIn ? component : <Navigate to={redirectTo} />;
}
