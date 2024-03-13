let typFormulare = "p";
let typPrihlaseni = "player";

function createForm(){
    var formular = document.getElementById.form;
    var name = document.createElement(input);
    name.setAttribute("type", "text");
    name.setAttribute("name", "username");
    var password = document.createElement(input);
    password.setAttribute("type", "password");
    password.setAtribute("name", "password");
    
    formular.appendChild(name);
    formular.appendChild(password);
}