import { HiCubeTransparent, HiDotsHorizontal } from "react-icons/hi";
import { fetchProducts } from "../../store/productSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./navbar.scss";
import DropDown from "../drop down/DropDown";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    navigate(`/?search=${search}`);
    dispatch(fetchProducts({ search }));
  };

  return (
    <div className="navbar">
      <div className="logo">
        <div>
          <HiCubeTransparent /> <span>Toko</span>
        </div>
      </div>
      {location.pathname != "/login" && location.pathname != "/register" ? (
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button onClick={handleSearch}>Cari</button>
        </div>
      ) : (
        ""
      )}
      {location.pathname != "/login" && location.pathname != "/register" ? (
        <div className="option">
          <HiDotsHorizontal
            className="btn-drop-down"
            onClick={() => {
              setShowDropDown(!showDropDown);
            }}
          />
          {showDropDown && <DropDown className="drop-down" />}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
