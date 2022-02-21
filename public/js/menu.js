'use strict'

function show_by_genre(elem)
{
    sessionStorage.removeItem('author');
    sessionStorage.removeItem('year');
    sessionStorage.removeItem('cost_from');
    sessionStorage.removeItem('cost_to');
    
    let book_genre = elem.getAttribute('data-genre');
    sessionStorage.setItem('genre', book_genre);
    sessionStorage.setItem('sort', 'by_id');
    window.location.href = 'catalog.html';
}

function showMenu()
{
    document.getElementById("drop_down").classList.toggle("show");
}

window.onclick = function(e)
{
    if(!e.target.matches('.catalog_btn'))
    {
        let drop_menu = document.getElementById("drop_down");
        if (drop_menu.classList.contains('show'))
        {
            drop_menu.classList.remove('show');
        }
    }
}




