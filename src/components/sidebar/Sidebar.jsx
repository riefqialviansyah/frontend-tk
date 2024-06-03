import { HiOutlineHome, HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../store/productSlice";
import { useDispatch } from "react-redux";
import "./sidebar.scss";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="sidebar-component">
      <div
        className="sidebar-item"
        onClick={() => {
          navigate("/");
          dispatch(fetchProducts({}));
        }}
      >
        <HiOutlineHome /> <span>List Produk</span>
      </div>
      <div
        className="sidebar-item"
        onClick={() => {
          navigate("/add");
        }}
      >
        <HiOutlinePlus /> <span>Tambah</span>
      </div>
    </div>
  );
}
