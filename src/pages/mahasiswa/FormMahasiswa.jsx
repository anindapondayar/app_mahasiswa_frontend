import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";

const kosong = { nim: "", nama: "", alamat: "", tgl_lahir: "", jurusan: "" };

export default function FormMahasiswa() {
  const { nim } = useParams(); // ada = mode edit, tidak ada = mode tambah
  const navigate = useNavigate();
  const [form, setForm] = useState(kosong);

  useEffect(() => {
    if (nim) {
      api
        .get(`/mahasiswa/${nim}`)
        .then((res) => setForm(res.data))
        .catch(() => Swal.fire("Error", "Data tidak ditemukan", "error"));
    }
  }, [nim]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (nim) {
        await api.put(`/mahasiswa/${nim}`, form);
      } else {
        await api.post("/mahasiswa", form);
      }
      await Swal.fire("Berhasil", "Data tersimpan", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.pesan || err.message, "error");
    }
  };

  const input = "w-full border rounded px-3 py-2";

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">
        {nim ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">NIM</label>
          <input
            name="nim"
            value={form.nim}
            onChange={handleChange}
            disabled={!!nim}
            required
            className={`${input} disabled:bg-gray-100`}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Nama</label>
          <input name="nama" value={form.nama} onChange={handleChange} required className={input} />
        </div>
        <div>
          <label className="block text-sm mb-1">Alamat</label>
          <textarea name="alamat" value={form.alamat} onChange={handleChange} className={input} />
        </div>
        <div>
          <label className="block text-sm mb-1">Tanggal Lahir</label>
          <input type="date" name="tgl_lahir" value={form.tgl_lahir} onChange={handleChange} className={input} />
        </div>
        <div>
          <label className="block text-sm mb-1">Jurusan</label>
          <input name="jurusan" value={form.jurusan} onChange={handleChange} className={input} />
        </div>

        <div className="flex gap-2 pt-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Simpan
          </button>
          <button type="button" onClick={() => navigate("/")} className="bg-gray-300 px-4 py-2 rounded">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
