const API_URL =
  "https://script.google.com/macros/s/AKfycbxdo9U5auaAoMLFOoY7zov8GKwlBsfqvinXtNk47aVBz4EBzp4qySdDvVHaLPhUzQrzrg/exec";
const perHalaman = 1;
let waktu = 1800;

let halaman = 0;
let timer;
let waktuHabis = false;
let sudahSubmit = false;
let jawaban = {};

const soal = [
  {
    t: "Kritik : Evaluasi = Diagnosis : ....",
    p: ["Analisis", "Pemeriksaan", "Pengobatan", "Penyakit", "Terapi"],
    j: 2,
  },
  {
    t: "Fotosintesis : Tumbuhan = Respirasi : ....",
    p: ["Manusia", "Hewan", "Makhluk hidup", "Oksigen", "Sel"],
    j: 2,
  },
  {
    t: "Konstitusi : Negara = Anggaran Dasar : ....",
    p: ["Organisasi", "Perusahaan", "Pemerintah", "Rakyat", "Lembaga"],
    j: 0,
  },
  {
    t: "Baterai : Energi = Paru-paru : ....",
    p: ["Udara", "Oksigen", "Pernapasan", "Darah", "Hidup"],
    j: 1,
  },

  /* ================= DERET ANGKA (POLA KOMBINASI) ================= */

  {
    t: "2, 5, 11, 23, 47, ....",
    p: ["90", "92", "94", "95", "97"],
    j: 3,
  },
  {
    t: "4, 6, 9, 13, 18, ....",
    p: ["22", "23", "24", "25", "26"],
    j: 2,
  },
  {
    t: "3, 9, 8, 24, 23, 69, ....",
    p: ["66", "67", "68", "70", "72"],
    j: 1,
  },
  {
    t: "1, 4, 10, 19, 31, ....",
    p: ["40", "42", "44", "46", "48"],
    j: 1,
  },

  /* ================= LOGIKA (SILOGISME BERTINGKAT) ================= */

  {
    t: "Semua mahasiswa rajin. Sebagian mahasiswa atlet. Semua atlet disiplin. Maka ....",
    p: [
      "Sebagian mahasiswa disiplin",
      "Semua mahasiswa disiplin",
      "Tidak ada mahasiswa disiplin",
      "Semua disiplin mahasiswa",
      "Tidak dapat disimpulkan",
    ],
    j: 0,
  },
  {
    t: "Semua A adalah B. Sebagian B adalah C. Sebagian C adalah D. Maka ....",
    p: [
      "Sebagian A adalah D",
      "A mungkin D",
      "Semua A adalah D",
      "Tidak ada A adalah D",
      "Tidak dapat disimpulkan",
    ],
    j: 1,
  },
  {
    t: "Jika lampu menyala maka listrik aktif. Listrik aktif. Maka ....",
    p: [
      "Lampu pasti menyala",
      "Lampu mungkin menyala",
      "Lampu tidak menyala",
      "Listrik tidak aktif",
      "Tidak dapat disimpulkan",
    ],
    j: 1,
  },
  {
    t: "Semua pegawai disiplin. Tidak semua disiplin tepat waktu. Maka ....",
    p: [
      "Semua pegawai tepat waktu",
      "Sebagian pegawai tidak tepat waktu",
      "Tidak ada pegawai tepat waktu",
      "Semua tepat waktu pegawai",
      "Tidak dapat disimpulkan",
    ],
    j: 4,
  },

  /* ================= ARITMATIKA (MULTI STEP) ================= */

  {
    t: "Nilai dari (36 ÷ 6) × (8 + 4) − 10 adalah ....",
    p: ["50", "56", "60", "62", "66"],
    j: 2,
  },
  {
    t: "Jika 3x + 2 = 20 maka nilai x adalah ....",
    p: ["4", "5", "6", "7", "8"],
    j: 2,
  },
  {
    t: "Harga sebuah barang setelah diskon 25% adalah Rp150.000. Harga sebelum diskon adalah ....",
    p: ["Rp180.000", "Rp190.000", "Rp200.000", "Rp210.000", "Rp220.000"],
    j: 2,
  },
  {
    t: "Sebuah mobil menempuh 180 km dalam 3 jam. Jika kecepatannya bertambah 20 km/jam, waktu untuk menempuh jarak yang sama adalah ....",
    p: ["1,8 jam", "2 jam", "2,25 jam", "2,5 jam", "3 jam"],
    j: 2,
  },

  /* ================= PENALARAN KUANTITATIF & PENGETAHUAN DASAR ================= */

  {
    t: "Jika peluang hujan hari ini 0,3 maka peluang tidak hujan adalah ....",
    p: ["0,3", "0,5", "0,6", "0,7", "0,8"],
    j: 3,
  },
  {
    t: "Sudut terkecil antara jarum jam pada pukul 04.00 adalah ....",
    p: ["90°", "100°", "110°", "120°", "130°"],
    j: 3,
  },
  {
    t: "Jumlah sudut dalam segitiga adalah ....",
    p: ["90°", "120°", "180°", "270°", "360°"],
    j: 2,
  },
  {
    t: "Bilangan prima setelah 29 adalah ....",
    p: ["30", "31", "33", "35", "37"],
    j: 1,
  },
];

