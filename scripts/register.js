/*
 * ----------------------------------------------------------------
 * Variables
 * ----------------------------------------------------------------
 */

// Strings and Objects
let key = 'clients';
var obj = [];
var myClient = "";

// GettersElements
var back = document.getElementById('buttonBack');
var cpf = document.getElementById('clientCPF');
var phone = document.getElementById('clientPhone');
var register = document.getElementById('btnRegister');
var divCards = document.getElementById('box-cards');
var btnDeleteCard = document.getElementById('btn-deleteCard');
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

// Numbers
var countCPF = 0;
var countPoints = 0;
var countPhone = 0;
var countCards = 0;

// ----------------------------------------------------------------

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

cpf.addEventListener('input', function(e) {
    countCPF += 1;
    if (countCPF === 3) {
        if (countPoints === 2) {
            cpf.value = e.target.value + "-";
        } else {
            cpf.value = e.target.value + ".";
            countCPF = 0;
            countPoints += 1;
        }
    }
});

phone.addEventListener('input', function(e) {
    countPhone += 1;
    if (countPhone === 2) {
        phone.value = "(" + e.target.value + ") ";
    } else if (countPhone === 7) {
        phone.value = e.target.value + "-";
    }
});

register.addEventListener('click', function(e) {
    // addClientCard();
    registerClient();
    e.preventDefault();
});

// btnDeleteCard.addEventListener('click', function(e) {
//     alert("Delete card");
// });

// ----------------------------------------------------------------

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

function registerClient() {
    if (localStorage.hasOwnProperty('clients')) {
        obj = JSON.parse(localStorage.getItem('clients'));
    }

    obj.push({
        responsibleName: financialResponsibleName.value,
        responsibleCPF: financialResponsibleCPF.value,
        clientName: clientNameElement.value,
        clientCPF: clientCPFElement.value,
        clientEmail: clientEmailElement.value,
        clientPhone: clientPhoneElement.value,
        clientDescription: `a atendimento psicológico de ${clientName.value} (${clientCPF.value}) realizado em `,
        clientServiceValue: clientServiceValueElement.value
    })

    localStorage.setItem(key, JSON.stringify(obj));

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

    console.log("Loading cards...");
    console.log(obj);
}

function useCard(id) {
    obj = JSON.parse(localStorage.getItem('clients'));

    financialResponsibleName.value = obj[id.value].responsibleName;
    financialResponsibleCPF.value = obj[id.value].responsibleCPF;
    console.log(obj[id.value].responsibleCPF);
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

// ----------------------------------------------------------------


