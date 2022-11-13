const {ipcRenderer} = require('electron')

window.ipc = window.ipc || {},
function(n) {
    ipc.messaging = {

      sendOpenSecondWindowEvent: function() {
        ipcRenderer.send('open-second-window', 'an-argument')
      },

      sendCloseSecondWindowEvent: function() {
        ipcRenderer.send('close-second-window', 'an-argument')
      },
      sendRequestFormSubmitEvent: function(holderAddress, docs) {
        ipcRenderer.send('submitRequestForm', holderAddress);
      },

      init: function() {
        $('#open-secondwindow-button').click( function () {
          ipc.messaging.sendOpenSecondWindowEvent()
        })

        $('#close-me-button').click( function () {
          ipc.messaging.sendCloseSecondWindowEvent()
        })

        $('#document-request-form').submit(function (event) {
            console.log("form submit", event);
            event.preventDefault();
            let holderAddress = $('#request-from').val();
            let docs = $('#request-docs').children().each( function(){console.log(this.innerText)});
            ipc.messaging.sendRequestFormSubmitEvent(holderAddress, docs);
        })
      }
    };

    n(function() {
        ipc.messaging.init();
    })

}(jQuery);
