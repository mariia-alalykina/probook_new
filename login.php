<?php
require_once 'connection.php';

$link = mysqli_connect($host, $user, $password, $database)
or die("Ошибка " . mysqli_error($link));

if(isset($_POST['u_email']) && isset($_POST['u_psw']))
{
    $email = htmlentities(mysqli_real_escape_string($link, $_POST['u_email']));
    $password = htmlentities(mysqli_real_escape_string($link, $_POST['u_psw']));

    $query = "SELECT * FROM `user` WHERE `user`.`email` = '$email' AND `user`.`password` = '$password';";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));    

    if(mysqli_num_rows($result) == 0)
    {
        echo 'false';
        return;
    }
    else if (mysqli_num_rows($result) == 1)
    {
        echo 'true';
        return;
    }
}
else
{
    echo 'Не задано какое-то из полей.';
}

mysqli_close($link);
?>