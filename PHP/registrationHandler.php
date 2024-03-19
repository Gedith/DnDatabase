<?php
    include_once './connect.php';
    session_start();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = hash('sha256', $_POST["password"]);
    }

    $_SESSION["username"] = $username;

    mysqli_query($conn, "INSERT INTO `uzivatele`(`Jmeno`, `Heslo`) VALUES ('".$username."','".$password."')");

    header("Location:../index.php");
    $_SESSION["message"] = "Registration sucessful";
    exit();
?>