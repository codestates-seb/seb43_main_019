import { useDispatch, useSelector } from "react-redux";

function requireLogin(component) {
  return function (props) {
    const userState = useSelector((state) => state.userReducer);
    const isLoggedIn = userState.login;

    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    } else {
      return <Component {...props} />;
    }
  };
}
