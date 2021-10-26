'use strict'
function checkEmail(email)
{
    if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    {
        return true;
    }
    else 
    {
        alert('Введён некорректный адрес электронной почты.');
        return false;
    }
}

function checkPsw(psw)
{
    if (psw.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/)) { return true; }
    else
    {
        alert('Введён некорректный пароль. Пароль должен содержать латинские буквы верхнего и нижнего регистра, цифры и иметь длину не менее 6 символов.');
        return false;
    }
}

function log_in()
{
    let user_email = document.getElementById('l_email').value,
    user_psw = document.getElementById('l_psw').value;

    if(user_email == 'admin' && user_psw == 'admin')
    {
        sessionStorage.setItem("is_authorit", 1);
        sessionStorage.setItem("u_id", 0);
        sessionStorage.setItem("u_name", 'admin');
        window.location.href = 'admin.html';
        return false;
    }
    else if(checkEmail(user_email) && checkPsw(user_psw))
    {
        let user_data = {u_email: user_email, u_psw: user_psw},
            result = "";

        $.ajax(
        {
            method: "POST",
            url: "login.php",
            dataType: "text",
            async: false, 
            data: user_data,
            success: function(data) {
                result = data;
                console.log(result);
            }
        });

        if(result == "false")
        {
            alert("Неверно введён логин или пароль. Попробуйте снова.");
            window.location.reload();
        }
        else if (result == "true")
        {
            let u_id = '', 
            u_name = '';
            $.ajax(
            {
                method: "POST",
                url: "get_user_id.php",
                dataType: "text",
                async: false, 
                data: user_data,
                success: function(data) {
                    u_id = data;
                    console.log(u_id);
                }
            });

            $.ajax(
            {
                method: "POST",
                url: "get_user_name.php",
                dataType: "text",
                async: false, 
                data: user_data,
                success: function(data) {
                    u_name = data;
                    console.log(u_name);
                }
            });
            
            sessionStorage.setItem("is_authorit", 1);
            sessionStorage.setItem("u_id", u_id);
            sessionStorage.setItem("u_name", u_name);
            window.location.href = 'account.html';
        }
        else {alert('Ошибка входа!');}
        
        return false;
    }
}
