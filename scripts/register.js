const ufSelect = document.querySelector("select[name=uf]")
const citySelect = document.querySelector("select[name=city]")

function getStates() {
    const stateApi = fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados") 

    //THEN = caminho de sucesso
    stateApi.then(function(response) {
        return(response.json())
    }).then(function(states) {
        for(let state of states) {
            ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`
        }
    })

    //CATCH = caminho de erro
    stateApi.catch(function() {
        console.warn("ERROR 404")
    })
}
getStates()

function getCities(event) {
    const stateInput = document.querySelector("input[name=state]")

    const indexOfSelectedState = event.target.selectedIndex;

    stateInput.value = event.target.options[indexOfSelectedState].text

    
    let ufId = event.target.value
    
    const cityApi = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`

    citySelect.innerHTML = `<option value>Selecione a cidade</option>`
    citySelect.disabled = true

    fetch(cityApi)
    .then(function(response) {
        return(response.json())
    }).then(function(cities) {
        for(let city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`
        }

        citySelect.disabled = false;
    })
}

ufSelect.addEventListener("change", getCities)

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

//input:hidden 
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    
    //adicionando ou removendo a classe "selected", quando o item for selecionado
    event.target.classList.toggle("selected")

    const itemId = event.target.dataset.id

    //verifica se existem itens selecionados e returna o seu index
    const isSelected = selectedItems.findIndex(item => item == itemId) 
 

    //remove o item do array se já estiver selecionado
    if(isSelected >= 0) {
        const filteredItems = selectedItems.filter(item => item != itemId)

        selectedItems = filteredItems
    }
    //adiciona o item ao array se não estiver selecionado
    else {
        selectedItems.push(itemId)
    }

    //atualiza o input hidden com os itens selecionados
    collectedItems.value = selectedItems
}
