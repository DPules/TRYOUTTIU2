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
    t: "2, 6, 7, 21, 22, 66, ....",
    p: ["67", "68", "70", "72", "75"],
    j: 0,
  },
  {
    t: "3, 5, 9, 17, 33, ....",
    p: ["49", "57", "60", "65", "69"],
    j: 3,
  },
  {
    t: "Jika semua anggota tim A disiplin dan sebagian anggota tim A adalah siswa, maka ....",
    p: [
      "Semua siswa disiplin",
      "Sebagian siswa disiplin",
      "Tidak ada siswa disiplin",
      "Semua siswa anggota tim A",
      "Tidak dapat disimpulkan",
    ],
    j: 1,
  },
  {
    t: "Nilai dari (48 : 6) × (5 + 7) − 20 adalah ....",
    p: ["60", "72", "76", "80", "96"],
    j: 2,
  },
  {
    t: "Jika x + 2y = 14 dan x = 6 maka nilai y adalah ....",
    p: ["2", "3", "4", "5", "6"],
    j: 2,
  },
  {
    t: "8, 12, 18, 26, 36, ....",
    p: ["44", "46", "48", "50", "52"],
    j: 2,
  },
  {
    t: "Semua dokter adalah sarjana. Sebagian sarjana adalah peneliti. Maka ....",
    p: [
      "Sebagian dokter peneliti",
      "Semua dokter peneliti",
      "Tidak ada dokter peneliti",
      "Sebagian dokter mungkin peneliti",
      "Semua peneliti dokter",
    ],
    j: 3,
  },
  {
    t: "Jika sebuah pekerjaan dapat diselesaikan 6 orang dalam 10 hari, maka 5 orang akan menyelesaikannya dalam .... hari",
    p: ["10", "11", "12", "13", "14"],
    j: 2,
  },
  {
    t: "A, D, H, M, S, ....",
    p: ["X", "Y", "Z", "W", "V"],
    j: 0,
  },
  {
    t: "Perbandingan umur Andi dan Budi adalah 3 : 5. Jika umur Andi 18 tahun, maka umur Budi adalah ....",
    p: ["25", "28", "30", "32", "35"],
    j: 2,
  },
  {
    t: "Jika hari ini Rabu, maka 75 hari lagi adalah ....",
    p: ["Kamis", "Jumat", "Sabtu", "Minggu", "Senin"],
    j: 0,
  },
  {
    t: "Nilai dari 2³ + 3³ + 4² adalah ....",
    p: ["35", "43", "51", "59", "67"],
    j: 1,
  },
  {
    t: "4, 9, 19, 39, 79, ....",
    p: ["120", "140", "159", "160", "162"],
    j: 2,
  },
  {
    t: "Jika semua A adalah B dan semua B adalah C maka ....",
    p: [
      "Sebagian A adalah C",
      "Semua A adalah C",
      "Tidak ada A adalah C",
      "Sebagian C adalah A",
      "Tidak dapat disimpulkan",
    ],
    j: 1,
  },
  {
    t: "Sebuah mobil menempuh jarak 240 km dalam 4 jam. Jika kecepatannya ditambah 20 km/jam, waktu yang diperlukan untuk menempuh jarak yang sama adalah ....",
    p: ["2 jam", "2,5 jam", "3 jam", "3,5 jam", "4 jam"],
    j: 2,
  },
  {
    t: "Deret huruf berikut: B, E, I, N, T, ....",
    p: ["Y", "Z", "X", "W", "V"],
    j: 0,
  },
  {
    t: "Jika harga sebuah barang setelah diskon 20% menjadi Rp80.000, maka harga sebelum diskon adalah ....",
    p: ["Rp90.000", "Rp95.000", "Rp100.000", "Rp110.000", "Rp120.000"],
    j: 2,
  },
  {
    t: "7, 14, 28, 56, 112, ....",
    p: ["124", "168", "196", "224", "256"],
    j: 3,
  },
  {
    t: "Semua atlet sehat. Tidak semua orang sehat adalah atlet. Maka ....",
    p: [
      "Semua orang sehat atlet",
      "Sebagian orang sehat bukan atlet",
      "Tidak ada atlet sehat",
      "Semua atlet bukan sehat",
      "Tidak dapat disimpulkan",
    ],
    j: 1,
  },
  {
    t: "Nilai dari √144 + √81 adalah ....",
    p: ["21", "22", "23", "24", "25"],
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
