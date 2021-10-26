<?php
require_once 'connection.php';

$link = mysqli_connect($host, $user, $password, $database)
or die("Ошибка " . mysqli_error($link));

if(isset($_POST['u_email']) && isset($_POST['u_psw']))
{
    $email = htmlentities(mysqli_real_escape_string($link, $_POST['u_email']));
    $password = htmlentities(mysqli_real_escape_string($link, $_POST['u_psw']));

    $query = "SELECT `name` FROM `user` WHERE `user`.`email` = '$email' AND `user`.`password` = '$password';";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));

    $user_name = mysqli_fetch_row($result);
    $name = $user_name[0];        
    echo $name;
    return;
}
mysqli_close($link);
?>