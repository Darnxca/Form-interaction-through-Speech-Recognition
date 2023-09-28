// Esempio di stringa generica "input surname value 20"
var regexCommandFillField;
// regex open
var regexCommandOpen;
// regex close
var regexCommandClose;
// regex close popup
var regexCommandClosePopup
// up
var regexCommandUp;
// down
var regexCommandDown;
// scroll up
var regexCommandScrollUp;
// scroll down
var regexCommandScrollDown;
// deselect select name
var regexCommandDeselect;
// select value valore
var regexSelectValue;

function caricaRegEx(){
  if (language === "it-IT") {
    regexCommandFillField = /input\s+([\w\sàèìòù]+)\s+valore\s+(.+)/i;
    regexCommandOpen = /^apri (\w+)$/;
    regexCommandClose = /^chiudi (\w+)$/;
    regexCommandClosePopup = /^chiudi$/;
    regexCommandUp = /^sali$/;
    regexCommandDown = /^scendi$/;
    regexCommandScrollUp = /^sali\s*(\w+)$/;
    regexCommandScrollDown = /^scendi\s*(\w+)$/;
    regexCommandDeselect = /^deseleziona selezione (\w+)$/;
    regexEmail = /chiocciola/g;
  } else if (language === "en-US") {
    regexCommandFillField = /input\s+([\w\sàèìòù]+)\s+value\s+(.+)/i;
    regexCommandOpen = /^open (\w+)$/;
    regexCommandClose = /^close (\w+)$/;
    regexCommandClosePopup = /^close$/;
    regexCommandUp = /^up$/;
    regexCommandDown = /^down$/;
    regexCommandScrollUp = /^up (\w+)$/;
    regexCommandScrollDown = /^down (\w+)$/;
    regexCommandDeselect = /^deselect select (\w+)$/;
    regexEmail = /at/g;
  } else {
    // Lingua non supportata, assegna espressioni regolari di fallback o gestisci l'errore
    // ad esempio:
    throw new Error("Lingua non supportata");
  }
}