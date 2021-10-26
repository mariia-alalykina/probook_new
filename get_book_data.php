<?php
 require_once 'connection.php';
		$link = mysqli_connect($host, $user, $password, $database) or die("Ошибка " . mysqli_error($link));

		if(isset ($_GET['book_id']))
        {
            $id_book = $_GET['book_id'];
            $query = "SELECT `book`.*, `image`.`url_image` FROM `book` LEFT JOIN `image` ON `image`.`book_id` = `book`.`book_id` WHERE `book`.`book_id` = $id_book;";
            $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 

            $author = "";
            $series = "";
            $book_name = "";
            $publishing_house = "";
            $year = 0;
            $number_of_pages = 0;
            $age_limit = "";
            $description = "";
            $genre = "";
            $availability = "";
            $price = 0;
            $url_image = "";

            $row = mysqli_fetch_row($result);
            if($result)
            {
                $author = $row[1];
                $series = $row[2];
                $book_name = $row[3];
                $publishing_house = $row[4];
                $year = $row[5];
                $number_of_pages = $row[6];
                $age_limit = $row[7];
                $description = $row[8];
                $genre = $row[9];
                $availability = $row[10];
                $price = $row[11];
                $url_image = $row[12];
            }
            else 
            {
                echo '<script>alert("Строки нет.");</script>';
                return;
            }

            $totalString = '<div class = "img_book_page"><img src = "' . $url_image . '"></div><div id = "book_content"><div class = "main_inform"><p class = "author"><b>Автор: </b><span>' . $author . '</span></p><p class = "series"><b>Серия: </b><span>' . $series . '</span></p><p class = "b_name"><b>Название: </b><span>' . $book_name . '</span></p><p class = "publishing"><b>Издательство: </b><span>' . $publishing_house . '</span></p><p class = "year"><b>Год: </b><span>' . $year . '</span></p><p class = "num_pages"><b>Количество страниц: </b><span>' . $number_of_pages . '</span></p><p class = "age_limit"><b>Возрастное ограничение: </b><span>' . $age_limit . '</span></p><p class = "book_id">Код товара: <span>' . $id_book . '</span></p></div><div class = "price_info"><p class = "availability">' . $availability . '</p><p class = "price"><span>' . $price . '</span> грн.</p><button class = "add_to_basket" type="submit" data-id = "' . $id_book . '">Добавить в корзину</button></div><div class = "description"><p><b>Описание: </b><br>' . $description . '</p></div></div>';
            
            echo $totalString;
            return;
        }
        else
        {
            echo '<script>';
            echo 'window.location.href="' . $_SERVER['REQUEST_URI'] . '?book_id =" + bookId';
            echo '</script>';
            exit();
        }	
        mysqli_close($link);
?>