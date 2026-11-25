import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">
          Data Mahasiswa
        </Link>
        <Link
          to="/mahasiswa/tambah"
          className="bg-white text-blue-600 px-3 py-1 rounded font-medium hover:bg-blue-50"
        >
          + Tambah
        </Link>
      </div>
    </nav>
  );
}
