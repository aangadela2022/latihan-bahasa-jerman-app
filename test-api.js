const GEMINI_API_KEY = "AIzaSyA6-oLGGreORU0j5Wq8cPUgPCkWIoO9bvs";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const prompt = `Buatlah 2 soal latihan tes bahasa Jerman tingkat A1 secara acak berdasarkan kriteria berikut:
- Topik: "1.1 Begrüßung & Vorstellung"
- Format Soal: hanya pilihan ganda

KEMBALIKAN HANYA ARRAY JSON YANG VALID.
[
  {
    "type": "multiple_choice",
    "topic": "nama_topik",
    "question": "pertanyaan bahasa jerman...",
    "options": ["opsi 1", "opsi 2", "opsi 3", "opsi 4", "opsi 5"],
    "answer": 0,
    "explanation": "penjelasan dan terjemahan ke bahasa indonesia",
    "examples": ["contoh kalimat terkait 1"]
  }
]`;

async function test() {
    try {
        console.log("Sending request to Gemini API...");
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

        if (!response.ok) {
            const errBody = await response.text();
            console.error("HTTP Error", response.status, errBody);
            return;
        }

        const data = await response.json();
        console.log("Raw Response:", JSON.stringify(data, null, 2));
        
        const textResponse = data.candidates[0].content.parts[0].text;
        console.log("Extracted Text:", textResponse);
        
        let jsonStr = textResponse.replace(/^```json/g, '').replace(/```$/g, '').trim();
        if(jsonStr.startsWith('```')) jsonStr = jsonStr.replace(/^```/g, '').trim();
        
        const generatedQuestions = JSON.parse(jsonStr);
        console.log("Parsed Array Length:", generatedQuestions.length);

    } catch (error) {
        console.error("AI Generation Error:", error.message);
    }
}

test();
