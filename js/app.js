// State Variables
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Gemini API setup
const GEMINI_API_KEY = "AIzaSyDR0LWoAMLWyO1Kka1NHeb6INiCeCC-QSk";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// DOM Elements
const views = {
    home: document.getElementById('home-view'),
    quiz: document.getElementById('quiz-view'),
    result: document.getElementById('result-view'),
    progress: document.getElementById('progress-view')
};

const modals = {
    review: document.getElementById('review-modal')
};

// Buttons
const btnStart = document.getElementById('btn-start');
const btnHistory = document.getElementById('btn-history');
const btnNext = document.getElementById('btn-next');
const btnReview = document.getElementById('btn-review');
const btnRestart = document.getElementById('btn-restart');
const btnHome = document.getElementById('btn-home');
const btnCloseProgress = document.getElementById('btn-close-progress');
const closeReview = document.getElementById('close-review');
const selectQuizType = document.getElementById('quiz-type');
const selectTopic = document.getElementById('topic-select');
const aiToggle = document.getElementById('ai-toggle');
const loadingOverlay = document.getElementById('loading-overlay');

// Quiz Elements
const questionText = document.getElementById('question-text');
const questionTranslation = document.getElementById('question-translation');
const optionsContainer = document.getElementById('options-container');
const shortAnswerContainer = document.getElementById('short-answer-container');
const shortAnswerInput = document.getElementById('short-answer-input');
const btnSpeak = document.getElementById('btn-speak');
const currentQSpan = document.getElementById('current-question');
const progressBar = document.getElementById('progress-bar');
const finalScore = document.getElementById('final-score');
const correctCount = document.getElementById('correct-count');
const wrongCount = document.getElementById('wrong-count');
const reviewList = document.getElementById('review-list');

const statAvg = document.getElementById('stat-avg');
const statTotal = document.getElementById('stat-total');
const statWeakTopic = document.getElementById('stat-weak-topic');
let progressChartInstance = null;

// Navigation
function switchView(viewName) {
    Object.values(views).forEach(v => {
        v.classList.remove('active');
        setTimeout(() => v.classList.add('hidden'), 300); // Wait for transition
    });
    
    setTimeout(() => {
        views[viewName].classList.remove('hidden');
        // allow DOM reflow
        void views[viewName].offsetWidth;
        views[viewName].classList.add('active');
    }, 300);
}

function showModal(modalName) {
    modals[modalName].classList.remove('hidden');
}

function hideModal(modalName) {
    modals[modalName].classList.add('hidden');
}

// App Logic
async function startQuiz() {
    const selectedType = selectQuizType.value;
    const selectedTopic = selectTopic.value;
    
    if (aiToggle.checked) {
        loadingOverlay.classList.remove('hidden');
        
        const loadingTimer = document.getElementById('loading-timer');
        let timeLeft = 10;
        loadingTimer.textContent = `⏱️ ${timeLeft} detik`;
        
        const timerInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                loadingTimer.textContent = `⏱️ ${timeLeft} detik`;
            } else {
                loadingTimer.textContent = `⏱️ Menyelesaikan proses...`;
            }
        }, 1000);
        
        const aiQuestions = await generateQuestionsWithAI(selectedTopic, selectedType);
        
        clearInterval(timerInterval);
        
        if (aiQuestions && aiQuestions.length >= 1) {
            loadingTimer.textContent = '✅ Berhasil memuat soal!';
            currentQuestions = aiQuestions.slice(0, 10);
            if(currentQuestions.length < 10) {
               const needed = 10 - currentQuestions.length;
               const backup = shuffleQuestions(questionBank).slice(0, needed);
               currentQuestions = [...currentQuestions, ...backup];
            }
            
            // Memberikan waktu sebentar untuk menampilkan pesan berhasil 
            // menutupi proses delay transisi switchView
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
                loadingTimer.textContent = '';
            }, 800);
            
        } else {
            loadingOverlay.classList.add('hidden');
            loadingTimer.textContent = '';
            alert("Gagal terhubung ke AI Generator atau respons salah. Menggunakan soal lokal statis sebagai cadangan.");
            fallbackToStatic(selectedTopic, selectedType);
        }
    } else {
        fallbackToStatic(selectedTopic, selectedType);
    }
    
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    switchView('quiz');
    loadQuestion();
}

