import { useState, React, useEffect } from "react";
import { Nav } from "../../components";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const getProducts = async () => {
    try {
      const result = await axios.get(
        "https://api-project.amandemy.co.id/api/products"
      );

      setProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Nav />
      <section className="w-screen max-w-[1200px] p-3 mx-auto mt-20">
        <div className="flex justify-between items-center">
          <h3 className="text-sky-500 text-2xl font-bold">Catalog Products</h3>
          <input
            onChange={handleSearch}
            type="text"
            className="px-4 py-2 rounded-full border focus:outline-none focus:border-sky-200 focus:shadow-lg focus:shadow-sky-200"
            placeholder="Cari"
          />
        </div>
        {products.length <= 0 && (
          <div className=" p-10 flex justify-center items-center">
            <h1 className="text-3xl">Please wait...</h1>
          </div>
        )}
        {products.length > 0 && (
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-3">
            {products
              .filter((i) => {
                return search.toLowerCase() === ""
                  ? i
                  : i.name.toLowerCase().includes(search);
              })
              .map((item, index) => (
                <Link
                  to={`/detail/${item.id}`}
                  key={index}
                  className="bg-white drop-shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:shadow-sky-200 hover:-translate-y-1 duration-75"
                >
                  <div className="h-64">
                    <img
                      className="w-full h-full object-cover"
                      src={item.image_url}
                      alt="Baju Koko Bahan Linen"
                    />
                  </div>
                  <div className="p-3">
                    <h5 className="text-lg font-bold">{item.name}</h5>
                    {item.is_diskon ? (
                      <>
                        <p className="line-through">{item.harga_display}</p>
                        <p className="text-red-500 text-xl">
                          {item.harga_diskon_display}
                        </p>
                      </>
                    ) : (
                      <p className="text-xl">{item.harga_display}</p>
                    )}
                    <small className="text-sky-500">Stock: {item.stock}</small>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Products;
