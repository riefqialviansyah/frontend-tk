import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "./product-card.scss";

export default function ProductCard({ product, deleteProduct }) {
  const formatPrice = (price) => {
    return price.toLocaleString("id-ID");
  };
  const navigate = useNavigate();

  return (
    <div className="box">
      <div
        className="img"
        onClick={() => {
          navigate(`/detail/${product.id}`);
        }}
      >
        <img src={product.image || "https://via.placeholder.com/150"} alt="" />
        <div className="cover"></div>
      </div>
      <div className="data-item">
        <h4
          onClick={() => {
            navigate(`/detail/${product.id}`);
          }}
        >
          {product.name}
        </h4>
        <span className="category-name">{product.categoryName}</span>
        <span className="price">Rp. {formatPrice(product.price)},-</span>
      </div>
      <div className="data-action">
        <div
          className="action"
          onClick={() => {
            navigate(`/update/${product.id}`);
          }}
        >
          <HiOutlinePencil />
          Edit
        </div>
        <div
          className="action"
          onClick={() => {
            deleteProduct(product);
          }}
        >
          <HiOutlineTrash />
          Delete
        </div>
      </div>
    </div>
  );
}
