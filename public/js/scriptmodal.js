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