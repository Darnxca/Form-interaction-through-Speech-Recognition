console.log(language) //lingua

caricaRegEx()

$("#listening").html(translate('notListen'))
$("#feedback").html(translate('feedback'))
$("#t").text(translate('text'))
$("#v").text(translate('vocal'))


function selezionaElemento(nomeCampo, valore) {
  var $select = $("#" + nomeCampo);
  var $option = $select.find('option[value="' + valore + '"]');

  if ($option.length) {
    $select.val(valore);
    risposta = 'Item ' + valore + ' selected';

    // scrittura del log
    executionTime = getExecutionTaskTime()
    actionMessage = "Selezione del valore "+ valore + " nella select "+ nomeCampo
    logAction(actionMessage, executionTime, valore)
    console.log(logMessage)
  } else {
    menu=document.getElementById(nomeCampo);
    popup= document.getElementById("popup");
    mostraPopup($select,menu,valore,popup,1,nomeCampo,recognition)
  }

  closeMenu($select)
  illumina($select)
  $("#listening").html(translate('listen'))

}
// Aggiungere un listener per l'evento "result"
recognition.onresult = function (event) {
  $("#listening").html(translate('notListen'))

  // Ottenere il testo riconosciuto
  var testoRiconosciuto = event.results[event.results.length - 1][0].transcript.toLowerCase();
  testoRiconosciuto = testoRiconosciuto.trim()
  console.log(testoRiconosciuto)

  //testoRiconosciuto = "input residence value mpton" // query di test
  // data di nascita in inglese dire il pattern twenty-three ten nineteen ninety-six

  // Esegui la corrispondenza regex sulla stringa di input
  var commandField = testoRiconosciuto.match(regexCommandFillField)
  var commandOpen = testoRiconosciuto.match(regexCommandOpen)
  var commandClose = testoRiconosciuto.match(regexCommandClose)
  var commandUp = testoRiconosciuto.match(regexCommandUp)
  var commandDown = testoRiconosciuto.match(regexCommandDown)
  var commandDeselect = testoRiconosciuto.match(regexCommandDeselect)
  var commandScrollUp = testoRiconosciuto.match(regexCommandScrollUp)
  var commandScrollDown = testoRiconosciuto.match(regexCommandScrollDown)

  risposta = "" // risposta dello speaker

  // primo if match per inserire un valore in un campo
  if (commandField) {
    // matches[1] conterrà il nome del campo

    var nomeCampo = getSimilarField(commandField[1].trim())

    // matches[2] conterrà il valore
    var valore = commandField[2];

    var $field = $("#" + nomeCampo);

    if ($field.is("select")) {
      selezionaElemento(nomeCampo, valore)
    } else {

      if(nomeCampo === "email"){
        valore = valore.replace(regexEmail, "@");
        valore = valore.replace(/\s/g, "");
      }

      if($field.is('[type="date"]')){
        var parts = valore.match(/\d+/g);
        if (parts.length === 3) {
          var day = parts[0];
          var month = parts[1];
          var year = parts[2];

          valore = year+"-"+month+"-"+day
        } else {
          $("#listening").html(translate('notListen'))

          var attendo = checkSelezione(translate('errorDate'))
      
          if(attendo == 2 || attendo == 1) {recognition.stop()}
        }
      }

      if($field.attr('name') === "password")
        valore = valore.replace(/\s/g, "");

      $field.val(valore)

      illumina($field)
      // scrittura del log
      executionTime = getExecutionTaskTime()
      actionMessage = "Inserimento del valore "+ valore + " nel campo "+ nomeCampo
      logAction(actionMessage, executionTime, valore)
      $("#listening").html(translate('listen'))
    }
  } else if (commandOpen) {
    // matches[1] conterrà il nome del campo
    var nomeCampo  = getSimilarField(commandOpen[1].trim())
    var $select = $("#" + nomeCampo);

    openMenu($select)

    executionTime = getExecutionTaskTime()
    actionMessage = "Apertura della select"+  nomeCampo
    logAction(actionMessage, executionTime, nomeCampo)
    console.log(logMessage)
    $("#listening").html(translate('listen'))
        
    
  } else if(commandClose && activeSelect){
    var nomeCampo  = getSimilarField(commandClose[1].trim())
    var $select = $("#" + nomeCampo);
    closeMenu($select)

    illumina($select)

    executionTime = getExecutionTaskTime()
    actionMessage = "Chiusura della select "+  nomeCampo
    logAction(actionMessage, executionTime, nomeCampo)
    console.log(logMessage)
    $("#listening").html(translate('listen'))

  }else if(commandUp && activeSelect) {
    
    nomeCampo = activeSelect.attr('name')
    var $select = activeSelect

  
    selectUpDown("up",$select)

    // scrittura del log
    executionTime = getExecutionTaskTime()
    actionMessage = "Esecuzione up nella select "+ nomeCampo
    logAction(actionMessage, executionTime, nomeCampo)
    console.log(logMessage)
    $("#listening").html(translate('listen'))
    
  }else if(commandDown  && activeSelect){ // && focusedSelect 
    nomeCampo = activeSelect.attr('name')
    var $select = activeSelect

    selectUpDown("down",$select)

    // scrittura del log
    executionTime = getExecutionTaskTime()
    actionMessage = "Esecuzione down nella select "+ nomeCampo
    logAction(actionMessage, executionTime, nomeCampo)
    console.log(logMessage)
    $("#listening").html(translate('listen'))
    
  } else  if (commandScrollUp && activeSelect) {
    nomeCampo = activeSelect.attr('name')
    var $select = activeSelect
    var scrollValue = commandScrollUp[1]

    selectUpDown("up",$select, scrollValue)

    // scrittura del log
    executionTime = getExecutionTaskTime()
    actionMessage = "Esecuzione scroll up nella select "+ nomeCampo
    logAction(actionMessage, executionTime, nomeCampo)
    console.log(logMessage)
    $("#listening").html(translate('listen'))

  } else  if (commandScrollDown && activeSelect) {
    nomeCampo = activeSelect.attr('name')
    var $select = activeSelect
    var scrollValue = commandScrollDown[1]

    selectUpDown("down",$select, scrollValue)

    // scrittura del log
    executionTime = getExecutionTaskTime()
    actionMessage = "Esecuzione scroll down nella select "+ nomeCampo
    logAction(actionMessage, executionTime, nomeCampo)
    console.log(logMessage)
    $("#listening").html(translate('listen'))

  } else if (commandDeselect && activeSelect) {
    // matches[1] conterrà il nome del campo
    var nomeCampo = commandOpen[1];
       
    var $select = $("#" + nomeCampo);
    $select.val();
    illumina($select)

    // scrittura del log
    executionTime = getExecutionTaskTime()
    actionMessage = "Deselezione della select "+ nomeCampo
    logAction(actionMessage, executionTime, nomeCampo)
    console.log(logMessage)
    $("#listening").html(translate('listen'))
    
  } else if(activeSelect) {
      
    selezionaElemento(activeSelect.attr('id'), testoRiconosciuto)

  } else if(testoRiconosciuto.includes("stop")){
    actionMessage = "Fine recognition - comando vocale stop "
    
    // scrittura del log
    executionTime = getExecutionGlobalTime()
    logAction(actionMessage, executionTime)
    console.log(logMessage)
    recognition.stop()
    $("#listening").html(translate('notListen'))

  }else /*altri match o errori */ {
    $("#listening").html(translate('listen'));

    var attendo = checkSelezione(translate('error', { errore: testoRiconosciuto}))
 
    if(attendo == 2 || attendo == 1) {
      $("#listening").html(translate('notListen'));
      recognition.stop()
    }
    // scrittura del log
    executionTime = getExecutionTaskTime()
    actionMessage = "Errore comando "+ testoRiconosciuto + " non capito"
    logAction(actionMessage, executionTime, testoRiconosciuto)
    console.log(logMessage)
  }
};


function startExperiment(){
  initializeGlobalTime()
  executionTime = getExecutionGlobalTime()
  logAction("Avvio esperimento 1 ",executionTime)

  initializeTime()

  $("#listening").html(translate('listen'))
  startRecognition()
}

function stopExperiment(){
  $("#div-activate").removeClass('pulse-ring');
  $("#speech-activate").addClass('type2');
  $("#listening").html(translate('notListen'))
  var executionTime = getExecutionGlobalTime()
  logAction("Fine recognition - premuto pulsante stop ",executionTime)
  recognition.stop()
}

$('#submitButton').click(function() {
  var experiment = $(this).attr('name')
  var executionTime = getExecutionGlobalTime()
  logAction("Fine esperimento 1 ",executionTime)

  location.reload(); // Ricarica la pagina corrente

  colonne = "Timestamp; Azione; Valore; Tempo di esecuzione (ms)"
  logMessage = colonne +"\n"+logMessage
  saveFile(logMessage, 'Experiment_command_mode_'+experiment+'.csv');
  
});

makeComand(1)





