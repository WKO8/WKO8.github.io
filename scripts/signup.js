/* Variables */

// Numbers
var countCPF = 0;
var countCPFPoints = 0;

var countPhone = 0;

// Strings and Objects
var finalCPF = "";
var finalPhone = "";

// GettersElements
/* Divs */
var infoExtra = document.getElementById("infoExtra");
/* Form & Buttons */
const checkboxChangeTheme = document.getElementById('cbChangeTheme');
const mainInfo = document.getElementById("box-main-info");
const titleHeader = document.getElementsByClassName("title-header")[0];
const titleMainInfo = document.getElementsByClassName("text-main-info")[0];
const labelMainInfo = document.getElementsByClassName("text-main-info")[1];
var userForm = document.getElementById("userForm");
var btnSignUp = document.getElementById("btnSignUp");
var btnSignIn = document.getElementById("btnSignIn");
/* User */
var userName = document.getElementById('userName');
var userCPF = document.getElementById('userCPF');
var userPhone = document.getElementById('userPhone');
var userProfession = document.getElementById('userProfession');
var userExtraInfo = document.getElementById('userExtraInfo');
var userEmail = document.getElementById('userEmail');
var userPassword = document.getElementById('userPassword');
var userRePassword = document.getElementById('userRePassword');
/* CheckBox Extra Information is Client */
var checkExtraInfo = document.getElementById('checkboxExtraInfo');


// Event Listeners
onload = function() {
    checkTheme();
}

checkboxChangeTheme.addEventListener('change', () => {
    darkTheme();
    themeChanged();
})

userForm.addEventListener("submit", function(e) {
    registerUser();
    e.preventDefault();
})

btnSignIn.addEventListener("click", function(e) {
    location.href = "../index.html";
    e.preventDefault();
})

checkExtraInfo.addEventListener("click", function(e) {
    if (e.target.checked) {
        infoExtra.style.display = "block";
    } else {
        infoExtra.style.display = "none";
    }
})


userName.addEventListener("input", function(e) {
    var name = e.target.value;
    console.log(e.target.value);
    console.log(name.length == 1 && name == " ")
    if (name.length == 1 && name == " ") {
        userName.value = "";
    }

    if (name[name.length - 1] == " " && name[name.length - 2] == " ") {
        userName.value = name.slice(0, name.length - 2);
    }
})

userName.addEventListener("change", function(e) {
    var name = e.target.value;

    if (name[name.length - 1] == " ") {
        userName.value = name.slice(0, name.length - 1);
    }
})

/* Validating Passwords */
userPassword.addEventListener("change", function(e) {
    if (userPassword.value == userRePassword.value && userPassword.value.length >= 8) {
        userRePassword.style.backgroundColor = "white";
        userPassword.style.backgroundColor = "white";
        btnSignUp.removeAttribute('disabled');
    } else {
        userPassword.style.backgroundColor = "rgba(255, 55, 55, 0.8)";
        userRePassword.style.backgroundColor = "rgba(255, 55, 55, 0.8)";
        btnSignUp.setAttribute('disabled', 'disabled');
    }
})

userRePassword.addEventListener("change", function(e) {
    if (userPassword.value == userRePassword.value && userRePassword.value.length >= 8) {
        userRePassword.style.backgroundColor = "white";
        userPassword.style.backgroundColor = "white";
        btnSignUp.removeAttribute('disabled');
    } else {
        userRePassword.style.backgroundColor = "rgba(255, 55, 55, 0.8)";
        btnSignUp.setAttribute('disabled', 'disabled');
    }
})

/* Validating Email */

userEmail.addEventListener("input", function(e) {
    var email = e.target.value;
    console.log(e.target.value);
    console.log("Tamanho: " + email.length);
    console.log(email == " ");
    if (email.length == 0 && email == " ") {
        console.log("Tamanho2: " + email.length);

        userEmail.value = "";
    }

    if (email[email.length - 1] == " " && email[email.length - 2] == " ") {
        userEmail.value = email.slice(0, email.length - 2);
    }
})

userEmail.addEventListener("change", function(e) {
    var email = e.target.value;

    if (email[email.length - 1] == " ") {
        userEmail.value = email.slice(0, email.length - 1);
    }
})

/* Validating  */

userCPF.addEventListener('input', function(e) {
    var lengthCPF = userCPF.value.length;

    if (lengthCPF === 0) {
        countCPF = -1;
        countCPFPoints = 0;
    } else if (lengthCPF === 14) {
        finalCPF = userCPF.value;
        console.log(finalCPF);
    } else if (lengthCPF > 14) {
        userCPF.value = finalCPF;
    }

    countCPF += 1;

    if (countCPF === 3) {
        if (countCPFPoints === 2) {
            userCPF.value = userCPF.value + "-";
        } else {
            userCPF.value = userCPF.value + ".";
            countCPF = 0;
            countCPFPoints += 1;
        }
    }
});

userPhone.addEventListener('input', function(e) {
    var lengthPhone = userPhone.value.length;

    if (lengthPhone === 0) {
        countPhone = -1;
    } else if (lengthPhone === 15) {
        finalPhone = userPhone.value;
    } else if (lengthPhone > 14) {
        userPhone.value = finalPhone;
    }

    countPhone += 1;

    if (countPhone === 2) {
        userPhone.value = "(" + userPhone.value + ") ";
    } else if (countPhone === 7) {
        userPhone.value = userPhone.value + "-";
    }
});


/* Functions */
function registerUser() {
    var key = "users"
    var obj = [];

    if (localStorage.hasOwnProperty(key)) {
        obj = JSON.parse(localStorage.getItem(key));
    }

    obj.push({
        username: userName.value,
        userCPF: userCPF.value,
        userPhone: userPhone.value,
        userProfession: userProfession.value,
        userExtraInfo: userExtraInfo.value,
        userEmail: userEmail.value,
        userPassword: userPassword.value
    })
    
    localStorage.setItem(key, JSON.stringify(obj));

    location.href = "./pages/signin.html";
}

function darkTheme() {
    document.body.classList.toggle('dark');
    mainInfo.classList.toggle('dark');
    titleMainInfo.classList.toggle('dark');
    labelMainInfo.classList.toggle('dark');
    titleHeader.classList.toggle('dark');
}

function themeChanged() {
    var theme;

    if (sessionStorage.hasOwnProperty("theme")) {
        theme = sessionStorage.getItem("theme");
    }

    if (theme == "dark") {
        sessionStorage.setItem("theme", "light");
    } else if (theme == "light") {
        sessionStorage.setItem("theme", "dark");
    } else {
        sessionStorage.setItem("theme", "dark");
    }
}

function checkTheme() {
    if (sessionStorage.hasOwnProperty("theme")) {
        if (sessionStorage.getItem("theme") == "dark") {
            darkTheme();
        }
    }
}