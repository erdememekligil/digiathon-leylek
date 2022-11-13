const {ipcRenderer} = require('electron');

console.log("approval-requests.js triggered")

function pollApprovalRequests() {
    console.log("polling approval-requests");

    setTimeout(pollApprovalRequests, 5000);
}

$(document).ready(function () {
    console.log("approval-requests.js ready");
    pollApprovalRequests();
});

window.appRequests = window.appRequests || {},
    function(n) {
        appRequests.messaging = {

            approveEvent: function() {
                console.log("approved");
                ipcRenderer.send('approveRequest', 'an-argument');
            },

            init: function() {
                $('#open-secondwindow-button').click( function () {

                })
            }
        };

        n(function() {
            ipc.messaging.init();
        })

    }(jQuery);
