console.log(language) //lingua

// Setto il parametro continuous a false per interrompere la recognition dopo la prima parola
recognition.continuous = false;

caricaRegEx()
$("#listening").html(translate('notListen'))

// Recognition dei tag input
async function startRecognitionInput(element, message) {
  return new Promise(function(resolve) {

    $("#div-activate").addClass('pulse-ring');
    $("#speech-activate").removeClass('type2');
    // Avvia il riconoscimento vocale una sola volta all'inizio del ciclo
    recognition.start();
    $("#listening").html(translate('listen'))

    // zona dove effettuare le operazioni
    recognition.onresult = function(event) {
      $("#listening").html(translate('notListen'))
      var testoRiconosciuto = event.results[event.results.length - 1][0].transcript.toLowerCase();
      testoRiconosciuto.trim()
      
      if(element.attr('id') === "email"){
        testoRiconosciuto = testoRiconosciuto.replace(regexEmail, "@");
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

      if(element.attr('name') === "password")
       testoRiconosciuto = testoRiconosciuto.replace(/\s/g, "");

      nomeCampo = element.attr('name').trim()

      // scrittura del log
      executionTime = getExecutionTaskTime()
      actionMessage = "Inserimento del valore "+ testoRiconosciuto + " nel campo "+ nomeCampo
      logAction(actionMessage, executionTime, testoRiconosciuto)
      console.log(logMessage)

      element.val(testoRiconosciuto);
      element.prop('eseguitoCorrettamente', true);
    };

    recognition.onend = function() {
      resolve(); // Risolvi la promessa quando il riconoscimento vocale termina
      $("#div-activate").removeClass('pulse-ring');
      $("#speech-activate").addClass('type2');
    };

  });
}  

// Flag per capire se il loop della recognition deve continuare o meno
var shouldRestartRecognition = { value: true }

// Recognition delle select
function startRecognitionSelect(element, message) {
  return new Promise(function(resolve) {
    $("#listening").html("I\'m not listening!")
    $("#div-activate").addClass('pulse-ring');
    $("#speech-activate").removeClass('type2');
    recognition.start();
    $("#listening").html(translate('listen'))
    
    recognition.onresult = function(event) {
      $("#listening").html(translate('notListen'))
      var testoRiconosciuto = event.results[event.results.length - 1][0].transcript.toLowerCase();
      testoRiconosciuto.trim()
      console.log(testoRiconosciuto)
    
      var commandUp = testoRiconosciuto.match(regexCommandUp);
      var commandDown = testoRiconosciuto.match(regexCommandDown);
      var commandScrollUp = testoRiconosciuto.match(regexCommandScrollUp)
      var commandScrollDown = testoRiconosciuto.match(regexCommandScrollDown)
   
      if (commandUp) {
        selectUpDown("up", element);

        nomeCampo = element.attr('name')

        // scrittura del log
        executionTime = getExecutionTaskTime()
        actionMessage = "Esecuzione up nella select "+ nomeCampo
        logAction(actionMessage, executionTime, nomeCampo)
        console.log(logMessage)
      } else if (commandDown) {
        selectUpDown("down", element);

        nomeCampo = element.attr('name')

        // scrittura del log
        executionTime = getExecutionTaskTime()
        actionMessage = "Esecuzione down nella select "+ nomeCampo
        logAction(actionMessage, executionTime, nomeCampo)
        console.log(logMessage)
      }  else  if (commandScrollUp) {
        nomeCampo = element.attr('name')
        var $select = element
        var scrollValue = commandScrollUp[1]
    
        selectUpDown("up",$select, scrollValue)
    
        // scrittura del log
        executionTime = getExecutionTaskTime()
        actionMessage = "Esecuzione scroll up nella select "+ nomeCampo
        logAction(actionMessage, executionTime, nomeCampo)
        console.log(logMessage)
    
      } else  if (commandScrollDown) {
        nomeCampo = element.attr('name')
        var $select = element
        var scrollValue = commandScrollDown[1]
    
        selectUpDown("down",$select, scrollValue)
    
        // scrittura del log
        executionTime = getExecutionTaskTime()
        actionMessage = "Esecuzione scroll down nella select "+ nomeCampo
        logAction(actionMessage, executionTime, nomeCampo)
        console.log(logMessage)
    
      } else if (testoRiconosciuto.includes("stop")) {
          shouldRestartRecognition.value = false;
          recognition.stop();

          nomeCampo = element.attr('name')
          flagStop.value =false

          // scrittura del log
          executionTime = getExecutionTaskTime()
          actionMessage = "Fine esperimento 2 - Esecuzione comando stop!"
          logAction(actionMessage, executionTime)
          console.log(logMessage)

          closeMenu(element)

          resolve(); // Risolvi la Promise per indicare la terminazione
      } else {
        var valore = testoRiconosciuto.trim()
        var $select = element
        var $option = $select.find('option[value="' + valore + '"]');
        var nomeCampo = $select.attr('name')
        
        console.log($option.length)
        if ($option.length) {
          shouldRestartRecognition.value = false;
          $select.val(valore);
          risposta = 'Item ' + valore + ' selected';

          // scrittura del log
          executionTime = getExecutionTaskTime()
          actionMessage = "Selezione del valore "+ valore + " nella select "+ nomeCampo
          logAction(actionMessage, executionTime, valore)
          console.log(logMessage)
          element.prop('eseguitoCorrettamente', true);
          recognition.stop()
        } else {
          
          shouldRestartRecognition.value = false;
          flagStop.value=true;
          element.prop('eseguitoCorrettamente', true);
          menu=document.getElementById(element.attr("id"));
          popup= document.getElementById("popup");
          mostraPopup(element,menu,valore,popup,0,nomeCampo,recognition)
        }
        closeMenu(element);
      }
      
    };

    // Catturo l'evento recognition end per inserire la chiusura della recognition quando il loop termina
    recognition.onend = function() {
      $("#div-activate").removeClass('pulse-ring');
      $("#speech-activate").addClass('type2');
      $("#listening").html(translate('notListen'))
      recognition.stop();
      
      if (shouldRestartRecognition) {
        recognition.stop();
        resolve(); // Risolvi la Promise per indicare il riavvio
      }
    };
  });
}

var formElements
var flagStop = {value: false}

function startDialog() {
  flagStop.value = false

  initializeGlobalTime()
  initializeTime();
  executionTime = getExecutionGlobalTime()
  logAction("Avvio esperimento 2 ",executionTime)

  formElements = getFormElements('experiment1'); 

  eseguiRecognition(formElements)
  
}

function restartDialog(){
  flagStop.value = false
  shouldRestartRecognition.value = true;
  formElements = getFormElementsModificato('experiment1'); 

  eseguiRecognition(formElements)
}

async function eseguiRecognition(formElements){

  for (var [key, element] of Object.entries(formElements)) {
    recognition = riavviaRecognition()
    var elementType = element[0].nodeName;
    var eseguito = element.prop('eseguitoCorrettamente');
  
    var message 

  
    message = translate('insertCampo', { elemento: key});

   // Scorro gli input per eseguire la recognition
   while($("#"+key).val()==="" && (elementType==="INPUT" || elementType==="TEXTAREA") && !eseguito){
      if(!flagStop.value){
        await new Promise(resolve => {
          artyom.say(message, {
            onStart() {
              // scrittura del log
              executionTime = getExecutionTaskTime()
            },
            onEnd: async function() {

              actionMessage = "Fine riproduzione del testo: "+ message
              logAction(actionMessage, executionTime)

              if(!flagStop.value){
              initializeTime();
              console.log("Artyom ha finito di parlare.");
              $("#listening").html(translate('listen'))
              await startRecognitionInput(element, message)
              resolve()
              } else{}
            }
          });
        });
      } else {break;}
    }
    // Recognition sulle select
    if(elementType==="SELECT" && !eseguito){
      console.log(eseguito)
      while (shouldRestartRecognition.value) {
        openMenu(element)
        if(!flagStop.value){
          await new Promise(resolve => {
            artyom.say(message, {
              onStart() {
                // scrittura del log
                executionTime = getExecutionTaskTime()
              },
              onEnd: async function() {

                actionMessage = "Fine riproduzione del testo: "+ message
                logAction(actionMessage, executionTime)

                if(!flagStop.value){
                  initializeTime();
                  console.log("Artyom ha finito di dparlare.");
                  $("#listening").html(translate('listen'))
                  await startRecognitionSelect(element, message)
                  resolve()
                } else {}
              }
            });
          })  
        } else {break;}
      }
      shouldRestartRecognition.value = true   
    }  
  }

}

$('#submitButton').click(function() {
  $("#div-activate").removeClass('pulse-ring');
  $("#speech-activate").addClass('type2');

  var experiment = $(this).attr('name')
  var executionTime = getExecutionGlobalTime()
  logAction("Fine esperimento 2 ",executionTime)

  location.reload(); // Ricarica la pagina corrente
  colonne = "Timestamp; Azione; Valore; Tempo di esecuzione (ms)"
  logMessage = colonne +"\n"+logMessage
  saveFile(logMessage, 'Experiment_dialogued_mode_'+experiment+'.csv');
  
});

function stopExperiment(){
  $("#div-activate").removeClass('pulse-ring');
  $("#speech-activate").addClass('type2');
  $("#listening").html(translate('notListen'))
  flagStop.value = true
  var executionTime = getExecutionGlobalTime()
  logAction("Fine recognition - premuto pulsante stop ",executionTime)
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


makeComand()