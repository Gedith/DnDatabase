<?php
    include_once './connect.php';
    mb_internal_encoding("UTF-8");
    session_start();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST["username"];
        $password = hash('sha256', $_POST["password"]);
        $type = $_POST["typUzivatele"];
    }

    //Database check
    $select = mysqli_query($conn, "SELECT Jmeno FROM uzivatele WHERE Jmeno = '".$username."'");
    if (mysqli_num_rows($select) == 0) {
        badData("Username not found");
    }else{
        $passCheck = mysqli_query($conn, "SELECT * FROM uzivatele where Jmeno = '".$username."' AND Heslo = '".$password."'");
        if (mysqli_num_rows($passCheck) == 0) {
            badData("Wrong password");
        }else{
            if($type == null){
                badData("Please select as who you want to login");
            }else{
                $_SESSION["logedUser"] = $username;
                $_SESSION["typeOfUser"] = $type;
                header("Location:../home.php");
                exit();
            }
        }
    }

    function badData($message){
        $_SESSION["message"] = $message;
        header("Location:../index.php");
        exit();
    }
?>