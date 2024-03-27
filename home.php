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
        <a href="User.php">Profil</a>
        <a href="./PHP/logout.php">Odhlásit se</a><br />
        <?php
            if($_SESSION["typeOfUser"] == "PJ"){
            echo "<a href='./createCampaign.php'>Vytvořit kampaň</a>";
            }else{
                echo "<a href='./createCharacter.php'>Vytvořit postavu</a>";
            }
        ?>
        
    </nav>
    <main>
        <?php
        echo "<h1>Domovská Stránka - " . $_SESSION["typeOfUser"] . "</h1>";
        if($_SESSION["typeOfUser"] == "PJ"){
            $campaignsData = mysqli_query($conn, "SELECT Nazev, KampaneID FROM kampane Where UzivateleID = " . $_SESSION["logedUserID"] . "");
            while ($campaignsFetch = mysqli_fetch_assoc($campaignsData)) {
                echo "<label id='" . $campaignsFetch['KampaneID'] . "'>" . $campaignsFetch["Nazev"] . " </label><a href='campaignDetail.php'>info</a><br />";
            }
        }else{
            $charactersData = mysqli_query($conn, "SELECT hracskepostavy.Jmeno, hracskepostavy.HracskepostavyID FROM hracskepostavy WHERE hracskepostavy.UzivateleID = ".$_SESSION["logedUserID"]."");
            while ($charactersFetch = mysqli_fetch_assoc($charactersData)) {
                echo "<label id='" . $charactersFetch["HracskepostavyID"] . "'>" . $charactersFetch["Jmeno"] . " </label><a href='characterDetail.php'>info</a><br />";
            }
        }
        ?>
    </main>
    <footer></footer>
</body>
</html>