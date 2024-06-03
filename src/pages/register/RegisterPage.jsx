import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { errAlert, successAlert } from "../../helpers/Alert";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.scss";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export default function RegisterPage() {
  const [inputUser, setInputUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlerChangeInput = (e) => {
    setInputUser({ ...inputUser, [e.target.name]: e.target.value });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputUser),
      });
      const data = await response.json();
      if (response.ok) {
        successAlert(data.message);
        setTimeout(() => {
          navigate("/login");
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
      <div className="register">
        <ToastContainer />
        <div className="box-register">
          <h3>Register</h3>
          <form>
            <input
              type="text"
              name="username"
              placeholder="Username..."
              onChange={handlerChangeInput}
            />
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
            <button onClick={registerHandler}>Register</button>
          </form>
          <div className="info-register">
            <p>
              already have account?{" "}
              <Link to={"/login"} className="to-register">
                login
              </Link>{" "}
              here..
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
