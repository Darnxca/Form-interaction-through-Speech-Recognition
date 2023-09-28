var prevIll = null // elemento precedentemente illuminato
var activeSelect

function illumina(element){

  if(prevIll == null){
    prevIll = element
  } else {
    prevIll.css({
      'background-color': ''  // Rimuovi il valore specificato per tornare al valore predefinito
    });
    prevIll = element
  }

  element.css({
    'background-color': 'yellow'
  });
  
}


function getScrollingNum(scroll){
  if (/^\d+$/.test(scroll)) {
    // è un numero
    return scroll
  } else {
    // non è un numero
    scroll_value =convertWordToNumber(scroll,language)
    if(isNaN(scroll_value)){
      return 10
    } else{
      return scroll_value
    }
  }
}

// Funzione per scorrere gli elementi della select
function selectUpDown(action, select, scroll = 1) {

  scroll=getScrollingNum(scroll)
  // Scorrimento verso l'alto
  if (action === "up") {
    var selectedIndex = select.prop("selectedIndex");
    select.prop("selectedIndex", selectedIndex - scroll);
    //select.val(select.val()); // Aggiornare la selezione visiva
  }

  // Scorrimento verso il basso
  if (action === "down") {
    var selectedIndex = select.prop("selectedIndex");
    select.prop("selectedIndex", selectedIndex + scroll);
    //select.val(select.val()); // Aggiornare la selezione visiva
  }
}

// Funzione per prendere la select con il focus corrente
function getFocusedSelect() {
  var $selectWithFocus = $("select").filter(":focus");
  
  if ($selectWithFocus.length > 0) {
    return $selectWithFocus;
  }
}

function openMenu(selectElement) {

    if (selectElement) {
      // Chiude tutti i menu aperti precedentemente
      closeAllMenus();
      selectElement.attr("size", 5);
      selectElement.css({
        "max-height": "200px",
        "overflow": "auto"
      });
  
      activeSelect = selectElement
    }
  }
  
  function closeAllMenus() {
    const allSelects = document.querySelectorAll('select');
    allSelects.forEach((select) => {
      select.size = 1;
    });
  }
  
  function closeMenu(selectElement) {
    if (activeSelect) {
      selectElement.attr("size", 1)
      activeSelect = null;
    } else {
      console.log("Nessun menu aperto. Apri un menu prima di chiuderlo");
    }
  }