/* Variables */

// Strings and Objects
var key = "users"
var obj = [];

// GettersElements
/* Form & Buttons */
var userForm = document.getElementById("userForm");
var btnSignUp = document.getElementById("btnSignUp");
const checkboxChangeTheme = document.getElementById('cbChangeTheme');
const mainInfo = document.getElementById("box-main-info");
const titleMainInfo = document.getElementsByClassName("text-main-info")[0];
/* User */
var userEmail = document.getElementById('userEmail');
var userPassword = document.getElementById('userPassword');

// Event Listeners
onload = function() {
    checkTheme();
}

checkboxChangeTheme.addEventListener('change', () => {
    darkTheme();
    themeChanged();
})

userForm.addEventListener("submit", function(e) {
    signIn();
    e.preventDefault();
});

btnSignUp.addEventListener("click", function(e) {
    location.href = "../index.html";
    e.preventDefault();
})

/* Functions */

function signIn() {
    if (localStorage.hasOwnProperty('users')) {
        obj = JSON.parse(localStorage.getItem('users'));
    }

    if (obj.length == 0) {
        console.log("Usuário não encontrado. Crie uma conta!")
    } else {
        for (var i = 0; i < obj.length; i++) {
            if (userEmail.value == obj[i].userEmail) {
                if (userPassword.value == obj[i].userPassword) {
                    location.href = "issue-receipt.html";
                    sessionStorage.setItem("loggedIn", true);
                } else {
                    console.log("Senha ou email incorreto.");
                }
            } else {
                console.log("Senha ou email incorreto.");
            }
        }
    }
}

function darkTheme() {
    document.body.classList.toggle('dark');
    mainInfo.classList.toggle('dark');
    titleMainInfo.classList.toggle('dark');
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

