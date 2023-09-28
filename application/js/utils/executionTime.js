var logMessage =""; // Variabile per memorizzare tutte le azioni dell'utente

var startTime, globalTime; // Variabile per memorizzare il tempo di inizio di un'azione
var prevTime = 0; // Variabile per memorizzare il tempo di esecuzione

// Funzione per calcolare il tempo di esecuzione di un task
function getExecutionTaskTime() {
    var currentTime = new Date();
    var taskTime  
    taskTime = currentTime - startTime 
  
    realTime = taskTime - prevTime
    prevTime = taskTime
    return Math.abs(realTime);
  }
  
  // Funzione per calcolare il tempo di esecuzione di un task
  function getExecutionGlobalTime() {
    var currentTime = new Date();
  
    var executionTime = currentTime - globalTime;
    
    return executionTime
  }
  
  
  // Funzione per registrare l'azione dell'utente
  function logAction(action,executionTime, value="" ,speakTime = 0) {
    var currentTime = new Date();
    var formattedTime = currentTime.getTime();
    logMessage +=formattedTime+ ';'+ action+ ';'+ value + ";" + (executionTime - speakTime)+ '\n';
  }
  
  // Funzione per inizializzare il tempo 
  function initializeTime() {
    startTime = new Date();
    prevTime = 0;
  }
  
  // Funzione per inizializzare il tempo 
  function initializeGlobalTime() {
    globalTime = new Date();
  }