function fallbackToStatic(selectedTopic, selectedType) {
    let filteredQuestions = [...questionBank];
    
    if (selectedTopic !== 'all') {
        filteredQuestions = filteredQuestions.filter(q => q.topic === selectedTopic);
    }
    
    if (selectedType !== 'mixed') {
        filteredQuestions = filteredQuestions.filter(q => q.type === selectedType);
    }
    
    const shuffled = shuffleQuestions(filteredQuestions);
    currentQuestions = shuffled.slice(0, 10);
    
    if (currentQuestions.length < 10) {
        const needed = 10 - currentQuestions.length;
        const remainingQuestions = questionBank.filter(q => !currentQuestions.some(cq => cq.id === q.id));
        const shuffledRemaining = shuffleQuestions(remainingQuestions).slice(0, needed);
        currentQuestions = shuffleQuestions([...currentQuestions, ...shuffledRemaining]);
    }
}

function loadQuestion() {
    btnNext.disabled = true;
    
    if (currentQuestionIndex === currentQuestions.length - 1) {
        btnNext.textContent = 'Submit';
    } else {
        btnNext.textContent = 'Next';
    }
    
    shortAnswerInput.value = '';
    shortAnswerInput.classList.remove('correct', 'wrong');
    shortAnswerInput.disabled = false;
    
    const q = currentQuestions[currentQuestionIndex];
    questionText.innerHTML = q.question;
    
    if (q.question_translation) {
        questionTranslation.textContent = q.question_translation;
        questionTranslation.classList.remove('hidden');
    } else {
        questionTranslation.classList.add('hidden');
    }
    
    currentQSpan.textContent = currentQuestionIndex + 1;
    progressBar.style.width = `${((currentQuestionIndex + 1) / 10) * 100}%`;
    
    optionsContainer.innerHTML = '';
    
    if (q.type === 'short_answer') {
        optionsContainer.classList.add('hidden');
        shortAnswerContainer.classList.remove('hidden');
        btnNext.disabled = false;
    } else {
        shortAnswerContainer.classList.add('hidden');
        optionsContainer.classList.remove('hidden');
        
        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = opt;
            btn.onclick = () => selectOption(index, btn);
            optionsContainer.appendChild(btn);
        });
    }
}

function selectOption(index, btnSelected) {
    // Disable all options
    const options = document.querySelectorAll('.option-btn');
    options.forEach(btn => btn.disabled = true);
    
    const q = currentQuestions[currentQuestionIndex];
    const isCorrect = index === q.answer;
    
    // Save user answer
    userAnswers.push({
        question: q.question,
        userAnswerText: q.options[index],
        correctAnswerText: q.options[q.answer],
        isCorrect: isCorrect,
        explanation: q.explanation,
        examples: q.examples || []
    });

    if(isCorrect) {
        score++;
        btnSelected.classList.add('correct');
    } else {
        btnSelected.classList.add('wrong');
        options[q.answer].classList.add('correct'); // Show correct answer
    }
    
    btnNext.disabled = false;
}

function nextQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    if (q.type === 'short_answer' && !shortAnswerInput.disabled) {
        const userAnswer = shortAnswerInput.value.trim();
        const isCorrect = userAnswer.toLowerCase() === q.answer.toLowerCase();
        
        userAnswers.push({
            question: q.question,
            userAnswerText: userAnswer || '(Kosong)',
            correctAnswerText: q.answer,
            isCorrect: isCorrect,
            explanation: q.explanation,
            examples: q.examples || []
        });

        if (isCorrect) score++;
    }

    currentQuestionIndex++;
    if(currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    // Calculate final score
    const totalQ = currentQuestions.length;
    const finalScoreValue = (score / totalQ) * 100;
    
    finalScore.textContent = Math.round(finalScoreValue);
    correctCount.textContent = score;
    wrongCount.textContent = totalQ - score;
    
    // Animate score circle
    const degree = (finalScoreValue / 100) * 360;
    document.querySelector('.score-circle').style.setProperty('--score-deg', degree);

    // Save history with wrong topics
    const wrongTopics = [];
    userAnswers.forEach(ans => {
        if (!ans.isCorrect) {
            const qObj = currentQuestions.find(q => q.question === ans.question);
            if(qObj) wrongTopics.push(qObj.topic);
        }
    });

    saveHistory(Math.round(finalScoreValue), wrongTopics);
    
    switchView('result');
}

