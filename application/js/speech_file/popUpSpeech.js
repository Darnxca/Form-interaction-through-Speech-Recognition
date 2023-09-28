var recognitionPopup

function mostraPopup(element,menu1, capture, popup1, variabili = 0,name,recognition) {
  const menu = menu1;
  const stringa = capture;
  let selectedValue= ''
  const similarityThreshold = 0.4;
  const opzioni = Array.from(menu.options).map((option) => option.value);

  const risultati = findSimilarStrings(stringa, opzioni, similarityThreshold)

  const popup = popup1;
  popup.innerHTML = '';

  
  if (stringa !== '') {
    if (risultati.length > 1) {
      recognition.stop();

      recognitionPopup = riavviaRecognition()

      // Creazione del pulsante di chiusura
      var closeButton = $('<button>X</button>');
      closeButton.attr('id', 'close-button');
      closeButton.on('click', () => {
        // Rimuovi il popup dal DOM
        name = menu.name
        tornaAlTaskprincipale(variabili, capture ,name)
        stopPopup(variabili)
      });

      // Aggiunta del pulsante di chiusura al popup
      $('#popup').append(closeButton);  

      var h4=document.createElement("h4");
      h4.innerHTML=translate('popup');
      popup.appendChild(h4);


      const div = document.createElement('div');
      div.innerHTML = `
        <div class="col-md-12" style="text-align: center;">
          <button id="speech-activate1" class="btn-mic type2">
            <div id="div-activate1" class=""></div>
            <i class="fa fa-microphone" aria-hidden="true"></i>
          </button> <br>
          <h4 id="listening1">I'm not listening!</h4>
        </div>
      `;

      popup.appendChild(div);
      var  i = 1
      for (const risultato of risultati) {
        const elemento = document.createElement('p');
        elemento.textContent = i+") " + risultato;
        i= i+1
        elemento.addEventListener('click', () => {
          menu.value = risultato;
          popup.style.display = 'none';
          selectedValue = risultato; // Imposta il valore selezionato nella variabile selectedValue
          // scrittura del log

          name = menu.name
          var $select = $("#" + menu.name);
          if (variabili===0) $select.prop('eseguitoCorrettamente', true); 
          tornaAlTaskprincipale(variabili,selectedValue,name)
          stopPopup(variabili)
          
        });
        popup.appendChild(elemento);
      }

      popup.style.display = 'block';

     popupMode(risultati,menu,variabili)

    } else if (risultati.length == 1){
      element.val(risultati[0].toLowerCase())
      executionTime = getExecutionTaskTime()
      actionMessage = "Selezione del valore: "+ risultati[0] + " nella select "+ element.attr('name')
      logAction(actionMessage, executionTime, risultati[0])
     
      closeMenu(element)
      name = menu.name
      var $select = $("#" + menu.name);
    

      if(variabili === 0){
        $select.prop('eseguitoCorrettamente', true)
        element.prop('eseguitoCorrettamente', true)
        flagStop.value=false;
      } else {
        tornaAlTaskprincipale(variabili,selectedValue,name)
      }
     
    } else {
      
      element.val(opzioni[0])
      
      executionTime = getExecutionTaskTime()
      actionMessage = "Si è verificato un errore selezione di "+ opzioni[0] + " nella select "+ element.attr('name')
      logAction(actionMessage, executionTime, opzioni[0])

      if(variabili === 0){
        element.prop('eseguitoCorrettamente', true)
        flagStop.value=false;
      } else {
        tornaAlTaskprincipale(variabili,selectedValue,name)
      }
      
    }
  } else {
    artyom.say(translate('errorRecognition'), {
      onStart() {
        // scrittura del log
        executionTime = getExecutionTaskTime()
      },
      onEnd: async function() {
        actionMessage = "Fine riproduzione del testo: "+ translate('errorRecognition')
        logAction(actionMessage, executionTime)

        tornaAlTaskprincipale(variabili, capture ,name)
        stopPopup(variabili)
      }
    });
    
  }
}

