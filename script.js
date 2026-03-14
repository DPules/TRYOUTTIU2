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
    t: "5, 9, 17, 33, ...",
    p: ["49", "57", "65", "97"],
    j: 2,
  },
  {
    t: "2, 4, 8, 16, ...",
    p: ["20", "24", "30", "32"],
    j: 3,
  },
  {
    t: "Jika x + 5 = 12 maka x = ...",
    p: ["5", "6", "7", "8"],
    j: 2,
  },
  {
    t: "20% dari 250 adalah ...",
    p: ["40", "45", "50", "55"],
    j: 2,
  },
  {
    t: "Jika 3 pekerja menyelesaikan pekerjaan dalam 12 hari, maka 6 pekerja menyelesaikan dalam ...",
    p: ["3 hari", "4 hari", "5 hari", "6 hari"],
    j: 3,
  },
  {
    t: "Semua siswa rajin belajar. Andi adalah siswa. Kesimpulan:",
    p: [
      "Andi tidak rajin",
      "Andi rajin belajar",
      "Andi kadang rajin",
      "Tidak dapat disimpulkan",
    ],
    j: 1,
  },
  {
    t: "Dokter : Pasien = Guru : ...",
    p: ["Sekolah", "Murid", "Buku", "Pelajaran"],
    j: 1,
  },
  {
    t: "Besar : Raksasa = Kecil : ...",
    p: ["Mini", "Pendek", "Sedikit", "Tipis"],
    j: 0,
  },
  {
    t: "2, 6, 18, 54, ...",
    p: ["108", "162", "216", "324"],
    j: 1,
  },
  {
    t: "15 + 25 × 2 = ...",
    p: ["65", "80", "90", "100"],
    j: 0,
  },
  {
    t: "Jika p = 4 dan q = 3 maka 2p + 3q = ...",
    p: ["17", "18", "19", "20"],
    j: 0,
  },
  {
    t: "8, 12, 18, 26, ...",
    p: ["34", "36", "38", "40"],
    j: 1,
  },
  {
    t: "Sinonim kata 'AKURAT' adalah ...",
    p: ["Cepat", "Tepat", "Lambat", "Kasar"],
    j: 1,
  },
  {
    t: "Antonim kata 'OPTIMIS' adalah ...",
    p: ["Pesimis", "Rajin", "Percaya", "Bahagia"],
    j: 0,
  },
  {
    t: "Jika semua A adalah B dan semua B adalah C maka ...",
    p: [
      "Semua C adalah A",
      "Semua A adalah C",
      "Sebagian C adalah A",
      "Tidak dapat disimpulkan",
    ],
    j: 1,
  },
  {
    t: "12, 24, 48, 96, ...",
    p: ["120", "144", "192", "200"],
    j: 2,
  },
  {
    t: "1, 3, 6, 10, 15, ...",
    p: ["20", "21", "22", "24"],
    j: 1,
  },
  {
    t: "Jika 5 buku harganya Rp25.000 maka harga 1 buku adalah ...",
    p: ["4000", "5000", "6000", "7000"],
    j: 1,
  },
  {
    t: "Kuda : Lari = Burung : ...",
    p: ["Terbang", "Melompat", "Berjalan", "Menyelam"],
    j: 0,
  },
  {
    t: "Sinonim kata 'CEPAT' adalah ...",
    p: ["Lambat", "Kilat", "Pelan", "Diam"],
    j: 1,
  },
  {
    t: "7, 14, 28, 56, ...",
    p: ["84", "96", "112", "120"],
    j: 2,
  },
  {
    t: "Jika 10 orang menyelesaikan pekerjaan dalam 5 hari, maka 5 orang menyelesaikan dalam ...",
    p: ["8 hari", "10 hari", "12 hari", "15 hari"],
    j: 1,
  },
  {
    t: "Semua bunga indah. Mawar adalah bunga. Kesimpulan:",
    p: [
      "Mawar tidak indah",
      "Mawar indah",
      "Mawar kadang indah",
      "Tidak dapat disimpulkan",
    ],
    j: 1,
  },
  {
    t: "Air : Haus = Makan : ...",
    p: ["Kenyang", "Lapar", "Minum", "Tidur"],
    j: 1,
  },
  {
    t: "3, 5, 9, 17, 33, ...",
    p: ["49", "57", "65", "81"],
    j: 2,
  },
  {
    t: "Jika 2x = 16 maka x = ...",
    p: ["6", "7", "8", "9"],
    j: 2,
  },
  {
    t: "25% dari 400 adalah ...",
    p: ["50", "75", "100", "125"],
    j: 2,
  },
  {
    t: "1, 4, 7, 10, ...",
    p: ["12", "13", "14", "15"],
    j: 1,
  },
  {
    t: "Sinonim 'CERDAS' adalah ...",
    p: ["Pintar", "Bodoh", "Lambat", "Malas"],
    j: 0,
  },
  {
    t: "Antonim 'TINGGI' adalah ...",
    p: ["Pendek", "Besar", "Kecil", "Panjang"],
    j: 0,
  },
  {
    t: "6, 11, 16, 21, ...",
    p: ["24", "25", "26", "27"],
    j: 2,
  },
  {
    t: "Jika 4x = 20 maka x = ...",
    p: ["4", "5", "6", "7"],
    j: 1,
  },
  {
    t: "Semua dokter pintar. Budi dokter. Maka ...",
    p: [
      "Budi tidak pintar",
      "Budi pintar",
      "Budi mungkin pintar",
      "Tidak dapat disimpulkan",
    ],
    j: 1,
  },
  {
    t: "Besi : Keras = Kapas : ...",
    p: ["Ringan", "Berat", "Padat", "Kasar"],
    j: 0,
  },
  {
    t: "5, 10, 20, 40, ...",
    p: ["60", "70", "80", "90"],
    j: 2,
  },
  {
    t: "Jika jarak 180 km ditempuh 3 jam maka kecepatan adalah ...",
    p: ["40", "50", "60", "70"],
    j: 2,
  },
  {
    t: "2, 5, 10, 17, ...",
    p: ["24", "25", "26", "27"],
    j: 2,
  },
  {
    t: "Sinonim 'SULIT' adalah ...",
    p: ["Mudah", "Sukar", "Cepat", "Ringan"],
    j: 1,
  },
  {
    t: "Antonim 'MAJU' adalah ...",
    p: ["Depan", "Mundur", "Naik", "Turun"],
    j: 1,
  },
  {
    t: "3, 6, 12, 24, ...",
    p: ["36", "42", "48", "54"],
    j: 2,
  },
  {
    t: "Jika x + y = 12 dan x = 7 maka y = ...",
    p: ["3", "4", "5", "6"],
    j: 2,
  },
  {
    t: "1, 2, 4, 7, 11, ...",
    p: ["15", "16", "17", "18"],
    j: 1,
  },
  {
    t: "Guru : Sekolah = Dokter : ...",
    p: ["Rumah", "Rumah sakit", "Pasien", "Obat"],
    j: 1,
  },
  {
    t: "Sinonim 'INDAH' adalah ...",
    p: ["Buruk", "Cantik", "Kotor", "Gelap"],
    j: 1,
  },
  {
    t: "Antonim 'RAMAI' adalah ...",
    p: ["Sepi", "Bising", "Banyak", "Padat"],
    j: 0,
  },
  {
    t: "4, 9, 16, 25, ...",
    p: ["30", "35", "36", "40"],
    j: 2,
  },
  {
    t: "Jika 8 pekerja menyelesaikan pekerjaan dalam 6 hari maka 4 pekerja menyelesaikan dalam ...",
    p: ["10 hari", "12 hari", "14 hari", "16 hari"],
    j: 1,
  },
  {
    t: "2, 3, 5, 8, 13, ...",
    p: ["18", "19", "20", "21"],
    j: 3,
  },
  {
    t: "Semua ikan hidup di air. Lele adalah ikan. Kesimpulan:",
    p: [
      "Lele hidup di air",
      "Lele hidup di darat",
      "Lele tidak hidup",
      "Tidak dapat disimpulkan",
    ],
    j: 0,
  },
  {
    t: "Sinonim 'BESAR' adalah ...",
    p: ["Agung", "Kecil", "Pendek", "Tipis"],
    j: 0,
  },
  {
    t: "Antonim 'PANAS' adalah ...",
    p: ["Dingin", "Hangat", "Kering", "Basah"],
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
