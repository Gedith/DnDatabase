<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DnDatabase - přihlášení</title>
    <script src="./JS/index.js"></script>
</head>
<body onload="createForm()">
    <?php
        if(isset($_SESSION["message"])){
            echo "<p>".$_SESSION['message']."</p>";
            $_SESSION["message"] = null;
        }
    ?>
    <div id="form_div">
        <h3 id="form_title">Přihlášení</h3>
        <div id="radios">
            <input type="radio" value="PJ" name="typUzivatele"><label>Pán jeskyně</label>
            <input type="radio" value="Player" name="typUzivatele"><label>Hráč</label>
        </div>
    </div>
    <button id="form_button" onclick="changeToRegistration()">Registrace</button>
</body>
</html>