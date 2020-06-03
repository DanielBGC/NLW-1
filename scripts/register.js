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

function getCityName(event) {
    const cityInput = document.querySelector("input[name=city]")

    const indexOfSelectedCity = event.target.selectedIndex;

    cityInput.value = event.target.options[indexOfSelectedCity].text
}

ufSelect.addEventListener("change", getCities)

citySelect.addEventListener("change", getCityName)
