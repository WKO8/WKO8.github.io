import {base64Image} from '../assets/base64Image.js';

var base64Timbrada = base64Image;


function generateLandscapePDF() {

    var clientName = document.getElementById('clientName');
    var clientCPF = document.getElementById('clientCPF');
    var clientDate = document.getElementById('clientDate');
    var clientDescription = document.getElementById('clientDescription');
    var clientServiceValue = document.getElementById('clientServiceValue');

    const serverName = "Lucas Moreira Sorrentino";
    const serverCPF = "133.415.336-13";
    const serverProfession = "Psicólogo Clínico";
    const serverCRP = "04/60827";

    const address = "Av. Vicente Risola, 1507, Sala 4 - Santa Inês, Belo Horizonte (MG)";
    const phone = "(31) 99776-4293";

    var doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a4',
    });

    // Background - Image
    doc.addImage(base64Timbrada, 'PNG', 10, 10, 100, 100);

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
    doc.text(235, 49, "R$ " + clientServiceValue.value + ",00");
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
    doc.text(25, 90, "Recebemos de: " + clientName.value);
    doc.text(25, 100, "CPF/CNPJ: " + clientCPF.value);
    var valueInWords = clientServiceValue.value.extenso()[0].toUpperCase() + clientServiceValue.value.extenso().slice(1, clientServiceValue.value.extenso().length);
    doc.text(25, 110, "A importância de: R$" + clientServiceValue.value +  ",00 (" + valueInWords + " reais)");
    doc.text(25, 120, "Referente " + clientDescription.value);
    var year = clientDate.value.slice(0,4);
    var month = clientDate.value.slice(5,7);
    var day = clientDate.value.slice(8,10);
    doc.text(25, 130, "Data do Recibo: " + day + "/" + month + "/" + year);

    // Text - Address and Contact
    doc.setFontSize(16);
    doc.setFontType("thin");
    doc.text(25, 192, address);
    doc.text(25, 200, "Telefone: " + phone);


    doc.save(clientName.value.replaceAll(" ", "_") + "_" + day+ "_" + month+ "_" + year + ".pdf");
}

function generatePortraitPDF() {
    
    var clientName = document.getElementById('clientName');
    var clientCPF = document.getElementById('clientCPF');
    var clientDate = document.getElementById('clientDate');
    var clientDescription = document.getElementById('clientDescription');
    var clientServiceValue = document.getElementById('clientServiceValue');

    const serverName = "Lucas Moreira Sorrentino";
    const serverCPF = "133.415.336-13";
    const serverProfession = "Psicólogo Clínico";
    const serverCRP = "04/60827";

    // const address = "Av. Vicente Risola, 1507, Sala 4 - Santa Inês, Belo Horizonte (MG)";
    // const phone = "(31) 99776-4293";

    var doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
    });

    // Background - Image
    doc.addImage(base64Timbrada, 'PNG', 0, -5, 210, 300);

    //  Text - Recibo 
    doc.setFontSize(15);
    doc.setFontStyle('bold');
    doc.text(161.5, 81, "RECIBO");

    // Rect - Background of Service value
    doc.setFillColor('0', '0', '1');
    doc.rect(154, 86, 35, 7, 'F');
    doc.setFillColor('0', '0', '0');

    // Text - Service value
    doc.setTextColor('1', '1', '1');
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text(162, 90.5, "R$ " + clientServiceValue.value + ",00");
    doc.setTextColor('0', '0', '0');

    // Text - Server
    doc.setFontSize(11);
    doc.setFontType("normal");
    doc.text(30, 80, "Nome: " + serverName);
    doc.text(30, 85, "CPF: " + serverCPF);
    doc.text(30, 90, serverProfession);
    doc.text(30, 95, "CRP: " + serverCRP);

    // Rect - Server Detail
    doc.setFillColor('0', '0', '0');
    doc.rect(25, 77.3, 0.6, 18, 'F');
    doc.setFillColor('0', '0', '0');

    // Text - Client
    doc.setFontSize(14);
    doc.setFontType("normal");
    doc.text(25, 151, "Recebemos de: " + clientName.value);
    doc.text(25, 158, "CPF/CNPJ: " + clientCPF.value);
    var valueInWords = clientServiceValue.value.extenso()[0].toUpperCase() + clientServiceValue.value.extenso().slice(1, clientServiceValue.value.extenso().length);
    doc.text(25, 165, "A importância de: R$" + clientServiceValue.value +  ",00 (" + valueInWords + " reais)");


    // Description with Wrapping text

    var line = 172 // Line height to start text at
    var lineHeight = 7 // line height to increase at the start height
    var leftMargin = 25
    var wrapWidth = 135
    var longString = clientDescription.value

    var splitText = doc.splitTextToSize(longString, wrapWidth)

    for (var i = 0, length = splitText.length; i < length; i++) {
        if (i == 0) {
            doc.text("Referente " + splitText[i], leftMargin, line)
        } else {
            doc.text(splitText[i], leftMargin, line)
        }

        line = lineHeight + line
    }

    // var splitText = doc.splitTextToSize(clientDescription.value, 30);
    // doc.text(25, 169, "Referente " + splitText);
    var year = clientDate.value.slice(0,4);
    var month = clientDate.value.slice(5,7);
    var day = clientDate.value.slice(8,10);
    doc.text(25, line, "Data do Recibo: " + day + "/" + month + "/" + year);

    // Text - Address and Contact
    // doc.setFontSize(11);
    // doc.setFontType("thin");
    // doc.text(25, 120, address);
    // doc.text(25, 125, "Telefone: " + phone);


    doc.save(clientName.value.replaceAll(" ", "_") + "_" + day+ "_" + month+ "_" + year + ".pdf");
}


// Prototype function to transform int to string
String.prototype.extenso = function(c){
    var ex = [
        ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
        ["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
        ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
        ["mil", "milhão", "bilhão", "trilhão", "quadrilhão", "quintilhão", "sextilhão", "setilhão", "octilhão", "nonilhão", "decilhão", "undecilhão", "dodecilhão", "tredecilhão", "quatrodecilhão", "quindecilhão", "sedecilhão", "septendecilhão", "octencilhão", "nonencilhão"]
    ];
    var a, n, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;
    for(var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []){
        j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
        if(!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
        for(a = -1, l = v.length; ++a < l; t = ""){
            if(!(i = v[a] * 1)) continue;
            i % 100 < 20 && (t += ex[0][i % 100]) ||
            i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
            s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
            ((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t]) : ""));
        }
        a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
        a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
    }
    return r.join(e);
}


var form = document.getElementById('clientForm');

form.addEventListener('submit', function(e) {

    generatePortraitPDF();

    // impede o envio do form
    e.preventDefault();
});
