
function hitungPembayaran() {
    // Mengambil data pelanggan
    let nama = document.getElementById("namaPelanggan").value;
    let uang = Number(document.getElementById("uangBayar").value);

    let menu = document.querySelectorAll(".jumlah");
    let subtotal = 0;
    let daftarPesanan = "";
    let adaPesanan = false;

    // Memeriksa jumlah setiap menu
    for (let i = 0; i < menu.length; i++) {
        let jumlah = Number(menu[i].value);
        let harga = Number(menu[i].dataset.harga);
        let namaMenu = menu[i].dataset.nama;

        if (jumlah > 0) {
            let totalMenu = jumlah * harga;
            subtotal += totalMenu;
            adaPesanan = true;

            daftarPesanan += `
                <div class="pesanan_baris">
                    <span>${namaMenu} x${jumlah}</span>
                    <strong>Rp${totalMenu.toLocaleString("id-ID")}</strong>
                </div>
            `;
        }
    }

    // Validasi pesanan
    if (!adaPesanan) {
        alert("Pilih minimal satu menu!");
        return;
    }

    if (uang <= 0 || !Number.isFinite(uang)) {
        alert("Masukkan uang pembayaran yang benar!");
        return;
    }

    // Menghitung diskon
    let diskon = 0;
    let persenDiskon = 0;

    if (subtotal >= 100000) {
        persenDiskon = 20;
    } else if (subtotal >= 50000) {
        persenDiskon = 10;
    }

    diskon = subtotal * persenDiskon / 100;

    let totalBayar = subtotal - diskon;

    // Menampilkan ringkasan pesanan
    document.getElementById("daftarPesanan").innerHTML = daftarPesanan;
    document.getElementById("hasilSubtotal").textContent =
        "Rp" + subtotal.toLocaleString("id-ID");

    document.getElementById("labelDiskon").textContent =
        "Diskon (" + persenDiskon + "%)";

    document.getElementById("hasilDiskon").textContent =
        "Rp" + diskon.toLocaleString("id-ID");

    document.getElementById("hasilTotal").textContent =
        "Rp" + totalBayar.toLocaleString("id-ID");

    document.getElementById("hasilUang").textContent =
        "Rp" + uang.toLocaleString("id-ID");

    // Memeriksa uang pembayaran
    let pesan = document.getElementById("pesanPembayaran");

    if (uang < totalBayar) {
        document.getElementById("hasilKembalian").textContent = "-";
        pesan.textContent = "Uang pembayaran tidak mencukupi!";
        pesan.className = "pesan_pembayaran gagal";
    } else {
        let kembalian = uang - totalBayar;

        document.getElementById("hasilKembalian").textContent =
            "Rp" + kembalian.toLocaleString("id-ID");

        pesan.textContent = "Pembayaran berhasil. Terima kasih!";
        pesan.className = "pesan_pembayaran berhasil";
    }

    // Menampilkan hasil perhitungan
    document.getElementById("hasil").hidden = false;
}

// Menjalankan fungsi saat tombol diklik
document.getElementById("btnHitung").addEventListener("click", hitungPembayaran);