function tornaAlTaskprincipale(variabili,selectedValue,name){
  if(variabili === 0){
    flagStop.value=false;
    shouldRestartRecognition.value = true;
    restartDialog();
  }

  executionTime = getExecutionTaskTime()
  actionMessage = "Selezione del valore: "+ selectedValue + " nella select "+ name
  logAction(actionMessage, executionTime, selectedValue)
  
}

caricaRegEx()
function  popupMode(risultati,menu,variabili){
  recognitionPopup.start()
  $("#div-activate1").addClass('pulse-ring');
  $("#speech-activate1").removeClass('type2');
  $("#listening1").html(translate('listen'))


  // Aggiungere un listener per l'evento "result"
  recognitionPopup.onresult = function (event) {
    $("#listening1").html(translate('notListen'))

    // Ottenere il testo riconosciuto
    var testoRiconosciuto = event.results[event.results.length - 1][0].transcript.toLowerCase();
    testoRiconosciuto = testoRiconosciuto.trim()
    

    var commandClose = testoRiconosciuto.match(regexCommandClosePopup)

    //testoRiconosciuto = "northampton" // query di test

    // primo if match per inserire un valore in un campo
    if (testoRiconosciuto!="") {
      if(commandClose) {
        tornaAlTaskprincipale(variabili, testoRiconosciuto ,menu.name)
        stopPopup(variabili)
      } else {
        num = convertWordToNumber(testoRiconosciuto,language)

        if(isNaN(num)){
          selezionato = risultati[(parseInt(testoRiconosciuto) - 1) % risultati.length]
          
          if( selezionato !== undefined){
            menu.value = selezionato
            var $select = $("#" + menu.name);
            if (variabili===0) $select.prop('eseguitoCorrettamente', true); 
            tornaAlTaskprincipale(variabili, selezionato,menu.name)
            stopPopup(variabili)
          } else {
            var valore =testoRiconosciuto
            var $select = $("#" + menu.name);
            var $option = $select.find('option[value="' + valore + '"]');

            if ($option.length) {
              $select.val(valore);
              if (variabili===0) $select.prop('eseguitoCorrettamente', true); 
              tornaAlTaskprincipale(variabili, valore,menu.name)
              stopPopup(variabili)
            } else {
              //  caso errore il loop del popup continua
              errorericonoscimento(variabili)
            }
          }
          
        } else {
          selezionato = risultati[(parseInt(num) - 1) % risultati.length]
          menu.value = selezionato
          var $select = $("#" + menu.name);
          if (variabili===0) $select.prop('eseguitoCorrettamente', true); 
          tornaAlTaskprincipale(variabili, selezionato,menu.name)
          stopPopup(variabili)
        }
      }
    }else /*altri match o errori */ {
      $("#listening1").html(translate('notListen'))

      var attendo = checkSelezione(translate('error', { errore: testoRiconosciuto}))
  
      if(attendo == 2 || attendo == 1) {recognition.stop()}
      // scrittura del log
      executionTime = getExecutionTaskTime()
      actionMessage = "Errore comando "+ testoRiconosciuto + " non capito"
      logAction(actionMessage, executionTime, testoRiconosciuto)
    

      tornaAlTaskprincipale(variabili, testoRiconosciuto ,menu.name)
      stopPopup(variabili)
    }
  };
}

function errorericonoscimento(variabili){
  recognitionPopup.stop()
  $("#div-activate1").removeClass('pulse-ring');
  $("#speech-activate1").addClass('type2');
  $("#listening1").html(translate('notListen'))

  artyom.say(translate('errorRecognition'), {
    onStart() {
      // scrittura del log
      executionTime = getExecutionTaskTime()
    },
    onEnd: async function() {
      actionMessage = "Fine riproduzione del testo: "+ translate('errorRecognition')
      logAction(actionMessage, executionTime)

      recognitionPopup.start()
      $("#div-activate1").addClass('pulse-ring');
      $("#speech-activate1").removeClass('type2');
      $("#listening1").html(translate('listen'))
    }
  });
}

function stopPopup(variabili){
  popup.style.display = 'none';
  recognitionPopup.stop()
  if(variabili  !==  0 && variabili !== 3) {
    recognition.start()
    $("#div-activate").addClass('pulse-ring');
    $("#speech-activate").removeClass('type2');
    $("#listening").html(translate('listen'))
  }
}


