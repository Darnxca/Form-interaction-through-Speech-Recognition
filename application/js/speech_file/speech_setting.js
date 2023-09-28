const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// Creare un'istanza di SpeechRecognition
var recognition = new SpeechRecognition();
var language = localStorage.getItem('selectedLanguage');

// Impostare le opzioni per il riconoscimento vocale
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = language;
recognition.maxAlternatives = 1;

// Creare un'istanza di artyom per la risposta vocale
var artyom = new Artyom();

artyom.initialize({
   lang: language,
   voice: undefined,
   rate: 0.9 // Adjust the rate value as needed (default: 1.0)
})

// Aggiungere un listener per l'evento "error"
recognition.onerror = function (event) {
    console.log('Errore di riconoscimento vocale:', event.error);
    $("#listening").html(translate('notListen'))
    $("#div-activate").removeClass('pulse-ring');
    $("#speech-activate").addClass('type2');

    var attendo = checkSelezione(translate('errorRecognition'))
 
    if(attendo == 2 || attendo == 1) {recognition.stop()}
};

// Aggiungere un listener per l'evento "end"
recognition.onend = function () {
    console.log('Riconoscimento vocale terminato.');
    $("#listening").html(translate('notListen'))
    $("#div-activate").removeClass('pulse-ring');
    $("#speech-activate").addClass('type2');
};

//Avviare il riconoscimento vocale quando si fa clic su un pulsante
function startRecognition() {
    recognition.start();
    $("#div-activate").addClass('pulse-ring');
    $("#speech-activate").removeClass('type2');
    $("#listening").html(translate('listen'))
    //document.getElementById('img').style.display = "block";
}
/*
// Stoppare il riconoscimento vocale 
var pulsanteDiStop = document.getElementById('pulsante-di-Stop');
pulsanteDiStop.addEventListener('click', function () {
    recognition.stop();
    $("#div-activate").removeClass('pulse-ring');
    $("#speech-activate").addClass('type2');
    //document.getElementById('img').style.display = "none";
});
*/