function saveHistory(scoreValue, wrongTopics) {
    let history = JSON.parse(localStorage.getItem('deutsch_mvp_history') || '[]');
    const date = new Date();
    const dateString = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    
    history.push({ date: dateString, score: scoreValue, wrongTopics: wrongTopics });
    if(history.length > 20) history = history.slice(history.length - 20); // Keep last 20
    
    localStorage.setItem('deutsch_mvp_history', JSON.stringify(history));
}

function loadProgress() {
    const history = JSON.parse(localStorage.getItem('deutsch_mvp_history') || '[]');
    
    const total = history.length;
    let avg = 0;
    let weakTopic = '-';
    
    if (total > 0) {
        const sum = history.reduce((acc, curr) => acc + curr.score, 0);
        avg = Math.round(sum / total);
        
        // Find weakest topic
        const topicCounts = {};
        history.forEach(attempt => {
            if(attempt.wrongTopics) {
                attempt.wrongTopics.forEach(t => {
                    topicCounts[t] = (topicCounts[t] || 0) + 1;
                });
            }
        });
        
        let maxCount = 0;
        for (const [topic, count] of Object.entries(topicCounts)) {
            if (count > maxCount) {
                maxCount = count;
                weakTopic = topic;
            }
        }
    }
    
    statAvg.textContent = avg;
    statTotal.textContent = total;
    statWeakTopic.textContent = weakTopic;
    
    // Render Chart
    const labels = history.map((_, i) => `Latihan ${i+1}`);
    const data = history.map(h => h.score);
    
    if (progressChartInstance) {
        progressChartInstance.destroy();
    }
    
    const ctx = document.getElementById('progress-chart').getContext('2d');
    progressChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nilai',
                data: data,
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    
    switchView('progress');
}

async function generateQuestionsWithAI(topic, type) {
    const typeInstruction = type === 'mixed' ? 'kombinasi campuran antara pilihan ganda dan isian singkat' : 
                            type === 'multiple_choice' ? 'hanya pilihan ganda' : 'hanya isian singkat';
    const topicInstruction = topic === 'all' ? 'Topik bahasa Jerman A1 secara umum campur-campur' : `Topik: ${topic}`;

    const prompt = `Buatlah 10 soal latihan tes bahasa Jerman tingkat A1 secara acak berdasarkan kriteria berikut:
- Topik: "${topicInstruction}"
- Format Soal: ${typeInstruction}

PENTING UNTUK TERJEMAHAN KATA: 
Untuk string pada nilai "question" dan "options", Anda WAJIB memisahkan setiap kata bahasa jerman dan membungkusnya dengan tag HTML <ruby> dan <rt> untuk memberikan terjemahan bahasa Indonesianya TEPAT di bawah kata tersebut.
Contoh: "<ruby>Wie<rt>Bagaimana</rt></ruby> <ruby>heißt<rt>bernama</rt></ruby> <ruby>du<rt>kamu</rt></ruby>?"
Jangan terjemahkan karakter tanda baca/blank. Berlaku untuk pilihan ganda maupun isian singkat. Untuk isian singkat berikan ruang kosong pada blanko misal <ruby>___<rt>jawaban</rt></ruby>.

KEMBALIKAN HANYA ARRAY JSON YANG VALID, tidak ada awalan atau akhiran teks atau markdown seperti \`\`\`json.
Struktur JSON yang WAJIB digunakan untuk tiap soal (terdapat field "type", "topic", "question", "question_translation", "options" jika pilihan ganda, "answer", "explanation", "examples"):
[
  {
    "type": "multiple_choice",
    "topic": "${topic !== 'all' ? topic : 'nama_topik'}",
    "question": "<ruby>Das<rt>Ini</rt></ruby> <ruby>ist<rt>adalah</rt></ruby>...",
    "question_translation": "Ini adalah sebuah buku.",
    "options": ["<ruby>ein<rt>sebuah</rt></ruby> <ruby>Buch<rt>buku</rt></ruby>"],
    "answer": 0, /* indeks jawaban yang benar dari array options */
    "explanation": "penjelasan dan terjemahan ke bahasa indonesia",
    "examples": ["contoh kalimat terkait 1"]
  },
  {
    "type": "short_answer",
    "topic": "${topic !== 'all' ? topic : 'nama_topik'}",
    "question": "<ruby>Ich<rt>Saya</rt></ruby> <ruby>___<rt>to be</rt></ruby> <ruby>Student<rt>mahasiswa</rt></ruby>.",
    "question_translation": "Saya adalah seorang mahasiswa.",
    "answer": "bin", /* satu kata jawaban persis (tanpa tag html) */
    "explanation": "penjelasan dan terjemahan ke bahasa indonesia...",
    "examples": ["contoh kalimat terkait 1"]
  }
]`;

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    responseMimeType: "application/json"
                }
            })
        });

        if (!response.ok) throw new Error("Gagal request API");

        const data = await response.json();
        const textResponse = data.candidates[0].content.parts[0].text;
        
        // Membersihkan format markdown JSON dari respon (jika AI membandel)
        let jsonStr = textResponse.replace(/```json/gi, '').replace(/```/gi, '').trim();
        
        const generatedQuestions = JSON.parse(jsonStr);
        
        if (Array.isArray(generatedQuestions) && generatedQuestions.length > 0) {
            return generatedQuestions.map((q, i) => ({...q, id: 'ai_' + Date.now() + '_' + i}));
        } else {
            throw new Error("JSON tidak valid / array kosong");
        }
    } catch (error) {
        console.error("AI Generation Error:", error);
        alert("Detail Error AI: " + error.message);
        return null; // Return null to trigger fallback
    }
}

