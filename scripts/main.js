function generateLandscapePDF() {

    const clientIdentification = "000.000.000-00";

    var clientName = document.getElementById('clientName');
    var clientLastname = document.getElementById('clientLastname');
    var clientDate = document.getElementById('clientDate');
    var clientDescription = document.getElementById('clientDescription');
    var clientServiceValue = document.getElementById('clientServiceValue');

    const serverName = "Lucas Moreira";
    const serverCPF = "100.000.000-00";
    const serverProfession = "Psicólogo";
    const serverCRP = "0460000";

    const street = "Rua Francisca Leão Correa";
    const number = "540";
    const state = "MG";
    const phone = "(38) 11111-1111";

    var doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a4',
    });

    //  Text - Recibo 
    doc.setFontSize(22);
    doc.setFontStyle('bold');
    doc.text(240, 37.5, "RECIBO");

    // Rect - Background of Service value
    doc.setFillColor('0', '0', '1');
    doc.rect(225, 43, 45, 8, 'F');
    doc.setFillColor('0', '0', '0');

    // Text - Service value
    doc.setTextColor('1', '1', '1');
    doc.setFontSize(16);
    doc.setFontType("bold");
    doc.text(235, 48, "R$ " + clientServiceValue.value);
    doc.setTextColor('0', '0', '0');

    // Text - Server
    doc.setFontSize(16);
    doc.setFontType("thin");
    doc.text(30, 35, "Nome: " + serverName);
    doc.text(30, 42, "CPF: " + serverCPF);
    doc.text(30, 49, serverProfession);
    doc.text(30, 56, "CRP: " + serverCRP);

    // Rect - Server Detail
    doc.setFillColor('0', '0', '0');
    doc.rect(25, 30, 1, 28, 'F');
    doc.setFillColor('0', '0', '0');

    // Text - Client
    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.text(25, 90, "Recebemos de: " + clientName.value +  " " + clientLastname.value);
    doc.text(25, 100, "CPF/CNPJ: " + clientIdentification);
    doc.text(25, 110, "A importância de: R$" + clientServiceValue.value);
    doc.text(25, 120, "Referente à: " + clientDescription.value);
    var year = clientDate.value[0,3];
    var month = clientDate.value[5,6];
    var day = clientDate.value[8,9];
    doc.text(25, 130, "Data do Recibo: " + day + "/" + month + "/" + year);

    // Text - Address and Contact
    doc.setFontSize(16);
    doc.setFontType("thin");
    doc.text(25, 192, street + " " + number + " " + state);
    doc.text(25, 200, "Telefone: " + phone);


    doc.save('a4.pdf')
}

function generatePortraitPDF() {
    
    const clientIdentification = "000.000.000-00";

    var clientName = document.getElementById('clientName');
    var clientLastname = document.getElementById('clientLastname');
    var clientDate = document.getElementById('clientDate');
    var clientDescription = document.getElementById('clientDescription');
    var clientServiceValue = document.getElementById('clientServiceValue');

    const serverName = "Lucas Moreira";
    const serverCPF = "100.000.000-00";
    const serverProfession = "Psicólogo";
    const serverCRP = "0460000";

    const street = "Rua Francisca Leão Correa";
    const number = "540";
    const state = "MG";
    const phone = "(38) 11111-1111";

    var doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
    });

    //  Text - Recibo 
    doc.setFontSize(15);
    doc.setFontStyle('bold');
    doc.text(169, 37.5, "RECIBO");

    // Rect - Background of Service value
    doc.setFillColor('0', '0', '1');
    doc.rect(154, 42, 35, 7, 'F');
    doc.setFillColor('0', '0', '0');

    // Text - Service value
    doc.setTextColor('1', '1', '1');
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text(162, 46.5, "R$ " + clientServiceValue.value);
    doc.setTextColor('0', '0', '0');

    // Text - Server
    doc.setFontSize(11);
    doc.setFontType("thin");
    doc.text(30, 35, "Nome: " + serverName);
    doc.text(30, 40, "CPF: " + serverCPF);
    doc.text(30, 45, serverProfession);
    doc.text(30, 50, "CRP: " + serverCRP);

    // Rect - Server Detail
    doc.setFillColor('0', '0', '0');
    doc.rect(25, 32, 0.6, 18, 'F');
    doc.setFillColor('0', '0', '0');

    // Text - Client
    doc.setFontSize(14);
    doc.setFontType("normal");
    doc.text(25, 70, "Recebemos de: " + clientName.value +  " " + clientLastname.value);
    doc.text(25, 75, "CPF/CNPJ: " + clientIdentification);
    doc.text(25, 80, "A importância de: R$" + clientServiceValue.value);
    doc.text(25, 85, "Referente à: " + clientDescription.value);
    doc.text(25, 90, "Data do Recibo: " + clientDate.value);

    // Text - Address and Contact
    doc.setFontSize(11);
    doc.setFontType("thin");
    doc.text(25, 120, street + " " + number + " " + state);
    doc.text(25, 125, "Telefone: " + phone);


    doc.save('a4.pdf')
}

var form = document.getElementById('clientForm');

form.addEventListener('submit', function(e) {

    generateLandscapePDF();

    // impede o envio do form
    e.preventDefault();
});