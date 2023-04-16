import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  CreateProduct,
  Detail,
  EditProduct,
  Guest,
  Home,
  Login,
  Products,
  Protected,
  Register,
  Table,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/products" element={<Products />} />
      <Route element={<Protected />}>
        <Route path="/table" element={<Table />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/create" element={<CreateProduct />} />
      </Route>

      <Route element={<Guest />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
