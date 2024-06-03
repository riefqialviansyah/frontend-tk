import { useNavigate } from "react-router-dom";
import { successAlert } from "../../helpers/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import "./drop-down.scss";

export default function DropDown() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.clear();
    successAlert("Success logout!");
    setTimeout(() => {
      navigate("/login");
      dispatch(setUser(""));
    }, 2000);
  };

  return (
    <div className="drop-down-component">
      <ul>
        <li className="development">{user ? user : "Username"}</li>
        <li className="development">Profile</li>
        <li onClick={logoutHandler}>Logout</li>
      </ul>
    </div>
  );
}
