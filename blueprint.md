Blueprint Aplikasi Latihan Soal Bahasa Jerman A1 (Updated)

🧩 Fitur Utama
1. 📝 Latihan Soal Dinamis
•	Soal dibuat otomatis oleh AI (tidak pernah sama) 
•	Jumlah soal per sesi: 10 soal 
•	Tipe soal: 
o	Pilihan ganda (5 opsi) 
o	Isian singkat 

2. 📊 Sistem Penilaian
•	Skor otomatis setelah selesai 
•	Skala nilai: 0 – 100 
•	Rumus:
skor = (jumlah_benar / total_soal) * 100

3. 📖 Pembahasan Soal
•	Setiap soal memiliki tombol: 👉 "Lihat Pembahasan" 
•	Berisi: 
o	Jawaban benar 
o	Penjelasan singkat 
o	Contoh tambahan 

4. 📈 Progress Belajar
•	Grafik perkembangan nilai 
•	Statistik: 
o	Nilai rata-rata 
o	Jumlah latihan 
o	Topik yang sering salah 

5. 🤖 AI Question Generator
•	Generate soal berdasarkan: 
o	Topik 
o	Tingkat kesulitan 
o	Riwayat user 

🧠 Struktur Materi

🗣️ 1. Percakapan & Topik Sehari-hari
1.1 Begrüßung & Vorstellung
•	Sapaan: Guten Morgen, Guten Tag, Guten Abend 
•	Perkenalan: Nama, Asal, Umur, Pekerjaan, Hobi 
1.2 Familie & Freunde
•	Anggota keluarga, Deskripsi sederhana 
1.3 Uhrzeiten & Tagesablauf
•	Menyebutkan jam, Rutinitas harian (aufstehen, arbeiten, schlafen)
1.4 Essen & Einkaufen
•	Memesan makanan, Belanja kebutuhan, Angka & harga 
1.5 Wohnung
•	Deskripsi tempat tinggal, Perabotan 
1.6 Wetter
•	Kondisi cuaca: sonnig, regnerisch 
1.7 Freizeit & Hobbys
•	Aktivitas: lesen, Sport treiben 

📚 2. Tata Bahasa (Grammatik)
2.1 Verben
•	Präsens (sein, haben, regular), Trennbare Verben, Modalverben (können, müssen, wollen, möchten), Perfekt (pengenalan) 
2.2 Kata Benda & Artikel
•	der, die, das, Plural, ein / eine, kein / keine 
2.3 Kasus (Fälle)
•	Nominatif, Akusatif, Preposisi (in, auf, an, für, mit)
2.4 Kalimat (Sätze)
•	Pernyataan, Pertanyaan (W-Fragen, Ja/Nein), Posisi kata kerja (V2), Negasi (nicht, kein)
2.5 Lainnya
•	Possessivartikel (mein, dein, Ihr), Zahlen (1–1.000.000), Preposisi waktu (am, um, im)

📖 3. Kosakata (Wortschatz)
•	Terintegrasi berdasarkan topik 
•	Sumber: Menschen A1, Schritte International Neu A1, Goethe-Institut 
•	Tips: Buat kalimat sederhana, Simulasi situasi nyata 

🧪 Struktur Soal

📌 Format Pilihan Ganda
{
  "type": "multiple_choice",
  "question": "Wie heißt du?",
  "options": [
    "Ich heiße Anna",
    "Ich bin 20 Jahre alt",
    "Ich komme aus Indonesia",
    "Ich arbeite als Lehrer",
    "Ich habe einen Bruder"
  ],
  "answer": 0,
  "explanation": "Pertanyaan menanyakan nama, jadi jawabannya adalah 'Ich heiße...'"
}

✏️ Format Isian Singkat
{
  "type": "short_answer",
  "question": "Ich ___ (sein) Student.",
  "answer": "bin",
  "explanation": "Konjugasi 'sein' untuk ich adalah 'bin'"
}

🖥️ Struktur Halaman Aplikasi
1. 🏠 Home
•	Pilih topik 
•	Mulai latihan 
•	Lihat progress 

2. 📝 Halaman Latihan
•	Progress bar (1/10) 
•	Soal ditampilkan satu per satu 
•	Tombol: Next, Submit 

3. 📊 Halaman Hasil
•	Skor akhir 
•	Tombol: Lihat pembahasan, Ulangi latihan 

4. 📖 Halaman Pembahasan
•	List semua soal 
•	Expand untuk melihat penjelasan 

5. 📈 Halaman Progress
•	Grafik nilai 
•	Statistik performa 

🧱 Arsitektur Sistem
Frontend
•	React / Flutter 
•	State management (Redux / Provider) 
Backend
•	Node.js / Django / Firebase 
AI Engine
•	Generate soal berbasis: Prompt template, Topik, Level A1 

🧩 Flow Pengguna
User pilih topik -> AI generate soal -> User mengerjakan (10 soal) -> Submit -> Hitung skor -> Tampilkan hasil + pembahasan -> Simpan ke progress

📊 Data Model (Sederhana)
User
{
  "id": "user_1",
  "name": "User",
  "progress": []
}
Attempt
{
  "score": 80,
  "date": "2026-03-27",
  "topic": "Grammatik"
}