const GEMINI_API_KEY = "AIzaSyDR0LWoAMLWyO1Kka1NHeb6INiCeCC-QSk";
async function list() {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
    const data = await res.json();
    console.log(data.models.map(m => m.name));
}
list();
