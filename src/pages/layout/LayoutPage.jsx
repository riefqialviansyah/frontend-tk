import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import emailjs from "@emailjs/browser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./layout-page.scss";
import BottonNavbar from "../../components/bottom navbar/Bottombar";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export default function LayoutPage() {
  const [isSendMail, setIsSendMail] = useState(false);
  const [inputEmail, setInputEmail] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [statusSendMail, setStatusSendMail] = useState("");

  const handleInputMail = (e) => {
    const { name, value } = e.target;
    setInputEmail({
      ...inputEmail,
      [name]: value,
    });
  };

  const submitEmail = (e) => {
    e.preventDefault();
    setIsSendMail(false);
  };

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(serviceId, publicKey, form.current, {
        publicKey: templateId,
      })
      .then(
        () => {
          setStatusSendMail("success");
          console.log("success");
        },
        () => {
          console.log("error");
          setStatusSendMail("failed");
        }
      );
  };

  return (
    <div className="layout-page">
      <ToastContainer />
      <nav>
        <Navbar />
      </nav>
      <main>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Outlet />
        </div>
        <div className="info">
          <h3>Hubungi Admin</h3>
          <div>
            <a href="https://github.com/riefqialviansyah" target="blank">
              <img src="./github.png" alt="github logo" />
            </a>
            <a
              href="https://www.linkedin.com/in/riefqialviansyah"
              target="blank"
            >
              <img src="./linkedin.png" alt="linkedin logo" />
            </a>
            {!isSendMail && (
              <img
                src="./gmail.png"
                alt="gmail logo"
                onClick={() => {
                  setIsSendMail(true);
                }}
              />
            )}
          </div>
          {isSendMail && (
            <form ref={form} onSubmit={sendEmail}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleInputMail}
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleInputMail}
              />
              <textarea
                name="message"
                id=""
                cols="30"
                rows="5"
                placeholder="Message here"
                onChange={handleInputMail}
              ></textarea>
              <button onClick={submitEmail}>Submit</button>
            </form>
          )}
          <div>
            {statusSendMail == "success" ? (
              <span>Success send email</span>
            ) : statusSendMail == "failed" ? (
              <span>Failed send email</span>
            ) : null}
          </div>
        </div>
      </main>
      <div className="bottombar">
        <BottonNavbar />
      </div>
    </div>
  );
}
