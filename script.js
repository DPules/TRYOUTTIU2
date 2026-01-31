const API_URL =
  "https://script.google.com/macros/s/AKfycbzBcco1PFPknGebmk2NSlp1gm-1PQRHT9Scwz8TiNtksMeZ46Nx3FXQwxd8lur3UOVR/exec";
const perHalaman = 3;
let waktu = 1800;

let halaman = 0;
let timer;
let waktuHabis = false;
let sudahSubmit = false;
let jawaban = {};

const soal = [
  {
    t: "Mobil : Bensin = Manusia : ...",
    p: ["Pakaian", "Tidur", "Makanan", "Napas", "Tenaga"],
    j: 2
  },
  {
    t: "Guru : Sekolah = Dokter : ...",
    p: ["Pasien", "Rumah", "Rumah Sakit", "Obat", "Perawat"],
    j: 2
  },
  {
    t: "Semua Paskibraka harus sehat. Andi adalah Paskibraka. Maka ...",
    p: ["Andi belum tentu sehat", "Andi sehat", "Andi sakit", "Andi atlet", "Tidak dapat disimpulkan"],
    j: 1
  },
  {
    t: "Hasil dari 18 − 6 × 2 + 4 adalah ....",
    p: ["4", "6", "10", "14", "16"],
    j: 2
  },
  {
    t: "Jika 5 orang menyelesaikan pekerjaan dalam 12 hari, maka 10 orang menyelesaikan pekerjaan yang sama dalam ... hari.",
    p: ["4", "5", "6", "8", "10"],
    j: 2
  },
  {
    t: "Lanjutkan deret angka berikut: 2, 5, 9, 14, 20, ...",
    p: ["25", "26", "27", "28", "30"],
    j: 2
  },
  {
    t: "A, C, F, J, O, ...",
    p: ["T", "U", "V", "W", "X"],
    j: 1
  },
  {
    t: "Jika ▲ = 3, ○ = 5, dan ■ = 7, maka ▲ + ○ × ■ = ...",
    p: ["38", "40", "42", "44", "46"],
    j: 2
  },
  {
    t: "Semua siswa rajin. Sebagian siswa adalah atlet. Kesimpulan yang tepat adalah ...",
    p: [
      "Semua atlet rajin",
      "Sebagian atlet rajin",
      "Semua rajin adalah atlet",
      "Tidak ada atlet yang rajin",
      "Tidak dapat disimpulkan"
    ],
    j: 1
  },
  {
    t: "Jika hari ini hari Senin, maka 17 hari kemudian adalah hari ...",
    p: ["Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    j: 2
  },
  {
    t: "Lanjutkan deret angka: 100, 95, 85, 70, ...",
    p: ["50", "55", "60", "65", "75"],
    j: 2
  },
  {
    t: "Buku : Membaca = Pisau : ...",
    p: ["Tajam", "Dapur", "Memotong", "Besi", "Bahaya"],
    j: 2
  },
  {
    t: "Hasil dari (−12) + 4 × 5 − 8 adalah ....",
    p: ["0", "2", "4", "6", "8"],
    j: 2
  },
  {
    t: "Jika 3 kg beras seharga Rp36.000, maka harga 5 kg beras adalah ...",
    p: [
      "Rp50.000",
      "Rp55.000",
      "Rp60.000",
      "Rp65.000",
      "Rp70.000"
    ],
    j: 2
  },
  {
    t: "Pilih pasangan kata yang HUBUNGANNYA SAMA dengan: Panas : Api",
    p: [
      "Terang : Matahari",
      "Asap : Api",
      "Air : Hujan",
      "Hitam : Arang",
      "Basah : Air"
    ],
    j: 0
  },
  {
    t: "Lanjutkan pola: 1, 1, 2, 3, 5, 8, ...",
    p: ["11", "12", "13", "14", "15"],
    j: 2
  },
  {
    t: "Jika semua A adalah B dan semua B adalah C, maka ...",
    p: [
      "Sebagian A adalah C",
      "Semua A adalah C",
      "Sebagian C adalah A",
      "Tidak ada A yang C",
      "Tidak dapat disimpulkan"
    ],
    j: 1
  },
  {
    t: "Jam menunjukkan pukul 03.15. Sudut antara jarum jam adalah ...",
    p: ["0°", "7,5°", "15°", "22,5°", "30°"],
    j: 3
  },
  {
    t: "Jika 8 mesin menghasilkan 400 barang dalam 5 jam, maka 4 mesin menghasilkan 200 barang dalam ... jam.",
    p: ["5", "6", "7", "8", "10"],
    j: 0
  },
  {
    t: "Anton lebih tinggi dari Budi, Budi lebih tinggi dari Candra. Maka ...",
    p: [
      "Candra lebih tinggi dari Anton",
      "Anton paling pendek",
      "Anton lebih tinggi dari Candra",
      "Budi paling tinggi",
      "Tidak dapat disimpulkan"
    ],
    j: 2
  }

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
