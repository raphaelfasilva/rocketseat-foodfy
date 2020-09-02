const modalOverlay = document.querySelector('.modal-overlay')
const modal = document.querySelector('.modal')
const receitas = document.querySelectorAll('.receita')
const modalImagem = document.querySelector(".modal-imagem img")
const modalTitulo = document.querySelector(".modal-titulo")
const modalAutor = document.querySelector(".modal-autor")
for (let receita of receitas) {
    const cardImage = receita.querySelector(".imagem-receita img")
    const cardTitle = receita.querySelector(".titulo-receita")
    const cardAutor = receita.querySelector(".autor-receita")
    receita.addEventListener("click", function() {
        modalOverlay.classList.add("active")
        modalImagem.src = cardImage.getAttribute("src")
        modalTitulo.textContent = cardTitle.textContent
        modalAutor.textContent = cardAutor.textContent
    })
}
document.querySelector(".close-modal").addEventListener("click", function() {
    modalOverlay.classList.remove("active")
})
const ingredients = document.querySelector('.recipe-container-ingredients-content')
const preparation = document.querySelector('.recipe-container-preparation-content')
const information = document.querySelector('.recipe-container-information-content')
const buttons = document.querySelectorAll('button');
for (let button of buttons) {
    button.addEventListener('click', function() {
        if (button.textContent == 'ESCONDER') {
            button.textContent = 'MOSTRAR'
        } else {
            button.textContent = 'ESCONDER'
        }
        const idButton = button.getAttribute('id')

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