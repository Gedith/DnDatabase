function createFormular(){
    var form = document.createElement("form");
    form.setAttribute("action", "../PHP/campaignCreator.php");
    form.setAttribute("method", "post");
    
    var name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("name", "campaignName");
    name.setAttribute("placeholder", "Jméno kampaně");

    var br = document.createElement("br");

    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "odeslat");

    form.appendChild(name);
    form.appendChild(br);
    form.appendChild(submit);
    document.getElementById("formular").appendChild(form);
}