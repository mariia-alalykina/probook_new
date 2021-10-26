<?php
require_once 'connection.php';

$link = mysqli_connect($host, $user, $password, $database)
or die("Ошибка " . mysqli_error($link));

if(isset($_POST['user']) && isset($_POST['phone']) && isset($_POST['comment']) && isset($_POST['amount']) && isset($_POST['card_data']))
{
    $user_id = htmlentities(mysqli_real_escape_string($link, $_POST['user']));
    $phone = htmlentities(mysqli_real_escape_string($link, $_POST['phone']));
    $details = htmlentities(mysqli_real_escape_string($link, $_POST['comment']));
    $amount = htmlentities(mysqli_real_escape_string($link, $_POST['amount']));
    $card_data = json_decode($_POST['card_data'], true);

    $query1 = "INSERT INTO `book_order` (`order_id`, `user_id`, `date`, `phone`, `order_info`, `amount`) VALUES (NULL, '$user_id', NOW(), '$phone', '$details', '$amount');";

    $result1 = mysqli_query($link, $query1) or die("Ошибка " . mysqli_error($link)); 

    $book_id = 0;
    $number_of_books = 0;
    $cost = 0;
    $book_name = "";
    $book_author = "";

    foreach ($card_data as $key1 => $item)
    {
        $book_id = $key1;
        $number_of_books = $item[3];
        $cost = $item[4];
        $book_name = $item[1];
        $book_author = $item[2];

        $query2 = "INSERT INTO `order_details` (`order_id`, `book_id`, `number_of_books`, `cost`, `book_name`, `book_author`) VALUES (LAST_INSERT_ID(), '$book_id', '$number_of_books', '$cost', '$book_name', '$book_author');";
        $result2 = mysqli_query($link, $query2) or die("Ошибка " . mysqli_error($link)); 
    }

    if ($result1 && $result2)
    {
        echo 'true';
    }
    else if ($result1 && !$result2)
    {
        echo 'false';
    }
    else if (!$result1 && $result2)
    {
        echo "false";
    }
    else
    {
        echo "false";
    }
}

mysqli_close($link);
?>