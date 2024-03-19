let typFormulare = "p";
let typPrihlaseni = "player";

function createForm(){
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "./PHP/loginHandler.php");
    form.setAttribute("id", "formular");

    var name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("name", "username");
    name.setAttribute("id", "username");
    name.setAttribute("placeholder", "Jméno");

    var password = document.createElement("input");
    password.setAttribute("type", "password");
    password.setAttribute("name", "password");
    password.setAttribute("id", "pass");
    password.setAttribute("placeholder", "Heslo");

    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Odeslat");
    submit.setAttribute("id", "submit");
    submit.setAttribute("onclick", "return submitFunction()");

    var br = document.createElement("BR");
    var br2 = document.createElement("BR");
    
    form.appendChild(name);
    form.appendChild(br);
    form.appendChild(password);
    form.appendChild(br2);
    form.appendChild(submit);
    document.getElementById("form_div").appendChild(form);
}

function changeToRegistration() {
    document.getElementById("formular").setAttribute("action", "./PHP/registrationHandler.php");
    document.getElementById("radios").style.display = "none";
    document.getElementById("form_title").textContent = "Registrace";
    document.getElementById("submit").remove();
    var pass2 = document.createElement("input");
    pass2.setAttribute("type", "password");
    pass2.setAttribute("name", "password2");
    pass2.setAttribute("id", "pass2");
    pass2.setAttribute("placeholder", "Heslo znovu");

    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Odeslat");
    submit.setAttribute("id", "submit");
    submit.setAttribute("onclick", "return submitFunction()");

    var br = document.createElement("BR");
    br.setAttribute("id", "pass2_BR");

    let form = document.getElementById("formular");
    form.appendChild(pass2);
    form.appendChild(br);
    form.appendChild(submit);

    let button = document.getElementById("form_button");
    button.textContent = "Přihlášení";
    button.setAttribute("onclick", "changeToLogin()");
}

function changeToLogin() {
    document.getElementById("formular").setAttribute("action", "./PHP/loginHandler.php");
    document.getElementById("radios").style.display = "initial";
    document.getElementById("form_title").textContent = "Přihlášení";
    document.getElementById("pass2").remove();
    document.getElementById("pass2_BR").remove();

    let button = document.getElementById("form_button");
    button.textContent = "Registrace";
    button.setAttribute("onclick", "changeToRegistration()");
}

function submitFunction() {
    let checkSubmitType = document.getElementById("form_title").textContent;
    let username = document.getElementById("username").value;
    let pass = document.getElementById("pass").value;
    //let passRegEx = /[\w@$!%*#?&]{8,}/;

    if (checkSubmitType == "Registrace") {
        var pass2 = document.getElementById("pass2").value;
        if (username == "") {
            alert("Jméno nebylo vyplněno");
            return false;

        /*} else if (passRegEx.test(pass)) {
            alert("Heslo nesplňuje základní požadavky na heslo");
            return false;*/

        }   else if (pass != pass2) {
            alert("Hesla se neshodují");
            return false;
        }
    } else {
        //login check
    }
    return true;
}