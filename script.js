let hallContainer = document.querySelector('.container-hall');
let selectedMovie = document.querySelector('#movie');
let seats = document.querySelectorAll('.row .seat:not(.occupied)');

let count = document.querySelector('#count');
let priceTotal = document.querySelector('#price');
let ticketPrice = +document.querySelector('#movie').value;

console.log(typeof ticketPrice);

function showSelectedInfo(){
    let checked = document.querySelectorAll('.row .seat.selected').length;
    count.textContent = checked; 
    priceTotal.textContent = checked * ticketPrice;
}

// Ставим EventListener на родителя для того чтобы получать информацию на что нажали в пределах этого контейнера
hallContainer.addEventListener('click', (event) => {
    // Отслеживаем на что нажали - event.target
    // метод contains() проверяет есть ли в nodeList такой элемент возвращает true,false
    if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')){
        event.target.classList.toggle('selected');
        showSelectedInfo();
    }
})

// EventListener на селекторе
selectedMovie.addEventListener('change', event => {
    ticketPrice = event.target.value;

    showSelectedInfo();
})