<?php
    session_start();
    mb_internal_encoding("UTF-8");
?>
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta http-equiv="content-type" content="text/html" charset="UTF-8">
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
    </div>
    <button id="form_button" onclick="changeToRegistration()">Registrace</button>
</body>
</html>