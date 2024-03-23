function createForm() {
    var form = document.createElement("form");
    form.setAttribute("action", "../PHP/characterCreator.php");
    form.setAttribute("method", "post");

    var name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("name", "characterName");
    name.setAttribute("placeholder", "Jméno");

    var povolani = document.createElement("input");
    povolani.setAttribute("type", "text");
    povolani.setAttribute("name", "class");
    povolani.setAttribute("placeholder", "Povolání");

    var rasa = document.createElement("input");
    rasa.setAttribute("type", "text");
    rasa.setAttribute("name", "race");
    rasa.setAttribute("placeholder", "Rasa");

    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "odeslat");

    var br = document.createElement("br");
    var br1 = document.createElement("br");
    var br2 = document.createElement("br");

    form.appendChild(name);
    form.appendChild(br);
    form.appendChild(povolani);
    form.appendChild(br1);
    form.appendChild(rasa);
    form.appendChild(br2);
    form.appendChild(submit);
    document.getElementById("formular").appendChild(form);
}