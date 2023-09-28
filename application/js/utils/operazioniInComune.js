// Funzione per prendere gli elementi del form
function getFormElements(idform) {
    var formElements = {};
  
    $('#'+idform+' :input, #' + idform + ' textarea, #' + idform + ' select').each(function() {
      var elementId = $(this).attr('id');
      var element = $(this);
      element.prop('eseguitoCorrettamente', false); // Aggiungi l'attributo "eseguitoCorrettamente" con valore false
      formElements[elementId] = element;
    });
  
    return formElements;
  }

  function getFormElementsModificato(idform) {
    var formElements = {};
  
    $('#'+idform+' :input, #' + idform + ' textarea, #' + idform + ' select').each(function() {
      var elementId = $(this).attr('id');
      var element = $(this);
      formElements[elementId] = element;
    });
  
    return formElements;
  }

// Funzione per salvare il file di log
function saveFile(content, fileName) {
    var blob = new Blob([content], { type: 'text/plain' });
    
    // Creazione dell'URL del blob
    var url = URL.createObjectURL(blob);
    
    // Creazione di un elemento <a> nascosto
    var a = $('<a>')
      .attr('href', url)
      .attr('download', fileName)
      .appendTo('body');
    
    // Simulazione del clic sul link per avviare il download
    a[0].click();
    
    // Rimozione dell'elemento <a>
    a.remove();
    
    // Rilascio dell'URL del blob
    URL.revokeObjectURL(url);
  }


// Funzione per reinizializzare la variabile recognition
function riavviaRecognition(){
  // Creare un'istanza di SpeechRecognition
  var recognitionTemp = new SpeechRecognition();

  // Impostare le opzioni per il riconoscimento vocale
  recognitionTemp.continuous = false;
  recognitionTemp.interimResults = false;
  recognitionTemp.lang = language;
  recognitionTemp.maxAlternatives = 1;
  return recognitionTemp
}

// Funzione per far comunicare il sistema con l'utente tramite lo speaker
function sintetizzaRisposta(testo) {
  var risposta = testo
  artyom.say(risposta)
}


// Funzione per far comunicare il sistema con l'utente tramite lo speaker
function sintetizzaRispostaConAttesa(testo) {
  var risposta = testo
  artyom.say(risposta, {
    onEnd: async function() {
      recognition.start()
      $("#div-activate").addClass('pulse-ring');
      $("#speech-activate").removeClass('type2');
      $("#listening").html(translate('listen'))
    }
  });
}
function checkSelezione(message) {
  var testualeChecked = $('#text').prop('checked');
  var vocaleChecked = $('#vocal').prop('checked');

  if (testualeChecked && vocaleChecked) {
    $("#comando").show()
    $("#comando").val(message)
    sintetizzaRispostaConAttesa(message)
    // Entrambi i checkbox sono selezionati
    return 2;
  } else if (testualeChecked) {
    $("#comando").show()
    $("#comando").val(message)
    // Solo il checkbox testuale è selezionato
    return 0;
  } else if (vocaleChecked) {
    sintetizzaRispostaConAttesa(message)
    return 1;
  } else {
    // Nessuno dei checkbox è selezionato
    return -1;
  }
}


// Quando lo scroll avviene, applica la classe "sticky" all'elemento in modo dinamico
window.addEventListener('scroll', function() {
  var element = document.getElementById('mydivSpeech');
  var stickyClass = 'sticky';

  // Recupera l'altezza dell'elemento e la sua posizione rispetto al top della finestra
  var rect = element.getBoundingClientRect();
  var topOffset = rect.top;

  // Se l'elemento è "sticky", aggiungi la classe "sticky", altrimenti rimuovila
  if (topOffset <= 0) {
      element.classList.add(stickyClass);
  } else {
      element.classList.remove(stickyClass);
  }
});




function makeComand(both = 0){
  // Seleziona il div con ID desiderato
  var  div= $("#mydivSpeech");

  // Crea un nuovo elemento div con il testo desiderato
  var tutorialBox = $("<div>").addClass("tutorial-box");

  var tutorialHeading;
  var tutorialList;
  var tutorialSelect;

  if(both === 1){
    tutorialHeading = $("<h4>").text(translate('TutorialHeader')).css('margin','0px');  ;

    tutorialList = $("<ol>")
      .append($("<li>").text(translate('InserireValore') + translate('ComandoInput')
                              + translate('Valore') +  translate('ValoreDaInserie')));
                      
    tutorialSelect = $("<h4>").text(translate('Select')).css('margin','-20px 0px 0px 0px');
  }

  tutorialSelect = $("<h4>").text(translate('Select')).css('margin','0px 0px 0px 0px'); 

  var tutorialListSelect
  if(both === 1) {
  tutorialListSelect = $("<ol>")
    .append($("<li>").text(translate('Apri')))
    .append($("<li>").text(translate('Chiudi')))
    .append($("<li>").text(translate('Sali')))
    .append($("<li>").text(translate('Sali1')))
    .append($("<li>").text(translate('Scendi')))
    .append($("<li>").text(translate('Scendi1')))
    ;
  } else {
  tutorialListSelect = $("<ol>")
    .append($("<li>").text(translate('Sali')))
    .append($("<li>").text(translate('Sali1')))
    .append($("<li>").text(translate('Scendi')))
    .append($("<li>").text(translate('Scendi1')))
    ;
  }

  
  // Controlla il valore di "both" (1 o 0) e costruisci la variabile contenente gli elementi da aggiungere
  var elementsToAdd;
  if (both === 1) {
    elementsToAdd = [tutorialHeading, tutorialList, tutorialSelect, tutorialListSelect];
  } else {
    elementsToAdd = [tutorialSelect, tutorialListSelect];
  }

  // Aggiungi gli elementi al tutorialBox
  tutorialBox.append(elementsToAdd);

  // Aggiungi il nuovo elemento div subito dopo il div con ID indicato precedentemente
  tutorialBox.appendTo(div);

  tutorialBox.hide();
}

function showComand(){
  var tutorialBox = $(".tutorial-box");
  tutorialBox.toggle();
}