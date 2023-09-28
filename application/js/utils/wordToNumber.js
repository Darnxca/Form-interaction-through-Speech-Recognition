// Dizionario di parole numeriche e i loro valori corrispondenti per entrambe le lingue
const wordToNumber = {
    "it-IT": {
      "uno": 1,
      "due": 2,
      "tre": 3,
      "quattro":4,
      "cinque":5,
      "sei":6,
      "sette":7,
      "otto":8,
      "nove":9,
      "dieci":10,
      "udici": 11,
      "dodici": 12,
      "tredici": 13,
      "quattordici":14,
      "quindici":15,
      "sedici":16,
      "diciasette":17,
      "diciotto":18,
      "dicianove":19,
      "venti":20
      // Aggiungi altre parole numeriche in italiano
    },
    "en-US": {
      "one": 1,
      "two": 2,
      "three": 3,
      "four":4,
      "five":5,
      "six":6,
      "seven":7,
      "eight":8,
      "nine":9,
      "ten":10,
      "eleven": 11,
      "twelve": 12,
      "thirteen": 13,
      "fourteen": 14,
      "fifteen": 15,
      "sixteen": 16,
      "seventeen": 17,
      "eighteen": 18,
      "nineteen": 19,
      "twenty": 20
      // Aggiungi altre parole numeriche in inglese
    }
  };
  
  // Funzione per convertire le parole numeriche nella lingua corrispondente
  function convertWordToNumber(word, language) {
    const languageDictionary = wordToNumber[language];
    if (languageDictionary) {
      return languageDictionary[word] || NaN;
    }
    return NaN;
  }