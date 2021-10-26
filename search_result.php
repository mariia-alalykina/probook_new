<?php
require_once 'connection.php';

$link = mysqli_connect($host, $user, $password, $database)
or die("Ошибка " . mysqli_error($link));

if(isset ($_GET['_search']))
{
    $text = htmlentities(mysqli_real_escape_string($link, $_GET['_search']));

    $query = "SELECT `book`.`name`, `book`.`author`, `book`.`price`, `book`.`book_id` FROM `book` WHERE `book`.`name` LIKE '%$text%' OR `book`.`author` LIKE '%$text%';";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 

    $price = 0;
    $book_name = "";
    $author = "";      
    $id = 0;
    $totalString = "";

    if ($result)
    {
        $totalString .= '<p>Результаты поиска по запросу "<b>' . $text . '</b>"</p>';

        $num_rows = mysqli_num_rows($result);
        if ($num_rows == 0)
        {
            $totalString .= '<p>Ничего не найдено.</p>';
        }
        else
        {
            $totalString .= '<table>';
            for($i = 0; $i < $num_rows; ++$i)
            {
                $row = mysqli_fetch_row($result);
                $totalString .= '<tr>
                        <td><a href = "book.html" data-id = "' . $row[3] . '" onclick="getId(this)"><p>' . $row[0] . '</p></a></td><td>' . $row[1] . '</td><td><span>' . $row[2] . '</span> грн.</td>
                    </tr>';
            }
            $totalString .= '</table>';
        }        
        echo $totalString;        
    }
    else 
    {
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