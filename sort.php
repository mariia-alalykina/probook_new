<?php
require_once 'connection.php';

$link = mysqli_connect($host, $user, $password, $database)
or die("Ошибка " . mysqli_error($link));

$val = $_GET['sort_type'];

if(isset ($_GET['book_genre']))
{
    $book_genre = $_GET['book_genre'];

    if ($book_genre == 'all')
    {
        if($val == 'by_name')
        {
            $query = "SELECT `book_image`.`url_image`, `book`.`price`, `book`.`name`, `book`.`author_surname`, `book`.`book_id` FROM `book` LEFT JOIN `book_image` ON `book_image`.`book_id` = `book`.`book_id` ORDER BY `book`.`name`;";
            $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
        }
        else if ($val == 'by_price_up')
        {
            $query = "SELECT `book_image`.`url_image`, `book`.`price`, `book`.`name`, `book`.`author_surname`, `book`.`book_id` FROM `book` LEFT JOIN `book_image` ON `book_image`.`book_id` = `book`.`book_id` ORDER BY `book`.`price`;";
            $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
        }
        else if ($val == 'by_price_down')
        {
            $query = "SELECT `book_image`.`url_image`, `book`.`price`, `book`.`name`, `book`.`author_surname`, `book`.`book_id` FROM `book` LEFT JOIN `book_image` ON `book_image`.`book_id` = `book`.`book_id` ORDER BY `book`.`price` DESC;";
            $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
        }
        else if ($val == 'by_id')
        {
            $query = "SELECT `book_image`.`url_image`, `book`.`price`, `book`.`name`, `book`.`author_surname`, `book`.`book_id` FROM `book` LEFT JOIN `book_image` ON `book_image`.`book_id` = `book`.`book_id` ORDER BY `book`.`book_id`;";
            $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
        }
    }
    else
    {
        $genre = "";
        if ($book_genre == 'fiction') {$genre = "Художественная литература";}
        else if ($book_genre == 'non-fiction') {$genre = 'Научно-популярная литература';}
        else if ($book_genre == 'study') {$genre = 'Учебная литература';}
        else if ($book_genre == 'self-edu') {$genre = 'Саморазвитие';}
        else if ($book_genre == 'bio') {$genre = 'Биографии, мемуары';}
    
        if($val == 'by_name')
        {
            $query = "SELECT `book_image`.`url_image`, `book`.`price`, `book`.`name`, `book`.`author_surname`, `book`.`book_id` FROM `book` LEFT JOIN `book_image` ON `book_image`.`book_id` = `book`.`book_id` WHERE `book`.`genre` = '$genre' ORDER BY `book`.`name`;";
            $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
        }
        else if ($val == 'by_price_up')
        {
            $query = "SELECT `book_image`.`url_image`, `book`.`price`, `book`.`name`, `book`.`author_surname`, `book`.`book_id` FROM `book` LEFT JOIN `book_image` ON `book_image`.`book_id` = `book`.`book_id` WHERE `book`.`genre` = '$genre' ORDER BY `book`.`price`;";
            $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
        }
        else if ($val == 'by_price_down')
        {
            $query = "SELECT `book_image`.`url_image`, `book`.`price`, `book`.`name`, `book`.`author_surname`, `book`.`book_id` FROM `book` LEFT JOIN `book_image` ON `book_image`.`book_id` = `book`.`book_id` WHERE `book`.`genre` = '$genre' ORDER BY `book`.`price` DESC;";
            $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
        }
        else if ($val == 'by_id')
        {
            $query = "SELECT `book_image`.`url_image`, `book`.`price`, `book`.`name`, `book`.`author_surname`, `book`.`book_id` FROM `book` LEFT JOIN `book_image` ON `book_image`.`book_id` = `book`.`book_id` WHERE `book`.`genre` = '$genre' ORDER BY `book`.`book_id`;";
            $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
        }
    }
    
    $url_image = "";
    $price = 0;
    $book_name = "";
    $author = "";      
    $id = 0;
    
    $totalString = "";
    
    if ($result)
    {
        $num_rows = mysqli_num_rows($result);
    
        for($i = 0; $i < $num_rows; ++$i)
        {
            $row = mysqli_fetch_row($result);
    
            $totalString .= '<div class = "prod_card">
            <a href = "book.html" data-id = "' . $row[4] . '" title = "' . $row[2] . '">
                <div class = "img_book_card">
                    <img src = "' . $row[0] . '">
                </div>
                <p class = "cost"><span>' . $row[1] . '</span> грн.</p>
                <p class = "book_name">' . $row[2] . '</p>
                <p class = "book_author">' . $row[3] . '</p>
            </a>
                <button class = "add_to_basket" type="submit" data-id = "' . $row[4] . '">Добавить в корзину</button>
        </div>';
        }
        echo $totalString;
        return;
    }
    else 
    {
        echo '<script>alert("Строк нет.");</script>';
        return;
    }
}
else
{
    echo 'Не получает переменную';
    exit();
}
    mysqli_close($link);
?>