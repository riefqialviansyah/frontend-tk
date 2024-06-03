import { errAlert, successAlert } from "../../helpers/Alert";
import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { setUser } from "../../store/userSlice";
import "react-toastify/dist/ReactToastify.css";
import "./login.scss";
import { useDispatch } from "react-redux";

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export default function LoginPage() {
  const [inputUser, setInputUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerChangeInput = (e) => {
    setInputUser({ ...inputUser, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputUser),
      });
      const data = await response.json();

      if (response.ok) {
        successAlert(data.message);
        localStorage.setItem("token", `${data.data.token}`);
        dispatch(setUser(data.data.username));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        errAlert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <ToastContainer />
        <div className="box-login">
          <h3>Login</h3>
          <form>
            <input
              type="text"
              name="email"
              placeholder="Email..."
              onChange={handlerChangeInput}
            />
            <input
              type="password"
              name="password"
              placeholder="Password.."
              onChange={handlerChangeInput}
            />
            <button onClick={loginHandler}>Login</button>
          </form>
          <div className="info-register">
            <p>
              dont have account?{" "}
              <Link to={"/register"} className="to-register">
                register
              </Link>{" "}
              here..
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
