import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmAlert, errAlert, successAlert } from "../../helpers/Alert";
import ProductCard from "../../components/product card/ProductCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
import "./home-page.scss";

export default function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.listProduct);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pageNumber = searchParams.get("page[number]");
  const search = searchParams.get("search");

  const handlerPagination = (e) => {
    let url = `/?page[number]=${e.target.value}`;
    if (search) {
      url += `&search=${search}`;
    }
    navigate(url);
    dispatch(fetchProducts({ pageNumber: e.target.value, search }));
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
        dispatch(fetchProducts({}));
      } else {
        errAlert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts({ pageNumber, search }));
  }, []);

  return (
    <div className="home-page">
      <ToastContainer />
      <h1>Hallo bos, ini barang-barang di toko kamu...</h1>
      <div className="data">
        {products.data &&
          products.data.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              deleteProduct={handleDelete}
            />
          ))}
      </div>
      <div className="pagination">
        {products.totalPage ? (
          Array(products.totalPage)
            .fill()
            .map((_, index) => index + 1)
            .map((page) => {
              return (
                <input
                  type="button"
                  onClick={handlerPagination}
                  value={page}
                  key={page}
                />
              );
            })
        ) : (
          <div className="warning">
            Anda tidak login atau data tidak ditemukan
          </div>
        )}
      </div>
    </div>
  );
}
