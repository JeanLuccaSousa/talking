let voices = [];
speechSynthesis.addEventListener('voiceschanged', function () {
  voices = speechSynthesis.getVoices();
  //console.log(voices);
})

// Classes and elements that serve me
const textArea = document.querySelector('textarea');
const playButton = document.querySelector('button');
const pitchBar = document.querySelector('input');
const duckFigure = document.querySelector('figure');

// If you click the button it will do what i say
playButton.addEventListener('click', function () {
  const textLength = textArea.value.trim().length;
  if (textLength > 0) {
    // now make the duck talk
    talk();
  }
});

// Function to make the duck talk
function talk() {

  // 1 - Cecovering voice and text tone
  const text = textArea.value;
  const pitch = pitchBar.value;

  // 2 - Preparing a sentence
  const utterance = new SpeechSynthesisUtterance(text);

  // 3 - specifichiamo altri dettagli della frase
  utterance.volume = 1;
  utterance.rate = 1;
  utterance.pitch = pitch;

  const femaleVoice = voices.find(function (voice) {
    if (voice.name.includes('Elsa')) {
      return true;
    }
  });

  utterance.voice = femaleVoice;

  // Making the duck talk
  speechSynthesis.speak(utterance);

  // when the duck starts talking...
  utterance.addEventListener('start', function () {
    // Block the every buttons
    textArea.disabled = true;
    pitchBar.disabled = true;
    playButton.disabled = true;

    // Animating the duck
    duckFigure.classList.add('talking');
  });

  // When the duck finishes talking
  utterance.addEventListener('end', function () {
    // Block the every buttons
    textArea.disabled = false;
    pitchBar.disabled = false;
    playButton.disabled = false;

    // Reporting the static duck
    duckFigure.classList.remove('talking');
  })
}