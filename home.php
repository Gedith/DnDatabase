<?php
    session_start();
    require_once("./PHP/connect.php");
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
    </nav>
    <main>
        <?php
        echo "<h1>Domovská Stránka - " . $_SESSION["typeOfUser"] . "</h1>";
        $campaignsData = mysqli_query($conn, "SELECT Nazev, KampaneID FROM kampane Where UzivateleID = " . $_SESSION["logedUserID"] . "");
        while ($campaignsFetch = mysqli_fetch_assoc($campaignsData)) {
            echo "<label id='" . $campaignsFetch['KampaneID'] . "'>" . $campaignsFetch["Nazev"] . " </label><a href='campaignDetail.php'>info</a><br />";
        }
        ?>
    </main>
    <footer></footer>
</body>
</html>