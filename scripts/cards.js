/*
 * ----------------------------------------------------------------
 * Variables
 * ----------------------------------------------------------------
 */

// Strings and Objects

// GettersElements
const clientName = document.getElementById('clientName');
const clientCPF = document.getElementById('clientCPF');
const clientDescription = document.getElementById('clientDescription');
const clientServiceValue = document.getElementById('clientServiceValue');

// Numbers
var idCard = 0;


/*
 * ----------------------------------------------------------------
 *  Event Listeners
 * ----------------------------------------------------------------
 */


/* ----------------------------------------------------------------
 * Functions 
 * ----------------------------------------------------------------
 */

// Use cards from localstorage
function useCard(id) {
    console.log(id.value);
    idCard = id.value;

    obj = JSON.parse(localStorage.getItem(key));

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