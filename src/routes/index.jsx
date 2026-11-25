import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import DataMahasiswa from "../pages/mahasiswa/DataMahasiswa";
import FormMahasiswa from "../pages/mahasiswa/FormMahasiswa";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DataMahasiswa />} />
          <Route path="/mahasiswa/tambah" element={<FormMahasiswa />} />
          <Route path="/mahasiswa/edit/:nim" element={<FormMahasiswa />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
