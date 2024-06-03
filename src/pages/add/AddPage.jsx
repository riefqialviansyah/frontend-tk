import { errAlert, successAlert } from "../../helpers/Alert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./add-page.scss";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export default function AddPage() {
  const [inputUser, setInputUser] = useState({
    name: "",
    categoryName: "",
    sku: "",
    weight: 0,
    image: "",
    price: 0,
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputUser({
      ...inputUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputUser.price == 0 || inputUser.price[0] == "0") {
      errAlert("Harga tidak boleh kosong!");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/product/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(inputUser),
      });

      const data = await response.json();
      if (response.ok) {
        successAlert(data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        errAlert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-page">
      <ToastContainer />
      <h1>Tambah produk anda</h1>
      <form>
        <table>
          <tr>
            <td>Nama</td>
            <td>
              : <input type="text" name="name" onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>Category</td>
            <td>
              :{" "}
              <input type="text" name="categoryName" onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>Kode SKU</td>
            <td>
              : <input type="text" name="sku" onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>Berat</td>
            <td>
              :{" "}
              <input
                type="number"
                name="weight"
                value={inputUser.weight}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Link gambar</td>
            <td>
              : <input type="text" name="image" onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>Harga</td>
            <td>
              :{" "}
              <input
                type="number"
                name="price"
                value={inputUser.price}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Deskripsi</td>
            <td className="description">
              :
              <div>
                {" "}
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  onChange={handleChange}
                ></textarea>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="btn-save">
              <button onClick={handleSubmit}>Save</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}