function loadReview() {
    reviewList.innerHTML = '';
    userAnswers.forEach((ans, i) => {
        const item = document.createElement('div');
        item.className = 'review-item';
        
        let ansHTML = '';
        if(ans.isCorrect) {
            ansHTML = `<p class="review-a">✅ ${ans.correctAnswerText}</p>`;
        } else {
            ansHTML = `
                <p class="review-user-a wrong-ans">❌ ${ans.userAnswerText}</p>
                <p class="review-a">✅ ${ans.correctAnswerText}</p>
            `;
        }
        
        let examplesHTML = '';
        if (ans.examples && ans.examples.length > 0) {
            examplesHTML = `
                <div class="review-examples">
                    <p>Contoh tambahan:</p>
                    <ul>
                        ${ans.examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        item.innerHTML = `
            <div class="review-item-header">
                <p class="review-q">${i+1}. ${ans.question}</p>
                <button class="toggle-review-btn">👉 Lihat Pembahasan</button>
            </div>
            <div class="review-item-content">
                ${ansHTML}
                <div class="review-exp">💡 ${ans.explanation}</div>
                ${examplesHTML}
            </div>
        `;
        
        item.querySelector('.toggle-review-btn').addEventListener('click', (e) => {
            const content = e.currentTarget.parentElement.nextElementSibling;
            content.classList.toggle('expanded');
        });

        reviewList.appendChild(item);
    });
}

// --- Speech Synthesis (Pronunciation) ---
function getCleanGermanText(htmlStr) {
    const temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    const rts = temp.querySelectorAll('rt');
    rts.forEach(rt => rt.remove());
    return temp.textContent.replace(/_+/g, ' was ').trim(); // 'was' as a blank placeholder sound
}

function playAudio(text) {
    if (!window.speechSynthesis) {
        alert("Maaf, browser Anda tidak mendukung fitur Suara (Web Speech API).");
        return;
    }
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.85; 
    
    window.speechSynthesis.speak(utterance);
}

btnSpeak.addEventListener('click', () => {
    const q = currentQuestions[currentQuestionIndex];
    if (q) {
        // Just the question text, optionally add options if you want later.
        const cleanText = getCleanGermanText(q.question);
        playAudio(cleanText);
    }
});

// Event Listeners

btnStart.addEventListener('click', startQuiz);
btnNext.addEventListener('click', nextQuestion);
btnRestart.addEventListener('click', startQuiz);
btnHome.addEventListener('click', () => switchView('home'));

btnHistory.addEventListener('click', loadProgress);
btnCloseProgress.addEventListener('click', () => switchView('home'));

btnReview.addEventListener('click', () => {
    loadReview();
    showModal('review');
});
closeReview.addEventListener('click', () => hideModal('review'));

// Initialize view
views.home.classList.remove('hidden');
views.home.classList.add('active');
views.quiz.classList.add('hidden');
views.result.classList.add('hidden');
