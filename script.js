function cekPantun() {
  const pantun = document.getElementById("pantun-input").value;
  const hasilElement = document.getElementById("hasil");

  // Pisahkan bait menjadi baris-baris
  const baris = pantun.trim().split("\n");

  // Cek apakah terdiri dari 4 baris
  if (baris.length !== 4) {
    hasilElement.textContent = "Pantun harus terdiri dari 4 baris.";
    return;
  }

  // Fungsi untuk menghitung suku kata
  function hitungSukuKata(baris) {
    return baris.split(" ").reduce((total, kata) => {
      return total + kata.match(/[aeiouAEIOU]+/g).length;
    }, 0);
  }

  // Cek setiap baris memiliki 8-12 suku kata
  for (let i = 0; i < baris.length; i++) {
    const sukuKata = hitungSukuKata(baris[i]);
    if (sukuKata < 8 || sukuKata > 12) {
      hasilElement.textContent = `Baris ${
        i + 1
      } harus memiliki 8-12 suku kata (ditemukan ${sukuKata}).`;
      return;
    }
  }

  // Cek rima a-b-a-b
  function akhirKata(baris) {
    return baris.trim().split(" ").pop().toLowerCase();
  }

  // Fungsi untuk mendapatkan 2-3 huruf terakhir sebagai rima
  function ambilRima(kata) {
    return kata.slice(-2); // Ambil 3 huruf terakhir untuk lebih fleksibel
  }

  const rima1 = ambilRima(akhirKata(baris[0]));
  const rima2 = ambilRima(akhirKata(baris[1]));
  const rima3 = ambilRima(akhirKata(baris[2]));
  const rima4 = ambilRima(akhirKata(baris[3]));

  // Cek pola rima a-b-a-b (baris 1 dan 3 harus sama, baris 2 dan 4 harus sama)
  if (rima1 !== rima3 || rima2 !== rima4) {
    hasilElement.textContent = "Rima harus mengikuti pola a-b-a-b.";
    return;
  }

  hasilElement.textContent = "Pantun sesuai dengan syarat!";
  hasilElement.style.color = "green";
}
