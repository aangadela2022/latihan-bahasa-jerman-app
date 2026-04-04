const GEMINI_API_KEY = "AIzaSyA6-oLGGreORU0j5Wq8cPUgPCkWIoO9bvs";
async function list() {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
    const data = await res.json();
    console.log(data.models.map(m => m.name).filter(name => name.includes('flash')));
}
list();
