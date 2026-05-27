const translateBtn = document.getElementById("translateBtn");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");

const copyBtn = document.getElementById("copyBtn");
const speakBtn = document.getElementById("speakBtn");
const swapBtn = document.getElementById("swapBtn");


// TRANSLATE FUNCTION
translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    if (text === "") {
        alert("Please enter text");
        return;
    }

    outputText.innerText = "Translating...";

    const url =
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang.value}|${targetLang.value}`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        outputText.innerText =
            data.responseData.translatedText;

    } catch (error) {

        outputText.innerText =
            "Translation failed. Try again.";

    }

});


// COPY BUTTON
copyBtn.addEventListener("click", () => {

    const text = outputText.innerText;

    if (
        text === "" ||
        text === "Your translated text will appear here..."
    ) {
        alert("No translated text to copy!");
        return;
    }

    navigator.clipboard.writeText(text);

    alert("Copied successfully!");

});

speakBtn.addEventListener("click", () => {

    const text = outputText.innerText.trim();

    if (
        text === "" ||
        text === "Your translated text will appear here..." ||
        text === "Translating..."
    ) {
        alert("Please translate text first!");
        return;
    }

    const speech =
        new SpeechSynthesisUtterance(text);

    // Pick available voice automatically
    const voices =
        window.speechSynthesis.getVoices();

    if (voices.length > 0) {
        speech.voice = voices[0];
    }

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);

});


// SWAP LANGUAGES
swapBtn.addEventListener("click", () => {

    let temp = sourceLang.value;

    sourceLang.value = targetLang.value;
    targetLang.value = temp;

});