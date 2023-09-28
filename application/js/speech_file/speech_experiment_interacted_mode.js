console.log(language) //lingua
caricaRegEx()

$("#listening").html(translate('notListen'))
$("#feedback").html(translate('feedback'))
$("#t").text(translate('text'))
$("#v").text(translate('vocal'))

// Funzione epr inizializzare i tempi alla prima esecuzione soltanto
let flagStart = {value : true}
function firstStart(){
  if(flagStart.value){
    initializeGlobalTime()
    initializeTime()
    executionTime = getExecutionGlobalTime()
    logAction("Avvio esperimento 3 ",executionTime)
    console.log(logMessage)
    flagStart.value = false
  }
}

// Aggiungere un listener per l'evento "result" per gli input tag
recognition.onresult = function(event) {
  $("#listening").html(translate('notListen'))
  // Ottenere il testo riconosciuto
  var testoRiconosciuto = event.results[0][0].transcript.toLowerCase();

  var element = azioneCorrente

  if (testoRiconosciuto !== "") {

      if(element.attr('id') === "email"){
        testoRiconosciuto = testoRiconosciuto.replace(regexEmail, "@").trim();
        testoRiconosciuto = testoRiconosciuto.replace(/\s/g, "");
      }

      if(element.is('[type="date"]')){
        var parts = testoRiconosciuto.match(/\d+/g);
        if (parts.length === 3) {
          var day = parts[0];
          var month = parts[1];
          var year = parts[2];

          testoRiconosciuto = year+"-"+month+"-"+day
        } else {
          $("#listening").html(translate('notListen'))

          var attendo = checkSelezione(translate('errorDate'))
      
          if(attendo == 2 || attendo == 1) {recognition.stop()}
        }
      }

      nomeCampo = element.attr('name')
      if(nomeCampo === "password") 
        testoRiconosciuto = testoRiconosciuto.replace(/\s/g, "");

      nomeCampo = element.attr('name')

      executionTime = getExecutionTaskTime()
      actionMessage = "Inserimento del valore "+ testoRiconosciuto + " nel campo "+ nomeCampo
      logAction(actionMessage, executionTime, testoRiconosciuto)
      console.log(logMessage)
      $("#listening").html(translate('notListen'))
      element.val(testoRiconosciuto);
      recognition.stop();
  } else {
    $("#listening").html(translate('notListen'))

    var attendo = checkSelezione(translate('error', { errore: testoRiconosciuto}))
 
    if(attendo == 2 || attendo == 1) {recognition.stop()}
    // scrittura del log
    executionTime = getExecutionTaskTime()
    actionMessage = "Errore comando "+ testoRiconosciuto + " non capito"
    logAction(actionMessage, executionTime, testoRiconosciuto)
    console.log(logMessage)
  }
};

$('input, textarea').each(function() {
  // Bottone associato all'evento
  var id = this.id
  var button = $("#" + this.id + "Speech");
  
  // Rimozione di tutti gli eventi precedentemente collegati
  button.off('click').on('click', function(event) {
    event.stopPropagation();
    firstStart()

    var element = $("#" + id);
    azioneCorrente = element

    $("#div-activate").addClass('pulse-ring');
    $("#speech-activate").removeClass('type2');
    $("#listening").html(translate('listen'))
  
    initializeTime()
    recognition.start()
  });
});

var flagStop = {value: false}
$('select').each(function() {
  
  var selectId = this.id;
  // Bottone associazto alla select
  var button = $("#" + this.id + "Speech");
  
  // Rimozione di tutti gli eventi precedentemente collegati
  button.off('click').on('click', function(event) {
    event.stopPropagation();
    firstStart()
    flagStop.value = false;
    
    var optionsArray = [];
    $('#' + selectId + ' option').each(function() {
      var optionText = $(this).text();
      optionsArray.push(optionText);
    });
        
    readOptionsAndConfirm(optionsArray, selectId);
  });
});
  
var recognitionSelect
let shouldRestartRecognition = {value: true};

