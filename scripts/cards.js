/*
 * ----------------------------------------------------------------
 * Variables
 * ----------------------------------------------------------------
 */

// Strings and Objects
let key = 'clients';
var obj = [];

// GettersElements
let clientName = document.getElementById('clientName');
let clientCPF = document.getElementById('clientCPF');
let clientDate = document.getElementById('clientDate');
let clientDescription = document.getElementById('clientDescription');
let clientServiceValue = document.getElementById('clientServiceValue');

// Numbers
var idCard = 0;
var year = clientDate.value.slice(0,4);
var month = clientDate.value.slice(5,7);
var day = clientDate.value.slice(8,10);

/*
 * ----------------------------------------------------------------
 *  Event Listeners
 * ----------------------------------------------------------------
 */

clientDate.addEventListener('change', function(e) {
    completeClientDescription(e);
});


/* ----------------------------------------------------------------
 * Functions 
 * ----------------------------------------------------------------
 */

function completeClientDescription() {
    year = clientDate.value.slice(0,4);
    month = clientDate.value.slice(5,7);
    day = clientDate.value.slice(8,10);

    clientDescription.value = obj[idCard].clientDescription + day + "/" + month + "/" + year + ".";
}

function useCard(id) {
    idCard = id.value;

    obj = JSON.parse(localStorage.getItem('clients'));

    clientName.value = obj[idCard].responsibleName;
    clientCPF.value = obj[idCard].responsibleCPF;
    clientServiceValue.value = obj[idCard].clientServiceValue;
    clientDate.value = "";
    clientDescription.value = "";
}

function deleteCard(id) {
    let cardToBeDeleted = document.getElementById(`card-client-${id.value}`);
    cardToBeDeleted.parentNode.removeChild(cardToBeDeleted);

    deleteCardOnLocalStorage(id);
    location.reload();
}

function deleteCardOnLocalStorage(id) {
    obj = JSON.parse(localStorage.getItem('clients'));
    obj.splice(id.value, 1);

    localStorage.setItem(key, JSON.stringify(obj));
}