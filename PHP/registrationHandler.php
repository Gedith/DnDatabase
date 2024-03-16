<?php
    include_once './connect.php';
    session_start();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    }

    $_SESSION["username"] = $username;

    mysqli_query($conn, "INSERT INTO `uzivatele`(`Heslo`, `Jmeno`) VALUES ('".$username."','".$password."')");

    header("Location:../index.php");
    $_SESSION["message"] = "Registration sucessful";
    exit();
?>