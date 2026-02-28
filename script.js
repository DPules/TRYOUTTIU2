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
    t: "Merah + Kuning menghasilkan warna ....",
    p: ["Hijau", "Oranye", "Ungu", "Coklat", "Biru"],
    j: 1,
  },
  {
    t: "Api : Panas = Es : ....",
    p: ["Air", "Beku", "Dingin", "Cair", "Basah"],
    j: 2,
  },
  {
    t: "Sepatu : Kaki = Sarung tangan : ....",
    p: ["Tangan", "Dingin", "Jari", "Kulit", "Baju"],
    j: 0,
  },
  {
    t: "3, 6, 9, 12, ....",
    p: ["14", "15", "16", "18", "20"],
    j: 1,
  },
  {
    t: "5, 10, 20, 40, ....",
    p: ["60", "70", "80", "90", "100"],
    j: 2,
  },
  {
    t: "A, C, E, G, ....",
    p: ["H", "I", "J", "K", "L"],
    j: 1,
  },
  {
    t: "Jika semua siswa harus disiplin dan Andi adalah siswa, maka ....",
    p: [
      "Andi belum tentu disiplin",
      "Andi disiplin",
      "Andi tidak disiplin",
      "Andi bukan siswa",
      "Tidak dapat disimpulkan",
    ],
    j: 1,
  },
  {
    t: "1 lusin sama dengan ....",
    p: ["10", "12", "14", "15", "20"],
    j: 1,
  },
  {
    t: "Jam menunjukkan pukul 03.00. Sudut jarum jam adalah ....",
    p: ["45°", "90°", "120°", "150°", "180°"],
    j: 1,
  },
  {
    t: "Jika 1 hari = 24 jam, maka 3 hari = .... jam",
    p: ["48", "60", "72", "84", "96"],
    j: 2,
  },
  {
    t: "Mobil : Roda = Pesawat : ....",
    p: ["Sayap", "Mesin", "Pilot", "Bandara", "Udara"],
    j: 0,
  },
  {
    t: "Air dipanaskan akan ....",
    p: ["Membeku", "Menguap", "Mengeras", "Mencair", "Menghilang"],
    j: 1,
  },
  {
    t: "10, 9, 8, 7, ....",
    p: ["6", "5", "4", "3", "2"],
    j: 0,
  },
  {
    t: "Jika harga 1 buku Rp2.000, maka harga 5 buku adalah ....",
    p: ["Rp8.000", "Rp9.000", "Rp10.000", "Rp11.000", "Rp12.000"],
    j: 2,
  },
  {
    t: "Padi : Beras : Nasi = Gandum : Tepung : ....",
    p: ["Roti", "Kue", "Mie", "Biskuit", "Donat"],
    j: 0,
  },
  {
    t: "2, 4, 8, 16, ....",
    p: ["18", "20", "24", "32", "36"],
    j: 3,
  },
  {
    t: "Jika hari ini Senin, maka 2 hari lagi adalah ....",
    p: ["Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    j: 1,
  },
  {
    t: "Burung : Terbang = Ikan : ....",
    p: ["Berenang", "Melompat", "Berjalan", "Menyelam", "Terbang"],
    j: 0,
  },
  {
    t: "Benda yang tidak termasuk kelompoknya adalah ....",
    p: ["Meja", "Kursi", "Lemari", "Piring", "Rak"],
    j: 3,
  },
  {
    t: "Jika 20 : 4 = 5 maka 30 : 5 = ....",
    p: ["5", "6", "7", "8", "9"],
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
