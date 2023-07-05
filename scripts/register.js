/*
 * ----------------------------------------------------------------
 * Variables
 * ----------------------------------------------------------------
 */

// Strings and Objects
let key = 'clients';
var obj = [];
var myClient = "";
var finalCPF = "";
var finalPhone = "";

// GettersElements
var back = document.getElementById('buttonBack');
var register = document.getElementById('btnRegister');
var divCards = document.getElementById('box-cards');
/*  Financial Responsible */
let financialResponsibleName = document.getElementById('financialResponsibleName');
let financialResponsibleCPF = document.getElementById('financialResponsibleCPF');
/*  Client */
let clientNameElement = document.getElementById('clientName');
let clientCPFElement = document.getElementById('clientCPF');
let clientEmailElement = document.getElementById('clientEmail');
let clientPhoneElement = document.getElementById('clientPhone');
let clientDescriptionElement = document.getElementById('clientDescription');
let clientServiceValueElement = document.getElementById('clientServiceValue');
/* CheckBox Financial Responsible is Client */
let checkReponsibleClient = document.getElementById('check-responsible-client');

// Numbers
var countCPF = 0;
var countPoints = 0;
var countPhone = 0;
var countCards = 0;
var lengthCPF = 0;
var lengthPhone = 0;

/*
 * ----------------------------------------------------------------
 *  Event Listeners
 * ----------------------------------------------------------------
 */

onload = function(e) {
    loadCards();
};

back.addEventListener('click', function(e) {
    window.history.back();
});

clientCPFElement.addEventListener('input', function(e) {
    lengthCPF = clientCPFElement.value.length;

    if (lengthCPF === 0) {
        countCPF = -1;
        countPoints = 0;
    } else if (lengthCPF === 14) {
        finalCPF = clientCPFElement.value;
    } else if (lengthCPF > 14) {
        clientCPFElement.value = finalCPF;
    }

    countCPF += 1;

    if (countCPF === 3) {
        if (countPoints === 2) {
            clientCPFElement.value = clientCPFElement.value + "-";
        } else {
            clientCPFElement.value = clientCPFElement.value + ".";
            countCPF = 0;
            countPoints += 1;
        }
    }
});

clientPhoneElement.addEventListener('input', function(e) {
    lengthPhone = clientPhoneElement.value.length;

    if (lengthPhone === 0) {
        countPhone = -1;
    } else if (lengthPhone === 15) {
        finalPhone = clientPhoneElement.value;
    } else if (lengthPhone > 15) {
        clientPhoneElement.value = finalPhone;
    }

    countPhone += 1;
    if (countPhone === 2) {
        clientPhoneElement.value = "(" + clientPhoneElement.value + ") ";
    } else if (countPhone === 7) {
        clientPhoneElement.value = clientPhoneElement.value + "-";
    }
});

register.addEventListener('click', function(e) {
    registerClient();
    e.preventDefault();
});

checkReponsibleClient.addEventListener('click', function(e) {
    if (e.target.checked) {
        disableFields();
    } else {
        enableFields();
    }
});

financialResponsibleCPF.addEventListener('input', function(e) {
    lengthCPF = financialResponsibleCPF.value.length;

    if (lengthCPF === 0) {
        countCPF = -1;
        countPoints = 0;
    } else if (lengthCPF === 14) {
        finalCPF = financialResponsibleCPF.value;
    } else if (lengthCPF > 14) {
        financialResponsibleCPF.value = finalCPF;
    }

    countCPF += 1;

    if (countCPF === 3) {
        if (countPoints === 2) {
            financialResponsibleCPF.value = financialResponsibleCPF.value + "-";
        } else {
            financialResponsibleCPF.value = financialResponsibleCPF.value + ".";
            countCPF = 0;
            countPoints += 1;
        }
    }
});

/*
 * ----------------------------------------------------------------
 *  Functions
 * ----------------------------------------------------------------
 */

function registerClient() {
    if (localStorage.hasOwnProperty('clients')) {
        obj = JSON.parse(localStorage.getItem('clients'));
    }

    if (financialResponsibleName.value == "" && financialResponsibleCPF.value == "") {
        obj.push({
            responsibleName: clientNameElement.value,
            responsibleCPF: clientCPFElement.value,
            clientName: clientNameElement.value,
            clientCPF: clientCPFElement.value,
            clientEmail: clientEmailElement.value,
            clientPhone: clientPhoneElement.value,
            clientDescription: `ao atendimento psicológico realizado em `,
            clientServiceValue: clientServiceValueElement.value
        })
    
        localStorage.setItem(key, JSON.stringify(obj));
    } else {
        obj.push({
            responsibleName: financialResponsibleName.value,
            responsibleCPF: financialResponsibleCPF.value,
            clientName: clientNameElement.value,
            clientCPF: clientCPFElement.value,
            clientEmail: clientEmailElement.value,
            clientPhone: clientPhoneElement.value,
            clientDescription: `ao atendimento psicológico de ${clientName.value} (${clientCPF.value}) realizado em `,
            clientServiceValue: clientServiceValueElement.value
        })
    
        localStorage.setItem(key, JSON.stringify(obj));
    }   

    location.reload();
}

function loadCards() {
    if (localStorage.hasOwnProperty('clients')) {
        obj = JSON.parse(localStorage.getItem('clients'));

        for (var i = 0; i < obj.length; i++) {
            var divCardClient = document.createElement('div');
    
            divCardClient.innerHTML = `
                <div class="card c-client my-3" id="card-client-${i}" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${obj[i].responsibleName}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${obj[i].clientName}</h6>
                        <p class="card-text">${obj[i].clientDescription}</p>
                        <button type="button" class="btn btn-primary" id="btn-useCard" value="${i}" onclick="useCard(this)">Usar</button>
                        <button type="button" class="btn btn-danger" id="btn-deleteCard" value="${i}" onclick="deleteCard(this)">Deletar</button>
                    </div>
                </div>
            `;

            divCards.appendChild(divCardClient);
        }
    }
}

function useCard(id) {
    obj = JSON.parse(localStorage.getItem('clients'));

    financialResponsibleName.value = obj[id.value].responsibleName;
    financialResponsibleCPF.value = obj[id.value].responsibleCPF;
    clientNameElement.value = obj[id.value].clientName;
    clientCPFElement.value = obj[id.value].clientCPF;
    clientEmailElement.value = obj[id.value].clientEmail;
    clientPhoneElement.value = obj[id.value].clientPhone;
    clientDescriptionElement.value = obj[id.value].clientDescription;
    clientServiceValueElement.value = obj[id.value].clientServiceValue;
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

function disableFields() {
    financialResponsibleName.setAttribute('disabled', 'disabled');
    financialResponsibleName.value = "";
    financialResponsibleCPF.setAttribute('disabled', 'disabled');
    financialResponsibleCPF.value = "";
}

function enableFields() {
    financialResponsibleName.removeAttribute('disabled');
    financialResponsibleCPF.removeAttribute('disabled');
}