function mulaiUjian() {
  if (!nama.value || !sekolah.value || !daerah.value)
    return alert("Lengkapi data!");

  localStorage.setItem("nama", nama.value);
  localStorage.setItem("gender", gender.value);
  localStorage.setItem("sekolah", sekolah.value);
  localStorage.setItem("tinggibadan", tinggibadan.value);
  localStorage.setItem("beratbadan", beratbadan.value);
  localStorage.setItem("daerah", daerah.value);

  document.querySelector(".info").classList.add("hidden");
  document.querySelector(".timer").classList.remove("hidden");
  document.querySelector(".progress-box").classList.remove("hidden");
  navSoal.classList.remove("hidden");
  quizForm.classList.remove("hidden");

  mulaiTimer();
  tampilkan();
}

function mulaiTimer() {
  timer = setInterval(() => {
    waktu--;
    time.textContent = `${Math.floor(waktu / 60)}:${String(waktu % 60).padStart(2, "0")}`;
    if (waktu <= 0) {
      waktuHabis = true;
      clearInterval(timer);
      alert("Waktu habis, jawaban dikirim otomatis.");
      kirim();
    }
  }, 1000);
}

function tampilkan() {
  window.scrollTo(0, 0);
  soalContainer.innerHTML = "";
  const start = halaman * perHalaman;

  soal.slice(start, start + perHalaman).forEach((x, i) => {
    const idx = start + i;
    soalContainer.innerHTML += `
    <div class="question">
      <p>${idx + 1}. ${x.t}</p>
      ${x.p
        .map(
          (a, j) => `
        <label>
          <input type="radio" name="q${idx}" value="${j}"
            ${jawaban[idx] === j ? "checked" : ""}>
          ${a}
        </label>`,
        )
        .join("")}
    </div>`;
  });

  nextBtn.textContent =
    start + perHalaman >= soal.length ? "Selesai" : "Berikutnya ➡";

  autoSave();
  updateProgress();
  buatNavigasi();
}

function autoSave() {
  document.querySelectorAll("input[type=radio]").forEach((r) => {
    r.onchange = () => (jawaban[+r.name.replace("q", "")] = +r.value);
  });
}

function berikutnya() {
  if ((halaman + 1) * perHalaman >= soal.length) kirim();
  else {
    halaman++;
    tampilkan();
  }
}

function sebelumnya() {
  if (halaman > 0) {
    halaman--;
    tampilkan();
  }
}

function semuaTerjawab() {
  for (let i = 0; i < soal.length; i++) if (jawaban[i] === undefined) return i;
  return -1;
}

function kirim() {
  if (sudahSubmit) return;

  if (!waktuHabis) {
    const kosong = semuaTerjawab();
    if (kosong !== -1) {
      alert(`Soal ${kosong + 1} belum dijawab`);
      halaman = Math.floor(kosong / perHalaman);
      tampilkan();
      return;
    }

    if (!confirm("Yakin ingin mengakhiri ujian dan mengirim jawaban?")) return;
  }

  sudahSubmit = true;
  clearInterval(timer);
  nextBtn.disabled = true;
  nextBtn.textContent = "Mengirim...";

  let benar = 0;
  soal.forEach((s, i) => jawaban[i] === s.j && benar++);
  const nilai = Math.round((benar / soal.length) * 100);

  localStorage.setItem("nilai", nilai);
  localStorage.setItem("jawabanUser", JSON.stringify(jawaban));
  localStorage.setItem("bankSoal", JSON.stringify(soal));

  const fd = new FormData();
  fd.append("nama", localStorage.getItem("nama"));
  fd.append("gender", localStorage.getItem("gender"));
  fd.append("sekolah", localStorage.getItem("sekolah"));
  fd.append("tinggibadan", localStorage.getItem("tinggibadan"));
  fd.append("beratbadan", localStorage.getItem("beratbadan"));
  fd.append("daerah", localStorage.getItem("daerah"));
  fd.append("nilai", nilai);

  fetch(API_URL, { method: "POST", body: fd }).finally(
    () => (location.href = "hasil.html"),
  );
}

function updateProgress() {
  const j = Object.keys(jawaban).length;
  progressBar.style.width = `${(j / soal.length) * 100}%`;
  progressText.textContent = `${j} / ${soal.length}`;
}

function buatNavigasi() {
  navSoal.innerHTML = "";
  soal.forEach((_, i) => {
    const b = document.createElement("button");
    b.textContent = i + 1;
    if (jawaban[i] !== undefined) b.classList.add("answered");
    if (Math.floor(i / perHalaman) === halaman) b.classList.add("active");
    b.onclick = () => {
      halaman = Math.floor(i / perHalaman);
      tampilkan();
    };
    navSoal.appendChild(b);
  });
}
