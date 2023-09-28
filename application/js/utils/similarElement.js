// Algoritmo della distanza di Levenshtein
function levenshteinDistance(a, b) {
  const matrix = [];

  // Inizializzazione della matrice
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = new Array(a.length + 1).fill(0);
    matrix[i][0] = i;
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Calcolo della distanza di Levenshtein
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // Sostituzione
          matrix[i][j - 1] + 1,     // Inserimento
          matrix[i - 1][j] + 1      // Cancellazione
        );
      }
    }
  }

  return matrix[b.length][a.length];
}


function findSimilarStrings(inputString, options, similarityThreshold) {
  const lowercaseInput = inputString.toLowerCase();
  const similarOptions = [];

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    const lowercaseOption = option.toLowerCase();
    const distance = levenshteinDistance(lowercaseInput, lowercaseOption);
    const similarityScore = 1 - distance / Math.max(lowercaseInput.length, lowercaseOption.length);

    if (similarityScore >= similarityThreshold) {
      similarOptions.push(option);
    }
  }

  return similarOptions;
}



/***/


function similaritaStringhe(stringa1, stringa2) {
  const lunghezzaMinima = Math.min(stringa1.length, stringa2.length);
  let similarita = 0;

  for (let i = 0; i < lunghezzaMinima; i++) {
    if (stringa1[i] === stringa2[i]) {
      similarita++;
    } else {
      break;
    }
  }

  return similarita;
}



// Algoritmo per trovare nelle option la stringa più vicina a quella data in input
function findClosestString(inputString, options) {
  let closestDistance = Infinity;
  let closestString = '';

  options.forEach((option) => {
    
    const distance = levenshteinDistance(option, inputString);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestString = option;
    }
    
  });

  return closestString;
}

function getSimilarField(field){
  const formId = 'experiment1'; // Sostituisci con l'ID del tuo form
  
    const elementNames = $(`#${formId} input, #${formId} select, #${formId} textarea`).map(function() {
      return $(this).prop('name');
    }).get();

  return findClosestString(field, elementNames)
}

function getSimilarString(select, valore){
  const options = select.find('option').map(function() {
    return $(this).text();
  }).get();

  return findClosestString(valore, options)
}