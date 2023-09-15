/*
 * ----------------------------------------------------------------
 * Variables
 * ----------------------------------------------------------------
 */


// GettersElements
var register = document.getElementById('btnRegister');
var divCards = document.getElementById('box-cards');
const checkboxChangeTheme = document.getElementById('cbChangeTheme');
const mainInfo = document.getElementById("box-main-info");
const container = document.getElementById("container");
const titleMainInfo1 = document.getElementsByClassName("text-main-info")[0];
const titleMainInfo2 = document.getElementsByClassName("text-main-info")[1];
const titleMainInfo3 = document.getElementsByClassName("text-main-info")[2];
const labelMainInfo = document.getElementsByClassName("text-main-info")[3];
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

// Strings and Objects
const elementsToChangeTheme = [document.body, container, mainInfo, titleMainInfo1, titleMainInfo2, titleMainInfo3, labelMainInfo];


/*
 * ----------------------------------------------------------------
 *  Event Listeners
 * ----------------------------------------------------------------
 */

onload = function() {
    checkIfUserLoggedIn();
    checkTheme(elementsToChangeTheme);
    loadCards();
};

checkboxChangeTheme.addEventListener('change', () => {
    darkTheme(elementsToChangeTheme);
    themeChanged();
})

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
    if (localStorage.hasOwnProperty(key)) {
        obj = JSON.parse(localStorage.getItem(key));
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
    if (localStorage.hasOwnProperty(key)) {
        obj = JSON.parse(localStorage.getItem(key));

        for (var i = 0; i < obj.length; i++) {
            var divCardClient = document.createElement('div');
    
            divCardClient.innerHTML = `
                <div class="card c-client my-3" id="card-client-${i}" style="width: 18rem;">
                    <div class="card-body" id="card-body">
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
    obj = JSON.parse(localStorage.getItem(key));

    financialResponsibleName.value = obj[id.value].responsibleName;
    financialResponsibleCPF.value = obj[id.value].responsibleCPF;
    clientNameElement.value = obj[id.value].clientName;
    clientCPFElement.value = obj[id.value].clientCPF;
    clientEmailElement.value = obj[id.value].clientEmail;
    clientPhoneElement.value = obj[id.value].clientPhone;
    clientDescriptionElement.value = obj[id.value].clientDescription;
    clientServiceValueElement.value = obj[id.value].clientServiceValue;
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