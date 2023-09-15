/* Global variables */
const key = 'clients';
var obj = [];
var finalCPF = "";
var finalPhone = "";

// Numbers
var countCPF = 0;
var countPoints = 0;
var countPhone = 0;
var countCards = 0;
var lengthCPF = 0;
var lengthPhone = 0;


/* Functions */

// Check if the user is logged in
function checkIfUserLoggedIn() {
    if (!sessionStorage.getItem("loggedIn")) {
        location.href = "signin.html";
    }
}

function darkTheme(elements) {
    elements.forEach(element => {
        element.classList.toggle('dark');
    });
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

function checkTheme(elements) {
    if (sessionStorage.hasOwnProperty("theme")) {
        if (sessionStorage.getItem("theme") == "dark") {
            darkTheme(elements);
        }
    }
}
