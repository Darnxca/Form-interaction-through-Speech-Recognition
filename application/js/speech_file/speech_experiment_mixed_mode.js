console.log(language) //lingua

caricaRegEx()
$("#listening").html(translate('notListen'))
$("#feedback").html(translate('feedback'))
$("#t").text(translate('text'))
$("#v").text(translate('vocal'))

// Aggiungere un listener per l'evento "result"
recognition.onresult = function (event) {
  $("#listening").html(translate('notListen'))
  // Ottenere il testo riconosciuto
  var testoRiconosciuto = event.results[event.results.length - 1][0].transcript.toLowerCase();
  testoRiconosciuto = testoRiconosciuto.trim()

  //testoRiconosciuto = "carminedacchiocciolagmail.com"

  console.log(testoRiconosciuto)
  
  var commandUp = testoRiconosciuto.match(regexCommandUp)
  var commandDown = testoRiconosciuto.match(regexCommandDown)
  var commandScrollUp = testoRiconosciuto.match(regexCommandScrollUp)
  var commandScrollDown = testoRiconosciuto.match(regexCommandScrollDown)
 
  focusedSelect = getFocusedSelect()

  if(commandUp && focusedSelect) {
    $("#listening").html(translate('Listen'))
    selectUpDown("up",focusedSelect)
    nomeCampo = focusedSelect.attr('name')

    executionTime = getExecutionTaskTime()
    actionMessage = "Esecuzione up nella select "+ nomeCampo
    logAction(actionMessage , executionTime, nomeCampo)
    console.log(logMessage)
  }else if(commandDown && focusedSelect) {
    $("#listening").html(translate('Listen'))
    selectUpDown("down",focusedSelect)        

    nomeCampo = focusedSelect.attr('name')
    
    executionTime = getExecutionTaskTime()
    actionMessage = "Esecuzione down nella select "+ nomeCampo
    logAction(actionMessage , executionTime, nomeCampo)
    console.log(logMessage)
  } else  if (commandScrollUp && focusedSelect) {
    nomeCampo = focusedSelect.attr('name')
    var $select = focusedSelect
    var scrollValue = commandScrollUp[1]
    $("#listening").html(translate('Listen'))
    selectUpDown("up",$select, scrollValue)

    // scrittura del log
    executionTime = getExecutionTaskTime()
    actionMessage = "Esecuzione scroll up nella select "+ nomeCampo
    logAction(actionMessage , executionTime, nomeCampo)
    console.log(logMessage)

  } else  if (commandScrollDown && focusedSelect) {
    nomeCampo = focusedSelect.attr('name')
    var $select = focusedSelect
    var scrollValue = commandScrollDown[1]
    $("#listening").html(translate('Listen'))
    selectUpDown("down",$select, scrollValue)

    // scrittura del log
    executionTime = getExecutionTaskTime()
    actionMessage = "Esecuzione scroll down nella select "+ nomeCampo
    logAction(actionMessage , executionTime, nomeCampo)
    console.log(logMessage)

  } else  if(testoRiconosciuto!= ""){
    var value = testoRiconosciuto;

    if (azioneCorrente.is("select")){
      var $select = azioneCorrente;
      var nomeCampo = $select.attr('name')
      var $option = $select.find('option[value="' + value + '"]');

      if ($option.length) {
        $select.val(value);
        risposta = 'Item ' + value + ' selected.';

        executionTime = getExecutionTaskTime()
        actionMessage = "Selezione del valore "+ value + " nella select "+ nomeCampo
        logAction(actionMessage, executionTime, value)
        console.log(logMessage)
      } else {
        menu=document.getElementById(nomeCampo);
        popup= document.getElementById("popup");
        mostraPopup($select,menu,value,popup,3,nomeCampo,recognition)
      }
      
      closeMenu($select)
      $select.blur();
    } else {

      if(azioneCorrente.attr('id') === "email"){
        value = value.replace(regexEmail, "@");
        value = value.replace(/\s/g, "");
      }

      if(azioneCorrente.is('[type="date"]')){
        var parts = value.match(/\d+/g);
        if (parts.length === 3) {
          var day = parts[0];
          var month = parts[1];
          var year = parts[2];

          value = year+"-"+month+"-"+day
        } else {
          $("#listening").html(translate('notListen'))

          var attendo = checkSelezione(translate('errorDate'))
      
          if(attendo == 2 || attendo == 1) {recognition.stop()}
        }
      }

      nomeCampo = azioneCorrente.attr('name')
      if(nomeCampo === "password") 
        value = value.replace(/\s/g, "");

      azioneCorrente.val(value)

   

      executionTime = getExecutionTaskTime()
      actionMessage = "Inserimento del valore "+ value + " nel campo "+ nomeCampo
      logAction(actionMessage,executionTime, value)
      console.log(logMessage)
      recognition.stop()
    }
  
    recognition.stop()
  }else /*altri match o errori */ {

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


$('#submitButton').click(function() {
  var experiment = $(this).attr('name')
  var executionTime = getExecutionGlobalTime()
  logAction("Fine esperimento 4 ",executionTime)

  location.reload(); // Ricarica la pagina corrente

  colonne = "Timestamp; Azione; Valore; Tempo di esecuzione (ms)"
  logMessage = colonne +"\n"+logMessage
  saveFile(logMessage, 'Experiment_mixed_mode_'+experiment+'.csv');
  
});


function stopExperiment(){
  $("#div-activate").removeClass('pulse-ring');
  $("#speech-activate").addClass('type2');
  $("#listening").html(translate('notListen'))
  var executionTime = getExecutionGlobalTime()
  logAction("Fine recognition - premuto pulsante stop ",executionTime)
  console.log(logMessage)
  recognition.abort()
}


makeComand()