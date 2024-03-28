
<?php
    require_once("./PHP/connect.php");
    session_start();

    $jmeno = $_POST["jmeno"];
    $noveJmeno = $_POST["noveJmeno"];

    $select = mysqli_query($conn, "SELECT Jmeno FROM uzivatele WHERE Jmeno = '".$jmeno."'");
    if (mysqli_num_rows($select) == 0) {
        badData("Username not found");
    }else{
        mysqli_query($conn, "UPDATE uzivatele SET Jmeno = '$noveJmeno' WHERE Jmeno = '$jmeno'");
        $_SESSION["message"] = "Change was successful!.";
        header("Location:../User.php");
        exit();
    }

    function badData($message){
        $_SESSION["message"] = $message;
        header("Location:../User.php");
        exit();
    }
?>