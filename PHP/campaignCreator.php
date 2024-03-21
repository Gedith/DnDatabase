<?php
    session_start();
    include_once "connect.php";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $name = $_POST["campaignName"];
    }

    $dbData = mysqli_query($conn, "SELECT UzivateleID FROM uzivatele WHERE Jmeno = '".$_SESSION["logedUser"]."'");
    $user = mysqli_fetch_assoc($dbData);
    mysqli_query($conn, "INSERT INTO kampane (Nazev, UzivateleID) VALUES ('".$name."', '".$user["UzivateleID"]."')");
    header("Location:../home.php");
    exit();
?>