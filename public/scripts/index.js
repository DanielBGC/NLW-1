const modal = document.querySelector("#modal")
const buttonSearch = document.querySelector("#page-home main a")
const close = document.querySelector("#modal .header a")

//remove a classe "hide" do modal quando o buttonSearch for clicado
buttonSearch.addEventListener("click", function() {
    modal.classList.remove("hide")
})

//adiciona a classe "hide" do modal quando o botão "X" for clicado
close.addEventListener("click", function() {
    modal.classList.add("hide")
})