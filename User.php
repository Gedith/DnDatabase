<?php
    require_once("./PHP/connect.php");
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DnDDatabase - user</title>
        <style>
        * {
            box-sizing: border-box;
        }
        .openBtn {
            display: flex;
            justify-content: left;
        }
        .openButton {
            border: none;
            border-radius: 5px;
            background-color: #1c87c9;
            color: white;
            padding: 14px 20px;
            cursor: pointer;
            position: fixed;
        }
        .popup {
            position: relative;
            text-align: center;
            width: 100%;
        }
        .formPopup {
            display: none;
            position: fixed;
            left: 45%;
            top: 5%;
            transform: translate(-50%, 5%);
            border: 3px solid #999999;
            z-index: 9;
        }
        .formContainer {
            max-width: 300px;
            padding: 20px;
            background-color: #fff;
        }
        .formContainer input[type=text],
        .formContainer input[type=password] {
            width: 100%;
            padding: 15px;
            margin: 5px 0 20px 0;
            border: none;
            background: #eee;
        }
        .formContainer input[type=text]:focus,
        .formContainer input[type=password]:focus {
            background-color: #ddd;
            outline: none;
        }
        .formContainer .btn {
            padding: 12px 20px;
            border: none;
            background-color: #8ebf42;
            color: #fff;
            cursor: pointer;
            width: 100%;
            margin-bottom: 15px;
            opacity: 0.8;
        }
        .formContainer .cancel {
            background-color: #cc0000;
        }
        .formContainer .btn:hover,
        .openButton:hover {
            opacity: 1;
        }
        </style>
    </head>
    <main>
        <nav>
            <a href="home.php">Domů</a>
        </nav>
        <?php
            if(isset($_SESSION["message"])){
                echo "<p>".$_SESSION['message']."</p>";
                $_SESSION["message"] = null;
            }
            echo "Jméno:" . $_SESSION["logedUser"] . " <button onclick='openForm()'>Změnit</button><br>";
            echo "<button onclick='openPassForm()'>Změnit heslo</button>";
        ?>
        <div class="popup">
        <div class="formPopup" id="namePopupForm">
            <form action="changeName.php" method="POST" class="formContainer">
                <h2>Změňtě jméno.</h2>
                <label for="jmeno">
                    <strong>Jméno</strong>
                </label>
                <input type="text" id="jmeno" placeholder="Jméno" name="jmeno" required>
                <label for="nJmeno">
                    <strong>Nové jméno</strong>
                </label>
                <input type="text" id="nJmeno" placeholder="Nové jméno" name="noveJmeno" required>
                <button type="submit" class="btn">Změnit</button>
                <button type="button" class="btn cancel" onclick="closeForm()">Zavřít</button>
            </form>
        </div>
        </div>
        <div class="popup">
        <div class="formPopup" id="passPopupForm">
            <form action="changePass.php" method="POST" class="formContainer">
                <h2>Změna hesla.</h2>
                <label for="heslo">
                    <strong>Heslo</strong>
                </label>
                <input type="password" id="heslo" placeholder="Heslo" name="heslo" required>
                <label for="nHeslo">
                    <strong>Nové heslo</strong>
                </label>
                <input type="password" id="nHeslo" placeholder="Nové heslo" name="noveHeslo" required>
                <label for="nHesloZnovu">
                    <strong>Nové heslo znovu</strong>
                </label>
                <input type="password" id="nHesloZnovu" placeholder="Nové heslo znovu" name="noveHesloZnovu" required>
                <button type="submit" class="btn">Změnit</button>
                <button type="button" class="btn cancel" onclick="closePassForm()">Zavřít</button>
            </form>
        </div>
        </div>
        <script>
        function openForm() {
            document.getElementById("namePopupForm").style.display = "block";
        }
        function closeForm() {
            document.getElementById("namePopupForm").style.display = "none";
        }
        function openPassForm() {
            document.getElementById("passPopupForm").style.display = "block";
        }
        function closePassForm() {
            document.getElementById("passPopupForm").style.display = "none";
        }
        </script>
    </main>
    <footer>

    </footer>
</body>
</html>