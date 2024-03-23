<?php
session_start();
include_once "connect.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["characterName"];
    $class = $_POST["class"];
    $race = $_POST["race"];
}

mysqli_query($conn, "INSERT INTO `hracskepostavy`(`Jmeno`, `Povolani`, `Rasa`, `Uroven`, `UzivateleID`) VALUES ('".$name."','".$class."','".$race."',0,'".$_SESSION["logedUserID"]."')");
header("Location:../home.php");
exit();
?>