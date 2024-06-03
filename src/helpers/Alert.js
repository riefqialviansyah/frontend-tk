import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const errAlert = (message) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 2000,
  });
};

export const successAlert = (message) => {
  return toast.success(message, {
    position: "top-right",
  });
};

export const confirmAlert = (message) => {
  return Swal.fire({
    title: "Are you sure?",
    text: "Delete this item: " + message + "?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
};
