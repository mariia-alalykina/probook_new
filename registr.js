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

function checkPswMatch(psw1, psw2)
{
    if (psw1 == psw2) { return true; }
    else 
    {
        alert('Пароли не совпадают!');
        return false;
    }
}

function checkData()
{
    let u_name = document.getElementById('r_name').value,
    u_email = document.getElementById('r_email').value,
    u_psw1 = document.getElementById('r_psw1').value,
    u_psw2 = document.getElementById('r_psw2').value;

    if(checkEmail(u_email) && checkPsw(u_psw1) && checkPswMatch(u_psw1, u_psw2))
    {
        let data_text = {name: u_name, email: u_email, psw: u_psw1},
            result = "";
        $.ajax(
        {
            method: "POST",
            url: "registration.php",
            dataType: "text",
            async: false,
            data: data_text,
            success: function(data) {
                result = data;
            }
        });
        alert(result);
        window.location.reload();
    }

    return false;
}