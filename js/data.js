const questionBank = [
    {
        id: 1,
        type: "multiple_choice",
        topic: "1.1 Begrüßung & Vorstellung",
        question: "Wie heißt du?",
        options: [
            "Ich heiße Anna",
            "Ich bin 20 Jahre alt",
            "Ich komme aus Indonesia",
            "Ich arbeite als Lehrer",
            "Ich habe einen Bruder"
        ],
        answer: 0,
        explanation: "Pertanyaan menanyakan nama, jadi jawabannya adalah 'Ich heiße...'",
        examples: ["Wie heißen Sie? (Formal)", "Mein Name ist Anna."]
    },
    {
        id: 2,
        type: "multiple_choice",
        topic: "1.1 Begrüßung & Vorstellung",
        question: "Wie geht es dir?",
        options: [
            "Ich bin müde",
            "Mir geht es gut, danke!",
            "Ich heiße Peter",
            "Tschüss",
            "Das ist ein Buch"
        ],
        answer: 1,
        explanation: "'Wie geht es dir?' menanyakan kabar. Respon yang umum adalah 'Mir geht es gut'.",
        examples: ["Wie geht es Ihnen? (Formal)", "Es geht mir sehr gut."]
    },
    {
        id: 3,
        type: "multiple_choice",
        topic: "1.1 Begrüßung & Vorstellung",
        question: "Woher kommst du?",
        options: [
            "Ich wohne in Berlin",
            "Ich komme aus Indonesien",
            "Ich bin Lehrer",
            "Guten Morgen",
            "Ich spreche Englisch"
        ],
        answer: 1,
        explanation: "'Woher' berarti 'dari mana'. 'kommst du' dari kata kommen. Jawabannya memakai 'aus'.",
        examples: ["Woher kommen Sie? (Formal)", "Ich komme aus Deutschland."]
    },
    {
        id: 4,
        type: "multiple_choice",
        topic: "1.1 Begrüßung & Vorstellung",
        question: "___ wohnst du?",
        options: [
            "Wer",
            "Wie",
            "Wo",
            "Was",
            "Wann"
        ],
        answer: 2,
        explanation: "Kata tanya untuk menanyakan tempat tinggal atau posisi (wohnen/berada) adalah 'Wo' (Di mana).",
        examples: ["Wo wohnen Sie? (Formal)", "Wo ist der Bahnhof? (Di mana stasiun?)"]
    },
    {
        id: 5,
        type: "multiple_choice",
        topic: "1.1 Begrüßung & Vorstellung",
        question: "Ucapan selamat pagi dalam bahasa Jerman adalah...",
        options: [
            "Gute Nacht",
            "Guten Tag",
            "Guten Morgen",
            "Guten Abend",
            "Auf Wiedersehen"
        ],
        answer: 2,
        explanation: "'Morgen' berarti pagi, jadi 'Guten Morgen' = Selamat pagi.",
        examples: ["Guten Tag (Selamat siang/hari)", "Guten Abend (Selamat malam)"]
    },
    {
        id: 6,
        type: "multiple_choice",
        topic: "2.4 Kalimat (Sätze)",
        question: "Manakah kalimat yang benar?",
        options: [
            "Ich liebe dich",
            "Ich dich liebe",
            "Liebe ich dich",
            "Dich liebe ich",
            "Ich lieben dich"
        ],
        answer: 0,
        explanation: "Dalam kalimat pernyataan (Aussagesatz), verb selalu berada di posisi kedua: Subject + Verb + Object.",
        examples: ["Ich lerne Deutsch. (Saya lerne bahasa Jerman)", "Er trinkt Wasser. (Dia minum air)"]
    },
    {
        id: 7,
        type: "multiple_choice",
        topic: "1.1 Begrüßung & Vorstellung",
        question: "Was machst du beruflich?",
        options: [
            "Ich bin 25 Jahre alt.",
            "Ich wohne in München.",
            "Ich bin Lehrer von Beruf.",
            "Mir geht es sehr gut.",
            "Ich komme aus Japan."
        ],
        answer: 2,
        explanation: "'Was machst du beruflich?' menanyakan tentang pekerjaan.",
        examples: ["Ich arbeite als Arzt.", "Ich bin Studentin."]
    },
    {
        id: 8,
        type: "multiple_choice",
        topic: "1.1 Begrüßung & Vorstellung",
        question: "Wie alt bist du?",
        options: [
            "Ich bin müde.",
            "Ich bin 20 Jahre alt.",
            "Ich komme aus der Schweiz.",
            "Ich heiße Michael.",
            "Ich spreche Deutsch."
        ],
        answer: 1,
        explanation: "'Wie alt' berarti berapa umur. Jawabannya menggunakan angka + 'Jahre alt'.",
        examples: ["Wie alt sind Sie? (Formal)", "Er ist 30 Jahre alt."]
    },
    {
        id: 9,
        type: "multiple_choice",
        topic: "1.1 Begrüßung & Vorstellung",
        question: "Welche Sprachen sprichst du?",
        options: [
            "Ich spreche Englisch und Deutsch.",
            "Ich bin in Spanien.",
            "Ich lerne heute.",
            "Ich arbeite als Koch.",
            "Mein Name ist Thomas."
        ],
        answer: 0,
        explanation: "'Welche Sprachen' berarti bahasa apa saja. Jawaban yang tepat menyebutkan nama bahasa.",
        examples: ["Ich spreche nur ein bisschen Deutsch.", "Sie spricht fließend Französisch."]
    },
    {
        id: 10,
        type: "multiple_choice",
        topic: "2.4 Kalimat (Sätze)",
        question: "Wer ist das?",
        options: [
            "Das ist ein Buch.",
            "Das ist mein Freund, Lukas.",
            "Das ist in Berlin.",
            "Das ist sehr gut.",
            "Das ist heute."
        ],
        answer: 1,
        explanation: "'Wer' berarti siapa, digunakan untuk menanyakan orang.",
        examples: ["Wer sind Sie?", "Das ist meine Familie."]
    },
    {
        id: 11,
        type: "short_answer",
        topic: "2.1 Verben",
        question: "Ich ___ (sein) Student.",
        answer: "bin",
        explanation: "Konjugasi 'sein' (to be) untuk subjek 'ich' adalah 'bin'.",
        examples: ["Du bist Student.", "Er ist Student."]
    },
    {
        id: 12,
        type: "short_answer",
        topic: "2.1 Verben",
        question: "Wir ___ (haben) ein Auto.",
        answer: "haben",
        explanation: "Konjugasi verb 'haben' (to have) untuk subjek 'wir' (kami) adalah 'haben' (infinitive).",
        examples: ["Ich habe ein Auto.", "Ihr habt ein Auto."]
    },
    {
        id: 13,
        type: "short_answer",
        topic: "2.1 Verben",
        question: "Du ___ (sprechen) sehr gut Deutsch.",
        answer: "sprichst",
        explanation: "Konjugasi verb 'sprechen' (berbicara) untuk subjek 'du' (kamu) adalah 'sprichst' (terjadi perubahan vokal e -> i).",
        examples: ["Ich spreche Deutsch.", "Er spricht Englisch."]
    },
    {
        id: 14,
        type: "short_answer",
        topic: "2.1 Verben",
        question: "Das ___ (sein) mein Buch.",
        answer: "ist",
        explanation: "'Das' (itu) merupakan subjek tunggal (orang ketiga tunggal), sehingga menggunakan 'ist' dari kata kerja 'sein'.",
        examples: ["Das ist ein Hund.", "Das sind meine Bücher. (Bentuk jamak, menggunakan sind)"]
    },
    {
        id: 15,
        type: "short_answer",
        topic: "2.1 Verben",
        question: "Er ___ (kommen) aus Spanien.",
        answer: "kommt",
        explanation: "Konjugasi verb düzenli 'kommen' untuk kata ganti orang ketiga tunggal 'er/sie/es', berakhiran '-t'.",
        examples: ["Ich komme...", "Wir kommen..."]
    },
    {
        id: 16,
        type: "short_answer",
        topic: "2.1 Verben",
        question: "Meine Mutter ___ (heißen) Maria.",
        answer: "heißt",
        explanation: "'Meine Mutter' adalah orang ketiga tunggal (sama dengan 'sie' / dia perempuan). Konjugasi 'heißen' berakhiran '-t'.",
        examples: ["Ich heiße...", "Wie heißt du?"]
    },
    {
        id: 17,
        type: "short_answer",
        topic: "2.1 Verben",
        question: "___ (sein) ihr müde?",
        answer: "Seid",
        explanation: "Konjugasi 'sein' untuk subjek jamak kedua 'ihr' (kalian) adalah 'seid'.",
        examples: ["Ihr seid sehr nett.", "Wir sind müde."]
    },
    {
        id: 18,
        type: "short_answer",
        topic: "2.1 Verben",
        question: "Was ___ (machen) du am Wochenende?",
        answer: "machst",
        explanation: "Konjugasi verb 'machen' (melakukan) untuk subjek 'du' adalah 'machst'.",
        examples: ["Er macht Hausaufgaben.", "Wir machen Sport."]
    },
    {
        id: 19,
        type: "short_answer",
        topic: "2.1 Verben",
        question: "Ich ___ (lernen) jeden Tag Deutsch.",
        answer: "lerne",
        explanation: "Konjugasi verb 'lernen' untuk subjek 'ich' menghapus 'n' sehingga berakhiran '-e'.",
        examples: ["Er lernt schnell.", "Lernst du auch Deutsch?"]
    },
    {
        id: 20,
        type: "short_answer",
        topic: "2.1 Verben",
        question: "Das Kind ___ (spielen) im Garten.",
        answer: "spielt",
        explanation: "'Das Kind' (anak itu) adalah subjek tunggal ('es'). Maka akhiran untuk verb 'spielen' adalah '-t'.",
        examples: ["Ich spiele Fußball.", "Wir spielen zusammen."]
    },
    {
        id: 21,
        type: "multiple_choice",
        topic: "1.1 Begrüßung & Vorstellung",
        question: "Was sind deine Hobbys?",
        options: [
            "Meine Hobbys sind Lesen und Schwimmen.",
            "Ich bin 20 Jahre alt.",
            "Ich habe ein Auto.",
            "Mir geht es gut.",
            "Ich trinke Wasser."
        ],
        answer: 0,
        explanation: "Jawaban yang tepat untuk pertanyaan hobi adalah daftar kegiatan (Lesen und Schwimmen).",
        examples: ["Mein Hobby ist Fußball spielen."]
    },
    {
        id: 22,
        type: "short_answer",
        topic: "1.1 Begrüßung & Vorstellung",
        question: "Mein Name ___ (sein) Lukas.",
        answer: "ist",
        explanation: "Konjugasi verb 'sein' untuk subjek tunggal ketiga (Mein Name) adalah 'ist'.",
        examples: ["Mein Name ist Anna."]
    },
    {
        id: 23,
        type: "short_answer",
        topic: "2.1 Verben",
        question: "Er ___ (haben) ein Buch.",
        answer: "hat",
        explanation: "Konjugasi verb 'haben' untuk orang ketiga tunggal 'er' adalah 'hat'.",
        examples: ["Sie hat eine Katze.", "Es hat Hunger."]
    },
    {
        id: 24,
        type: "multiple_choice",
        topic: "2.4 Kalimat (Sätze)",
        question: "Manakah kalimat tanya 'Ja/Nein' yang benar?",
        options: [
            "Du möchtest trinken?",
            "Möchtest du trinken?",
            "Trinken du möchtest?",
            "Möchtest trinken du?",
            "Du trinken möchtest?"
        ],
        answer: 1,
        explanation: "Dalam pertanyaan Ja/Nein (tanpa kata tanya), verb diletakkan di posisi pertama.",
        examples: ["Kommst du aus Italien?", "Hast du Zeit?"]
    },
    {
        id: 25,
        type: "multiple_choice",
        topic: "2.4 Kalimat (Sätze)",
        question: "Ich habe ____ Zeit.",
        options: [
            "nicht",
            "keine",
            "kein",
            "nichts",
            "nie"
        ],
        answer: 1,
        explanation: "Negasi untuk benda dengan artikel (seperti Zeit/waktu) menggunakan turunan kein. Karena 'Zeit' feminin, maka 'keine'.",
        examples: ["Ich habe kein Geld.", "Das ist keine Katze."]
    },
    {
        id: 26,
        type: "multiple_choice",
        topic: "2.4 Kalimat (Sätze)",
        question: "Das ist ____ mein Buch.",
        options: [
            "nicht",
            "keine",
            "kein",
            "nein",
            "nichts"
        ],
        answer: 0,
        explanation: "Negasi untuk kata ganti (possessivartikel seperti 'mein') menggunakan 'nicht'.",
        examples: ["Das ist nicht gut.", "Ich bin nicht müde."]
    },
    {
        id: 27,
        type: "short_answer",
        topic: "2.4 Kalimat (Sätze)",
        question: "___ (wo) wohnst du?",
        answer: "Wo",
        explanation: "W-Frage untuk menanyakan letak/tempat adalah 'Wo'.",
        examples: ["Wo ist der Bahnhof?", "Wo bist du?"]
    },
    {
        id: 28,
        type: "short_answer",
        topic: "2.4 Kalimat (Sätze)",
        question: "___ (wie) alt bist du?",
        answer: "Wie",
        explanation: "W-Frage untuk menanyakan umur atau kondisi menggunakan 'Wie'.",
        examples: ["Wie geht es dir?", "Wie heißt du?"]
    },
    {
        id: 29,
        type: "short_answer",
        topic: "2.4 Kalimat (Sätze)",
        question: "Ich trinke heute Wasser ___ (nicht / kein).",
        answer: "nicht",
        explanation: "Untuk menegasikan aktivitas atau kata kerja, gunakan 'nicht'. (Atau tidak sama sekali = kein Wasser)",
        examples: ["Ich schlafe heute nicht.", "Er kommt nicht."]
    },
    {
        id: 30,
        type: "short_answer",
        topic: "2.4 Kalimat (Sätze)",
        question: "Wir gehen ___ (nicht / kein) heute.",
        answer: "nicht",
        explanation: "Menggunakan 'nicht' untuk menegasikan kalimat atau verb (gehen).",
        examples: ["Das ist nicht richtig."]
    }
];

// Shuffle array
function shuffleQuestions(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}