async function readOptionsAndConfirm(options, selectName) {
  var select = $("#" + selectName);
  select.prop('selectedIndex', 0);
  
  var index = -1;
  
  recognitionSelect = riavviaRecognition()
  
  var message 
  message = translate('select', { select: selectName});

  artyom.say(message, {
    onStart() {
      // scrittura del log
      executionTime = getExecutionTaskTime()
    },
    onEnd: async function() {

      actionMessage = "Fine riproduzione del testo: "+ message
      logAction(actionMessage, executionTime)

      for (const element of options){
        if (index < options.length) {
          index++;
          var option = element
          if(!flagStop.value){
            var messageReadOption 
            messageReadOption = translate('option', { option: option});
            
            await new Promise(resolve => {
              artyom.say(messageReadOption, {
                onStart() {
                  // scrittura del log
                  executionTime = getExecutionTaskTime()
                },
                onEnd: async function() {
                  if(!flagStop.value){
                    actionMessage = "Fine riproduzione del testo: "+ messageReadOption
                    logAction(actionMessage, executionTime)

                    initializeTime() // parte l'azione
                    console.log("Artyom ha finito di parlare.");
                    $("#listening").html(translate('listen'))
                    await startRecognitionSelect(element, option)
                    resolve()
                  } else {}
                }
              });
            });
          } else {recognitionSelect.stop();break;}
        }
        if(shouldRestartRecognition.value == false){
          shouldRestartRecognition.value = true
          break;
        } else {
          selectUpDown("down", select);
        }
      }
    }
  });
}

function startRecognitionSelect(selectName, option) {
  return new Promise((resolve) => {
    $("#listening").html(translate('notListen'))

    $("#div-activate").addClass('pulse-ring');
    $("#speech-activate").removeClass('type2');

     recognitionSelect.start();
     $("#listening").html(translate('listen'))

    recognitionSelect.onresult = function(event) {
      var result = event.results[event.results.length - 1][0].transcript.toLowerCase();
      //result = "yes"
      console.log(result)
      $("#listening").html(translate('notListen'))
      
      // Check se il risultato corrisponde a "si" o "no"
      if (result.trim() === "yes" || result.trim() === "sì") {
        // Termina la recognition della voce
        shouldRestartRecognition.value = false;
        recognitionSelect.stop();
              
        executionTime = getExecutionTaskTime()
        actionMessage = "Esecuzione comando yes per confermare il valore "+ option +" della select " + selectName
        logAction(actionMessage, executionTime, "yes")
        console.log(logMessage)

        resolve();
      } else {
        recognitionSelect.stop();

        executionTime = getExecutionTaskTime()
        actionMessage = "Esecuzione comando no per non confermare il valore "+ option +" della select " + selectName
        logAction(actionMessage, executionTime, "no")
        console.log(logMessage)

        resolve();
      }
    };

    recognitionSelect.onend = function() {
      $("#div-activate").removeClass('pulse-ring');
      $("#speech-activate").addClass('type2');
      $("#listening").html(translate('notListen'))
      recognitionSelect.stop();
            
      if (shouldRestartRecognition.value) {
        recognitionSelect.stop();
        resolve(); // Risolvi la Promise per indicare il riavvio
      }
    };
  });
}


$('#submitButton').click(function() {
  var experiment = $(this).attr('name')
  var executionTime = getExecutionGlobalTime()
  logAction("Fine esperimento 3 ",executionTime)

  location.reload(); // Ricarica la pagina corrente
  colonne = "Timestamp; Azione; Valore; Tempo di esecuzione (ms)"
  logMessage = colonne +"\n"+logMessage
  saveFile(logMessage, 'Experiment_interacted_mode_'+experiment+'.csv');
  
});

function stopExperiment(){
  $("#div-activate").removeClass('pulse-ring');
  $("#speech-activate").addClass('type2');
  flagStop.value=true
  $("#listening").html(translate('notListen'))
  var executionTime = getExecutionGlobalTime()
  logAction("Fine recognition - premuto pulsante stop ",executionTime)
  console.log(logMessage)
  recognition.abort()
}


var $inputKey = $('#experiment1');
// Aggiungi l'evento keydown agli elementi del form
$inputKey.find('input, textarea').on('keydown', function(event) {

  // scrittura del log
  valore = $(this).val()
  nomeCampo = $(this).attr('name')
  keyCodeString = String.fromCharCode(event.keyCode || event.which);
  executionTime = getExecutionTaskTime()
  actionMessage = "Modifica del testo "+ valore + " nel campo "+ nomeCampo +
                  " con il valore "+ valore + keyCodeString 
  logAction(actionMessage, executionTime, valore)
});