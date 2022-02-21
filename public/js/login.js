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

async function log_in()
{
    let user_email = document.getElementById('l_email').value,
    user_psw = document.getElementById('l_psw').value;

    if(user_email == 'admin' && user_psw == 'admin') {
        sessionStorage.setItem("is_authorit", 1);
        sessionStorage.setItem("u_id", 0);
        sessionStorage.setItem("u_name", 'admin');
        window.location.href = 'admin.html';
        return false;
    }
    else if (user_email == 'operator' && user_psw == 'operator') {
        sessionStorage.setItem("is_authorit", 1);
        sessionStorage.setItem("u_id", -2);
        sessionStorage.setItem("u_name", 'operator');
        window.location.href = 'operator.html';
        return false;
    }
    else if (user_email == 'adminBooks' && user_psw == 'adminBooks') {
        sessionStorage.setItem("is_authorit", 1);
        sessionStorage.setItem("u_id", -3);
        sessionStorage.setItem("u_name", 'adminBooks');
        window.location.href = 'admin.html';
        return false;
    }
    else if (user_email == 'adminNews' && user_psw == 'adminNews') {
        sessionStorage.setItem("is_authorit", 1);
        sessionStorage.setItem("u_id", -4);
        sessionStorage.setItem("u_name", 'adminNews');
        window.location.href = 'admin.html';
        return false;
    }
    else if(checkEmail(user_email) && checkPsw(user_psw))
    {
        const response = await fetch ("api/login", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify( {
                email: user_email,
                password: user_psw
            })
        });

        if (response.ok === true) {
            const result = await response.text();
            reset();

            if(result == "false") {
                alert("Неверно введён логин или пароль. Попробуйте снова.");
                window.location.reload();
            }
            else if(result == "true") {
                const response1 = await fetch ("api/user/" + user_email + "/" + user_psw, {
                    method: "POST",
                    headers: { "Accept": "application/json", "Content-Type": "application/json" },
                });

                if (response.ok === true) {
                    const result1 = await response.json();
                    reset();

                    sessionStorage.setItem("is_authorit", 1);
                    sessionStorage.setItem("u_id", result1.user_id);
                    sessionStorage.setItem("u_name", result1.name);
                    window.location.href = 'account.html';
                }
            }
            else {alert('Ошибка входа!');}
            
            return false;
        }
    }
}
