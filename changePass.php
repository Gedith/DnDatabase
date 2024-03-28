<?php
    require_once("./PHP/connect.php");
    session_start();

    $heslo = $_POST["heslo"];
    $nHeslo = $_POST["noveHeslo"];
    $nHesloZnovu = $_POST["noveHesloZnovu"];

    if ($nHeslo != $nHesloZnovu) {
        badData("Passwords doesn't match!");
    }else{
        $Heslo = hash('sha256', $nHeslo);
        mysqli_query($conn, "UPDATE uzivatele SET Heslo = '$Heslo' WHERE Jmeno = '".$_SESSION["logedUser"]."'");
        $_SESSION["message"] = "Change was successful!";
        header("Location:../User.php");
        exit();
    }

    function badData($message){
        $_SESSION["message"] = $message;
        header("Location:../User.php");
        exit();
    }
?>