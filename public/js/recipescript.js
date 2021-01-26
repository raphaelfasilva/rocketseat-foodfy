const ingredients = document.querySelector('.recipe-container-ingredients-content')
const preparation = document.querySelector('.recipe-container-preparation-content')
const information = document.querySelector('.recipe-container-information-content')
const buttons = document.querySelectorAll('.ingredients-button,.preparation-button,.information-button');
for (let button of buttons) {
    button.addEventListener('click', function() {
        if (button.textContent == 'ESCONDER') {
            button.textContent = 'MOSTRAR'
        } else {
            button.textContent = 'ESCONDER'
        }
        const idButton = button.getAttribute('class')

        if (idButton == 'ingredients-button') {
            if (ingredients.classList.contains('hide')) {
                ingredients.classList.remove('hide')
            } else {
                ingredients.classList.add('hide')
            }
        } else if (idButton == 'preparation-button') {
            if (preparation.classList.contains('hide')) {
                preparation.classList.remove('hide')
            } else {
                preparation.classList.add('hide')
            }
        } else {
            if (information.classList.contains('hide')) {
                information.classList.remove('hide')
            } else {
                information.classList.add('hide')
            }
        }

    })
}