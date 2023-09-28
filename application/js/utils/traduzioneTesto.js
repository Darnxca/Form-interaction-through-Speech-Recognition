var translations = {
    'it-IT': {
      'listen': 'Sto ascoltando!',
      'notListen': 'Non sto ascoltando!',
      'feedback': "Feedback errore:",
      'text': "Testuale",
      'vocal': 'Vocale',
      'insertCampo':"Inserisci valore per il campo {elemento}",
      'select': 'Le opzioni per la lista {select} sono',
      'option': 'Vuoi selezionare {option} ?',
      'popup':  'Forse intendevi...',
      'TutorialHeader':'Comandi utilizzabili',
      'InserireValore': 'Per inserire un valore in un campo: ',
      'ComandoInput': 'dire input "nome_campo" ',
      'Valore': 'valore ',
      'ValoreDaInserie': '"valore_da_inserire"',
      'Select': 'Per le select: ',
      'Apri': 'dire apri "nome_select" ',
      'Chiudi': 'dire chiudi "nome_select" ',
      'Sali': 'dire sali per scorrere di un valore verso l\'alto la select ',
      'Sali1': 'dire sali "numero" per scorrere del numero di valori verso l\'alto la select',
      'Scendi': 'dire scendi per scorrere di un valore verso il basso la select ',
      'Scendi1': 'dire scendi "numero" per scorrere del numero di valori verso il basso la select ',
      'error': "Comando o frase {errore} non capita",
      "errorRecognition": "Errore sul riconoscimento vocale!",
      "errorDate":"Formato data non valido"
    },
    'en-US': {
      'listen': 'I\'m listening!',
      'notListen': 'I\'m not listening!',
      'feedback': "Error feedback:",
      'text': "Textual",
      'vocal': 'Vocal',
      'insertCampo':"Insert value for the field  {elemento}",
      'select': 'The option for the select {select} are',
      'option': 'Do you want to select {option} ?',
      'popup':  'Maybe you meant...',
      'TutorialHeader':'Usable commands',
      'InserireValore': 'To enter a value in a field: ',
      'ComandoInput': 'input say_the_name_of_the_field ',
      'Valore': 'value',
      'ValoreDaInserie': 'say_the_value_to_enter',
      'Select': 'For selects: ',
      'Apri': 'say open name_of_select ',
      'Chiudi': 'say close name_of_select ',
      'Sali': 'say up to scroll up the select by one value ',
      'Sali1': 'say up say_a_number to scroll up the select by the number of values ',
      'Scendi': 'say down to scroll down the select one value',
      'Scendi1': 'say down say_a_number to scroll down the select by the number of values ',
      "error": "Command or phrase {errore} does not understand",
      "errorRecognition": "Speech recognition error!",
      "errorDate":"Invalid date format"
    },
    // Aggiungi altre lingue e relative traduzioni qui
  };
  
    
function translate(key, variables) {
    if (translations[language] && translations[language][key]) {
      var translation = translations[language][key];
      if (variables) {
        for (var variable in variables) {
          var placeholder = '{' + variable + '}';
          translation = translation.replace(placeholder, variables[variable]);
        }
      }
      return translation;
    } else {
      // Se la traduzione per la chiave specificata non è disponibile nella lingua corrente,
      // restituisci la stessa chiave come fallback
      return key;
    }
  }
