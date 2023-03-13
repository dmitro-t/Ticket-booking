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

function setMovieInfoToLS(){
    let index = selectedMovie.selectedIndex;
    let price = selectedMovie.value;
    localStorage.setItem('indexMovie', index);
    localStorage.setItem('priceMovie', price);
}

// Запускается функция при перезагрузке страницы
getFromLS();
showSelectedInfo();

// получаем из LocStor
function getFromLS(){
    let selectedSeats = JSON.parse(localStorage.getItem('indexSelectedSeats'));
    // console.log(selectedSeats.indexOf(5))
    // Если что то есть в LocStor
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach(function(elem, index){
            // в index передается поочередно ИНДЕКСЫ эл-тов seat есть ли в selectedSeats такое ЗНАЧЕНИЕ, если нет возвращает -1 
            if(selectedSeats.indexOf(index) != -1){
                elem.classList.add('selected');
            }
        })
    }
     
    let selectedMovieIndex = localStorage.getItem('indexMovie');
    if(selectedMovieIndex !== null){
        selectedMovie.selectedIndex = selectedMovieIndex;
    }
}

// Ставим EventListener на родителя для того чтобы получать информацию на что нажали в пределах этого контейнера
hallContainer.addEventListener('click', (event) => {
    // Отслеживаем на что нажали - event.target
    // метод contains() проверяет есть ли в nodeList такой элемент возвращает true,false
    if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')){
        event.target.classList.toggle('selected');
        showSelectedInfo();
    }

    // Хранение в LocStor индексы выбранных мест
    let selectedSeats = document.querySelectorAll('.row .seat.selected');
    indexSelectedSeats = [...selectedSeats].map(function(elem){
        return [...seats].indexOf(elem);
    });
   
    localStorage.setItem('indexSelectedSeats', JSON.stringify(indexSelectedSeats));

})
    

// EventListener на селекторе
selectedMovie.addEventListener('change', event => {
    ticketPrice = event.target.value;

    showSelectedInfo();
    setMovieInfoToLS();
})