const API_URL =
  "https://script.google.com/macros/s/AKfycbzBcco1PFPknGebmk2NSlp1gm-1PQRHT9Scwz8TiNtksMeZ46Nx3FXQwxd8lur3UOVR/exec";
const perHalaman = 3;
let waktu = 1200;

let halaman = 0;
let timer;
let waktuHabis = false;
let sudahSubmit = false;
let jawaban = {};

const soal = [
  {
    t: 'Sinonim kata "AKURAT" adalah ....',
    p: ["Cepat", "Tepat", "Rinci", "Cermat", "Lengkap"],
    j: 1,
  },
  {
    t: 'Antonim kata "ABSTRAK" adalah ....',
    p: ["Konkret", "Nyata", "Umum", "Ilmiah", "Luas"],
    j: 0,
  },
  {
    t: "Pedas : Cabai = Manis : ...",
    p: ["Gula", "Madu", "Teh", "Sirup", "Buah"],
    j: 0,
  },
  {
    t: "Hasil dari 45 − (18 : 3) × 4 adalah ....",
    p: ["9", "15", "21", "27", "33"],
    j: 2,
  },
  {
    t: "Jika 12 siswa dapat menyelesaikan tugas dalam 10 hari, maka 8 siswa akan menyelesaikan tugas yang sama dalam ... hari.",
    p: ["12", "14", "15", "18", "20"],
    j: 2,
  },
  {
    t: "Lanjutkan deret angka: 1, 4, 9, 16, 25, ...",
    p: ["30", "32", "35", "36", "49"],
    j: 3,
  },
  {
    t: "Z, X, U, Q, L, ...",
    p: ["H", "I", "J", "K", "M"],
    j: 0,
  },
  {
    t: "Jika x = 4 dan y = 6, maka nilai dari 3x + 2y adalah ....",
    p: ["18", "20", "22", "24", "26"],
    j: 2,
  },
  {
    t: "Semua pegawai disiplin. Sebagian pegawai adalah atlet. Kesimpulan yang tepat adalah ....",
    p: [
      "Semua atlet disiplin",
      "Sebagian atlet disiplin",
      "Semua disiplin atlet",
      "Tidak ada atlet disiplin",
      "Tidak dapat disimpulkan",
    ],
    j: 1,
  },
  {
    t: "Jika hari ini hari Sabtu, maka 100 hari kemudian adalah hari ....",
    p: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
    j: 2,
  },
  {
    t: "Sebuah persegi memiliki keliling 48 cm. Panjang sisi persegi tersebut adalah ....",
    p: ["10", "11", "12", "13", "14"],
    j: 2,
  },
  {
    t: "Air : Haus = Makanan : ...",
    p: ["Lapar", "Kenyang", "Lezat", "Gizi", "Sehat"],
    j: 0,
  },
  {
    t: "Nilai dari 2³ + 3² − 5 adalah ....",
    p: ["8", "10", "12", "14", "16"],
    j: 1,
  },
  {
    t: "Jika sebuah mobil menempuh jarak 180 km dalam 3 jam, maka kecepatan mobil tersebut adalah ... km/jam.",
    p: ["40", "50", "60", "70", "80"],
    j: 2,
  },
  {
    t: "Pilih pasangan kata yang hubungannya SAMA dengan: Dokter : Pasien",
    p: [
      "Guru : Murid",
      "Petani : Sawah",
      "Nelayan : Laut",
      "Pilot : Pesawat",
      "Koki : Dapur",
    ],
    j: 0,
  },
  {
    t: "Lanjutkan deret angka: 5, 11, 19, 29, ...",
    p: ["37", "39", "41", "43", "45"],
    j: 3,
  },
  {
    t: "Jika semua A adalah B dan sebagian B adalah C, maka ...",
    p: [
      "Semua A adalah C",
      "Sebagian A mungkin C",
      "Semua C adalah A",
      "Tidak ada A yang C",
      "Tidak dapat ditarik kesimpulan",
    ],
    j: 1,
  },
  {
    t: "Jam menunjukkan pukul 09.00. Sudut terkecil antara jarum jam adalah ....",
    p: ["45°", "60°", "90°", "120°", "135°"],
    j: 2,
  },
  {
    t: "Jika peluang hujan hari ini adalah 0,2 maka peluang tidak hujan adalah ....",
    p: ["0,2", "0,4", "0,6", "0,8", "1"],
    j: 3,
  },
  {
    t: "Rudi lebih berat dari Tono, tetapi lebih ringan dari Bayu. Maka ...",
    p: [
      "Bayu paling berat",
      "Tono paling berat",
      "Rudi paling berat",
      "Tono lebih berat dari Bayu",
      "Tidak dapat disimpulkan",
    ],
    j: 0,
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
