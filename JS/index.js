let typFormulare = "p";
let typPrihlaseni = "player";

function createForm(){
    var form = document.createElement("form")
    form.setAttribute("method", "post");
    form.setAttribute("action", "submit");
    var name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("name", "username");
    name.setAttribute("placeholder", "Jméno");
    var password = document.createElement("input");
    password.setAttribute("type", "password");
    password.setAttribute("name", "password");
    password.setAttribute("placeholder", "Heslo");
    
    form.appendChild(name);
    form.appendChild(password);
    document.getElementById("form_div").appendChild(form);
}