const receitas = document.querySelectorAll('.receita');
for (let receita of receitas) {
    receita.addEventListener("click", function() {
        const recipeId = receita.getAttribute('id')
        window.location.href = `/admin/recipes/${recipeId}`
    })
}