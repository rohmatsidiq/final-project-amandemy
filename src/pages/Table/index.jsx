import { useState, React, useEffect } from "react";
import { Nav } from "../../components";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  MdCreateNewFolder,
  MdEditSquare,
  MdDeleteForever,
  MdCancel,
} from "react-icons/md";
import { BsFillCheckCircleFill, BsCheck2Circle } from "react-icons/bs";

function Table() {
  const [alertPopup, setAlertPopup] = useState(false);
  const [confirmDelete, SetConfirmDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const getProducts = async () => {
    try {
      const result = await axios.get(
        "https://api-project.amandemy.co.id/api/final/products",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showConfirm = (id) => {
    setIdDelete(id);
    SetConfirmDelete(true);
  };

  const handleDelete = () => {
    try {
      const response = axios.delete(
        `https://api-project.amandemy.co.id/api/products/${idDelete}`
      );
      SetConfirmDelete(false);
      setAlertPopup(true);
      getProducts();
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

  if (alertPopup) {
    setTimeout(() => {
      getProducts();
      setAlertPopup(false);
    }, 2000);
  }

  return (
    <div>
      {confirmDelete && (
        <div className="fixed top-0 z-50 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-9 px-10  rounded-2xl ">
            <h1 className="text-2xl">Yakin Hapus Produk?</h1>
            <div className="flex justify-around mt-5">
              <button
                onClick={() => {
                  SetConfirmDelete(false);
                }}
                className="bg-sky-500 text-white px-4 py-2 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-sky-200 flex gap-2 items-center"
              >
                <MdCancel className="text-3xl" />
                No
              </button>
              <button
                onClick={handleDelete}
                className="bg-sky-500 text-white px-4 py-2 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-sky-200 flex gap-2 items-center"
              >
                <BsFillCheckCircleFill className="text-2xl" />
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {alertPopup && (
        <div className="fixed top-0 bottom-0 z-50 w-screen min-h-screen bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-9 px-10  rounded-2xl ">
            <div className="mb-4">
              <BsCheck2Circle className="text-5xl mx-auto" />
            </div>
            <h1 className="text-2xl">Produk Berhasil Dihapus</h1>
          </div>
        </div>
      )}
      <Nav />
      {products.length <= 0 && (
        <div className="w-full h-screen flex justify-center items-center">
          <p className="text-center text-3xl">Please wait...</p>
        </div>
      )}
      {products.length > 0 && (
        <div className="mt-20 max-w-[1200px] mx-auto p-5">
          <h1 className="text-center text-3xl font-bold">Table Products</h1>
          <div className="flex justify-between">
            <input
              onChange={handleSearch}
              type="text"
              className="px-4 py-2 rounded-full border focus:outline-none focus:border-sky-200 focus:shadow-lg focus:shadow-sky-200"
              placeholder="Cari"
            />
            <Link
              to={"/create"}
              className="flex items-center gap-2 bg-sky-500 px-3 py-2 rounded-full text-white hover:scale-105 hover:shadow-md hover:shadow-sky-200"
            >
              <MdCreateNewFolder className="text-xl" />
              Create Product
            </Link>
          </div>
          <table className="w-full mt-3 bg-white shadow-lg">
            <thead className="text-center">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Nama</th>
                <th className="border p-2">Keaktifan Diskon</th>
                <th className="border p-2">Harga</th>
                <th className="border p-2">Harga Diskon</th>
                <th className="border p-2">Gambar</th>
                <th className="border p-2">Kategori</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody className="text-center ">
              {products
                .filter((i) => {
                  return search.toLowerCase() === ""
                    ? i
                    : i.name.toLowerCase().includes(search);
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">
                      {item.is_diskon ? "Aktif" : "Tidak Aktif"}
                    </td>
                    <td className="border p-2">{item.harga_display}</td>
                    <td className="border p-2">{item.harga_diskon_display}</td>
                    <td className="border p-2 flex justify-center items-start">
                      <div className="w-32 h-32 p-3 rounded-lg overflow-hidden ">
                        <img
                          className="w-full h-full object-cover"
                          src={item.image_url}
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="border p-2">{item.category}</td>
                    <td className="border p-2 text-center">
                      <Link to={`/edit/${item.id}`}>
                        <button className=" bg-yellow-500 text-white p-2 rounded-full hover:scale-105 m-1 hover:shadow-lg hover:shadow-yellow-200">
                          <MdEditSquare className="text-xl" />
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          return showConfirm(item.id);
                        }}
                        className=" bg-red-500 text-white p-2 rounded-full hover:scale-105 m-1 hover:shadow-lg hover:shadow-red-200"
                      >
                        <MdDeleteForever className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Table;
