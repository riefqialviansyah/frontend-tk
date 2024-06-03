import { HiOutlineHome, HiOutlinePlus, HiOutlineLogout } from "react-icons/hi";
import { fetchProducts } from "../../store/productSlice";
import { successAlert } from "../../helpers/Alert";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./bottombar.scss";

export default function BottonNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.clear();
    successAlert("Success logout!");
    setTimeout(() => {
      dispatch(setUser(""));
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="bottombar-component">
      <div
        className="bottombar-item"
        onClick={() => {
          navigate("/");
          dispatch(fetchProducts({}));
        }}
      >
        <HiOutlineHome /> <span>Home</span>
      </div>
      <div
        className="bottombar-item"
        onClick={() => {
          navigate("/add");
        }}
      >
        <HiOutlinePlus /> <span>Add</span>
      </div>
      <div className="bottombar-item" onClick={logoutHandler}>
        <HiOutlineLogout /> <span>Logout</span>
      </div>
    </div>
  );
}
