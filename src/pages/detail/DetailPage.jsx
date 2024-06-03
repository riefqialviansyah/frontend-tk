import { confirmAlert, errAlert, successAlert } from "../../helpers/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./detail-page.scss";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export default function DetailPage() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const response = await fetch(`${baseUrl}/product/getOne/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (product) => {
    if (!(await confirmAlert(product.name)).isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/product/delete/${product.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        successAlert(data.message);
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

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="detail-page">
      <h3>Detail Produk</h3>
      <div className="box-detail">
        <div className="img-detail">
          <img src={product.image} alt="" />
        </div>
        <div className="detail-data">
          <div className="data-product">
            <h4>{product.name}</h4>
            <div className="detail-1">
              <span>{product.sku}</span>
              <span>|</span>
              <span>{product.weight} gr</span>
            </div>
            <div className="detail-price">
              <span>
                Rp. {product.price && product.price.toLocaleString("id-ID")},-
              </span>
            </div>
            <div className="description-product">
              <span>deskripsi produk:</span>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="btn-edit">
            <div className="btn-opsi-1">
              <button
                className="btn-kembali"
                onClick={() => {
                  navigate(`/`);
                }}
              >
                Kembali
              </button>
              <button
                onClick={() => {
                  navigate(`/update/${product.id}`);
                }}
              >
                Edit
              </button>
            </div>
            <button
              className="delete-btn"
              onClick={() => {
                handleDelete(product);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
