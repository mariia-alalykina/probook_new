<?php
require_once 'connection.php';

$link = mysqli_connect($host, $user, $password, $database)
or die("Ошибка " . mysqli_error($link));

if (isset($_POST['author']) && isset($_POST['series']) && isset($_POST['name']) && isset($_POST['publishing_house']) && isset($_POST['year']) && isset($_POST['number_of_pages']) && isset($_POST['age_limit']) && isset($_POST['description']) && isset($_POST['genre']) && isset($_POST['availability']) && isset($_POST['price']) && isset($_POST['image']))
{
    $author = htmlentities(mysqli_real_escape_string($link, $_POST['author']));
    $series = htmlentities(mysqli_real_escape_string($link, $_POST['series']));
    $name = htmlentities(mysqli_real_escape_string($link, $_POST['name']));
    $publishing_house = htmlentities(mysqli_real_escape_string($link, $_POST['publishing_house']));
    $year = htmlentities(mysqli_real_escape_string($link, $_POST['year']));
    $number_of_pages = htmlentities(mysqli_real_escape_string($link, $_POST['number_of_pages']));
    $age_limit = htmlentities(mysqli_real_escape_string($link, $_POST['age_limit']));
    $description = htmlentities(mysqli_real_escape_string($link, $_POST['description']));
    $genre = htmlentities(mysqli_real_escape_string($link, $_POST['genre']));
    $availability = htmlentities(mysqli_real_escape_string($link, $_POST['availability']));
    $price = htmlentities(mysqli_real_escape_string($link, $_POST['price']));
    $image = htmlentities(mysqli_real_escape_string($link, $_POST['image']));

    $query1 = "INSERT INTO `book`(`book_id`, `author`, `series`, `name`, `publishing_house`, `year`, `number_of_pages`, `age_limit`, `description`, `genre`, `availability`, `price`) VALUES (NULL,'$author','$series','$name','$publishing_house', '$year', '$number_of_pages','$age_limit','$description','$genre','$availability', '$price')";
    $query2 = "INSERT INTO `image`(`book_id`, `url_image`) VALUES (LAST_INSERT_ID(), '$image')";

    $result1 = mysqli_query($link, $query1) or die("Ошибка " . mysqli_error($link)); 
    $result2 = mysqli_query($link, $query2) or die("Ошибка " . mysqli_error($link));
    
    if($result1 && $result2)
    {
        echo "Книга успешно добавлена в базу данных!";
        return;
    }
    else 
    {
        echo "Книга не была добавлена.";
        return;
    }
}
else
{
    echo "Получены данные не из всех полей.";
}