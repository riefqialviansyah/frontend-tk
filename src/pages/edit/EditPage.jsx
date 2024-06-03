import { errAlert, successAlert } from "../../helpers/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export default function EditPage() {
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
  const params = useParams();

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
      const response = await fetch(`${baseUrl}/product/update/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(inputUser),
      });

      const data = await response.json();
      if (response.ok) {
        successAlert(data.message);
      } else {
        errAlert(data.message);
      }
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const response = await fetch(`${baseUrl}/product/getOne/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setInputUser({
        name: data.data.name,
        categoryName: data.data.categoryName,
        sku: data.data.sku,
        weight: data.data.weight,
        image: data.data.image,
        price: data.data.price,
        description: data.data.description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="add-page">
      <ToastContainer />
      <h1>Edit produk anda</h1>
      <form>
        <table>
          <tr>
            <td>Nama</td>
            <td>
              :{" "}
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={inputUser.name}
              />
            </td>
          </tr>
          <tr>
            <td>Category</td>
            <td>
              :{" "}
              <input
                type="text"
                name="categoryName"
                onChange={handleChange}
                value={inputUser.categoryName}
              />
            </td>
          </tr>
          <tr>
            <td>Kode SKU</td>
            <td>
              :{" "}
              <input
                type="text"
                name="sku"
                onChange={handleChange}
                value={inputUser.sku}
              />
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
              :{" "}
              <input
                type="text"
                name="image"
                onChange={handleChange}
                value={inputUser.image}
              />
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
                  name="description"
                  id=""
                  cols="30"
                  rows="10"
                  onChange={handleChange}
                  value={inputUser.description}
                >
                  {inputUser.description}
                </textarea>
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
