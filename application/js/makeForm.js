
// Funzione per leggere il file JSON
function leggiJSON(fileName, callback) {
  $.getJSON(fileName, function(data) {
    callback(data);
  });  
}

function make_Form(formDetails){
  // Creazione dell'elemento form utilizzando $("<form></form>")
  var form = $("<form></form>").attr({
    "action": formDetails.action, // Impostazione dell'attributo "action" del form specificato in formDetails.action
    "method": formDetails.method, // Impostazione dell'attributo "method" del form specificato in formDetails.method
    "name": formDetails.name, // Impostazione dell'attributo "name" del form specificato in formDetails.name
    "id": formDetails.id // Impostazione dell'attributo "id" del form specificato in formDetails.id
  });
  
  // Restituzione dell'elemento form creato
  return form;
}
  

function make_TextArea(field){
  // Creazione dell'elemento textarea utilizzando $("<textarea></textarea>")
  var textArea = $("<textarea></textarea>").addClass("form-control").attr({
    "name": field.name, // Impostazione del nome del campo specificato nel campo "name"
    "id": field.id // Impostazione dell'ID del campo specificato nel campo "id"
  });

  // Restituzione dell'elemento textarea creato
  return textArea;
}


function make_Select(field){
  // Creazione dell'elemento select con la classe "form-control"
  var select = $("<select></select>").addClass("form-control js-example-basic-single")
      
  // Impostazione degli attributi id e name dell'elemento select
  select.attr({
    "id": field.id,
    "name": field.name
  });

  // Iterazione attraverso le opzioni del campo
  field.options.forEach(function(option) {
    // Creazione dell'elemento option con il testo dell'opzione
    var optionElement = $("<option></option>").html(option).attr({
      "value":option.toLowerCase()
    });
  
    // Aggiunta dell'elemento option all'elemento select
    select.append(optionElement);
  });


  return select;
}


function make_Button(field){
  // Creazione dell'elemento button con le classi "btn" e "btn-primary"
  var button = $("<button></button>").addClass("btn btn-primary");
  
  // Impostazione degli attributi type, name, id e value dell'elemento button
  button.attr({
    "type": "button",
    "name": field.name,
    "id": field.id,
    "value": field.value
  }).html(field.value);

  // Aggiunta dell'evento click all'elemento button
  button.on("click", function() {
    // Esecuzione della funzione specificata nel campo "action" tramite eval()
    eval(field.action);
  });
  
  // Controllo se è presente un'icona specificata nel campo "icon"
  if (field.icon) {
    // Creazione dell'elemento <i> con la classe specificata nel campo "icon"
    var icon = $("<i></i>").addClass(field.icon);
    // Aggiunta dell'elemento icon all'elemento button
    button.append(icon);
  }

  // Restituzione dell'elemento button
  return button;
}

function make_InputText(field){
  // Creazione dell'elemento input utilizzando $("<input></input>")
  var input = $("<input></input>").attr({
    "type": field.type, // Impostazione del tipo di input specificato nel campo "type"
    "name": field.name, // Impostazione del nome del campo specificato nel campo "name"
    "id": field.id // Impostazione dell'ID del campo specificato nel campo "id"
  }).addClass("form-control"); // Aggiunta della classe CSS "form-control" all'elemento input

  // Restituzione dell'elemento input creato
  return input;
}

var azioneCorrente
function add_button_if_present(inputGroup, field){
  // Verifica se è presente un oggetto "button" nel campo
  if (field.button && field.button.action) {
    // Creazione del div che conterrà il button group e aggiunta della classe "input-group-append"
    var buttonGroup = $("<div></div>").addClass("input-group-append my-speech-button");
    inputGroup.append(buttonGroup); // Aggiungi il button group come figlio dell'input group

    nome = field.button.name
    id = field.button.id
    // Creazione dell'elemento button con le classi "btn" e "btn-primary" e l'attributo "type" impostato a "button"
    var button = $("<button></button>").addClass("btn btn-primary").attr({
      "type": "button",
      "name":nome,
      "id":id,
      "data-action": field.button.action
    });

    // Controllo se è presente un'icona specificata nel campo "button.icon"
    if (field.button.icon) {
      // Creazione dell'elemento <i> con la classe specificata nel campo "button.icon"
      var icon = $("<i></i>").addClass(field.button.icon);
      // Aggiunta dell'elemento icon all'elemento button
      button.append(icon);
    }

    buttonGroup.append(button); // Aggiungi il pulsante all'input group
  
  }
}


// Funzione per creare il form utilizzando i dati JSON
function makeForm(jsonData) {
  // Estrazione dei dati dei campi e dei dettagli del form dal JSON
  var fields = jsonData.fields;
  var formDetails = jsonData.form;

  // Seleziono il contenitore del form nel documento HTML utilizzando l'id "form-container"
  var formContainer = $("#form-container");

  // Creazione dell'elemento <form> utilizzando i dettagli specificati nel JSON
  var formElement = make_Form(formDetails);
  
  // Aggiunta del form al contenitore del form nel documento HTML
  formContainer.append(formElement);

  var row;

  // Posizionamento degli elementi a coppie sulle righe
  fields.forEach(function(field, index) {
    // Verifica se l'indice del campo è pari (inizia da 0)
    if (index % 2 === 0) {
      // Creazione di un nuovo elemento <div> con la classe "row" per rappresentare una nuova riga
      row = $("<div></div>").addClass("row");
      // Aggiunta della riga al form
      formElement.append(row);
    }

    // Creazione di un nuovo elemento <div> con la classe "col-md-6" per rappresentare una colonna di larghezza media
    var col = $("<div></div>").addClass("col-md-6");
    // Aggiunta della colonna alla riga corrente
    row.append(col);

    // Creazione di un nuovo elemento <div> con la classe "form-group" per rappresentare un gruppo di elementi di form
    var formGroup = $("<div></div>").addClass("form-group");
    // Aggiunta del gruppo di form alla colonna corrente
    col.append(formGroup);

    // Creazione di un nuovo elemento <div> per il label e del relativo elemento <label> con il testo del campo e l'attributo "for" impostato a field.id
    var labelDiv = $("<div></div>");
    var label = $("<label></label>").html(field.label).attr("for", field.id);
    labelDiv.append(label);
    // Aggiunta del label al gruppo di form
    formGroup.append(labelDiv);

    // Creazione di un nuovo elemento <div> con la classe "input-group" per rappresentare un gruppo di input
    var inputGroup = $("<div></div>").addClass("input-group");
  
    var input;
    // Controllo del tipo di campo specificato nel JSON
    if (field.type === "textarea") {
      // Creazione di un campo di testo multi-riga utilizzando la funzione make_TextArea
      input = make_TextArea(field);
    } else if (field.type === "select") {
      // Creazione di un menu a tendina utilizzando la funzione make_Select
      input = make_Select(field);
    } else if (field.type === "button") {
      // Creazione di un pulsante utilizzando la funzione make_Button
      input = make_Button(field);
    } else {
      // Creazione di un campo di testo singola riga utilizzando la funzione make_InputText
      input = make_InputText(field);
    }

    // Aggiunta dell'input al gruppo di input
    inputGroup.append(input);

    // Aggiunta del gruppo di input al gruppo di form
    formGroup.append(inputGroup);

    // Aggiunta del pulsante, se presente nel campo, al gruppo di input
    add_button_if_present(inputGroup, field);
  });
}
