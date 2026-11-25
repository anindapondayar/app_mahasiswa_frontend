import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";

export default function DataMahasiswa() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const ambilData = async () => {
    try {
      const res = await api.get("/mahasiswa");
      setData(res.data);
    } catch (err) {
      Swal.fire("Error", "Gagal mengambil data dari server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ambilData();
  }, []);

  const hapus = async (nim) => {
    const konfirmasi = await Swal.fire({
      title: "Hapus data?",
      text: `Mahasiswa dengan NIM ${nim} akan dihapus`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (!konfirmasi.isConfirmed) return;

    try {
      await api.delete(`/mahasiswa/${nim}`);
      Swal.fire("Berhasil", "Data telah dihapus", "success");
      ambilData();
    } catch (err) {
      Swal.fire("Error", "Gagal menghapus data", "error");
    }
  };

  if (loading) return <p className="text-center">Memuat data...</p>;

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-3">NIM</th>
            <th className="p-3">Nama</th>
            <th className="p-3">Alamat</th>
            <th className="p-3">Tgl Lahir</th>
            <th className="p-3">Jurusan</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                Belum ada data
              </td>
            </tr>
          )}
          {data.map((m) => (
            <tr key={m.nim} className="border-t">
              <td className="p-3">{m.nim}</td>
              <td className="p-3">{m.nama}</td>
              <td className="p-3">{m.alamat}</td>
              <td className="p-3">{m.tgl_lahir}</td>
              <td className="p-3">{m.jurusan}</td>
              <td className="p-3 text-center space-x-2">
                <Link
                  to={`/mahasiswa/edit/${m.nim}`}
                  className="bg-yellow-400 px-2 py-1 rounded text-white"
                >
                  Edit
                </Link>
                <button
                  onClick={() => hapus(m.nim)}
                  className="bg-red-500 px-2 py-1 rounded text-white"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
