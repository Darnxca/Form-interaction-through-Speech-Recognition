$(document).ready(function() {
    updateSelectedLanguage()

    $('.flag-checkbox').click(function() {
        var language = $(this).val();
        saveSelectedLanguage(language);
        updateSelectedLanguage();
    });

    // Carica la lingua selezionata dal coocki
    function loadSelectedLanguage() {
        var language = localStorage.getItem('selectedLanguage');
            if (language) {
                checkFlag(language)
            } else {
                language = "en-US"
                checkFlag(language)
            }
        return language
    }

    function checkFlag(language){
        $('.flag-checkbox').prop('checked', false);
        $('.flag-image').removeClass('selected');
        $('.flag-checkbox[value="' + language + '"]').prop('checked', true);
        $('.flag-checkbox[value="' + language + '"]').next('.flag-image').addClass('selected');
    }
    // Salva la lingua selezionata nel file JSON
    function saveSelectedLanguage(language) {
        localStorage.setItem('selectedLanguage', language);
    }

    // Aggiorna la lingua selezionata sulla pagina
    function updateSelectedLanguage() {
        var selectedLanguage = loadSelectedLanguage();
        // Esegui le azioni necessarie per l'aggiornamento della pagina in base alla lingua selezionata
        if (selectedLanguage === 'en-US') {
            // Lingua selezionata: Inglese
            $('#lingua').text('Select language:')
            $('#mydiv h1').text('Quick Links');
            $('.grid:nth-child(1) a').text('Command mode');
            $('.grid:nth-child(2) a').text('Dialogued mode');
            $('.grid:nth-child(3) a').text('Interacted mode');
            $('.grid:nth-child(4) a').text('Mixed mode');

            $('#1').text('Experiment signup')
            $('#2').text('Experiment registration')
            $('#3').text('Experiment description')
            $('#4').text('Experiment select')
            $('#5').text('Experiment train')
        } else if (selectedLanguage === 'it-IT') {
            // Lingua selezionata: Italiano
            $('#lingua').text('Seleziona la lingua:')
            $('#mydiv h1').text('Collegamenti rapidi');
            $('.grid:nth-child(1) a').text('Modalità comando');
            $('.grid:nth-child(2) a').text('Modalità dialogo');
            $('.grid:nth-child(3) a').text('Modalità interattiva');
            $('.grid:nth-child(4) a').text('Modalità mista');

            $('#1').text('Esperimento iscrizione')
            $('#2').text('Esperimento registrazione')
            $('#3').text('Esperimento descrizione')
            $('#4').text('Esperimento select')
            $('#5').text('Esperimento train')
        }
        checkFlag(selectedLanguage)
    }
});