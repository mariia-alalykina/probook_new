<?php
require_once 'connection.php';

$link = mysqli_connect($host, $user, $password, $database)
or die("Ошибка " . mysqli_error($link));

if(isset($_POST['user_id']))
{
    $u_id = $_POST['user_id'];

    $query = "SELECT `book_order`.`order_id`, `book_order`.`date`, `book_order`.`amount`, `order_details`.`book_id`, `order_details`.`number_of_books`, `order_details`.`cost`, `order_details`.`book_name`, `order_details`.`book_author` FROM `book_order` LEFT JOIN `order_details` ON `order_details`.`order_id` = `book_order`.`order_id` WHERE `book_order`.`user_id` = '$u_id';";

    $query_name = "SELECT `user`.`name` FROM `user` WHERE `user`.`user_id` = '$u_id';";

    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    $result_name = mysqli_query($link, $query_name) or die("Ошибка " . mysqli_error($link));

    $num_rows = mysqli_num_rows($result);
    $user_name = mysqli_fetch_row($result_name);
    $name = $user_name[0]; 

    if($result && $result_name)
    {
        $totalString = '<p>История заказов пользователя ' . $name . '</p><br>';
        if ($num_rows == 0)
        {
            $totalString .= '<p>Вы не совершили ещё ни одного заказа.</p>';
        }
        else
        {
            $totalString .= '<table><th>Номер заказа</th><th>Дата</th><th>Название книги</th><th>Автор</th><th>Количество</th><th>Цена</th><th>Сумма заказа</th>';
            $number_of_order = 0;
            for($i = 0; $i < $num_rows; ++$i)
            {
                $row = mysqli_fetch_row($result);
                if($row[0] != $number_of_order)
                {
                    $totalString .= '<tr style = "border-top: 1px dashed #003300;">
                    <td class = "order_id">' . $row[0] . '</td><td>' . $row[1] . '</td><td><a href = "book.html" data-id = "' . $row[3] . '" onclick="getId(this)"><p>' . $row[6] . '</p></a></td><td>' . $row[7] . '</td><td class = "number">' . $row[4] . '</td><td class = "cost"><span>' . $row[5] . '</span> грн.</td><td class = "amount">' . $row[2] . 'грн.</td>
                </tr>';
                    $number_of_order = $row[0];
                }
                else
                {
                    $totalString .= '<tr>
                    <td class = "order_id"></td><td></td><td><a href = "book.html" data-id = "' . $row[3] . '" onclick="getId(this)"><p>' . $row[6] . '</p></a></td><td>' . $row[7] . '</td><td class = "number">' . $row[4] . '</td><td class = "cost"><span>' . $row[5] . '</span> грн.</td><td class = "amount"></td>
                </tr>';
                }
            }
            $totalString .= '</table>';
        }
        echo $totalString;
    }
    else
    {
        echo "<p>Не удалось выполнить поиск.</p>";
    }
}
else
{
    echo "<p>Переданные данные не получены.</p>";
}











mysqli_close($link);
?>