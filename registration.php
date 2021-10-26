<?php
require_once 'connection.php';

$link = mysqli_connect($host, $user, $password, $database)
or die("Ошибка " . mysqli_error($link));

if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['psw']))
{
    $name = htmlentities(mysqli_real_escape_string($link, $_POST['name']));
    $email = htmlentities(mysqli_real_escape_string($link, $_POST['email']));
    $password = htmlentities(mysqli_real_escape_string($link, $_POST['psw']));

    $query = "SELECT * FROM `user` WHERE `user`.`email` = '$email'";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 

    if(mysqli_num_rows($result) != 0)
    {
        echo "Пользователь с такой электронной почтой уже зарегистрирован!";
        return;
    }
    else
    {
        $query1 = "INSERT INTO `user` (`user_id`, `name`, `email`, `password`) VALUES(NULL, '$name', '$email', '$password');";
        $result1 = mysqli_query($link, $query1) or die("Ошибка " . mysqli_error($link)); 

        if($result1)
        {
            echo $name . ', поздравляем! Вы успешно зарегистрированы! Теперь войдите в личный кабинет через форму авторизации!';
        }
    }
}
else
{
    echo 'Не задано какое-то из полей.';
}

mysqli_close($link);

?>