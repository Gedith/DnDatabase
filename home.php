<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DnDatabase - home</title>
</head>
<body>
    <header></header>
    <nav>
        <a href="User.html">Profil</a>
        <a href="./PHP/logout.php">Odhlásit se</a><br />
        <a href="./createCampaign.php">Vytvořit kampaň</a>
        <?php
        echo "<h1>Domovská Stránka - ".$_SESSION["typeOfUser"]."</h1>";
        
        ?>
    </nav>
    <main></main>
    <footer></footer>
</body>
</html>