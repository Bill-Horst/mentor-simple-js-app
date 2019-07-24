
let pokemonList = document.querySelector('.pokemon-list');

let POKEMONREPOSITORY = function () {

    let repository = [];

    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function loadList() {
        return fetch(apiUrl).then(res => {
            return res.json();
        }).then(json => {
            json.results.forEach(item => {
                var pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(pokemon) {
        var url = pokemon.detailsUrl;
        return fetch(url).then(res => {
            return res.json();
        }).then(details => {
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = Object.keys(details.types);
        }).catch(function (e) {
            console.error(e);
        });
    }

    function getAll() {
        return repository;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object' && Object.keys(pokemon).includes('name')) { // bonus type / key check (check for existence of name)
            repository.push(pokemon);
        }
    }

    function findByName(name) {
        return repository.filter(pokemon => pokemon.name === name);
    }

    function addListItem(pokemon) {
        let pokeButton = document.createElement('button');
        pokeButton.innerHTML = pokemon.name;
        pokeButton.classList.add('pokemon-button');
        pokeButton.addEventListener('click', function (e) {
            showDetails(pokemon)
        });
        let listItem = document.createElement('li');
        listItem.appendChild(pokeButton);
        return listItem;
    }

    return {
        getAll: getAll,
        add: add,
        findByName: findByName,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    }
}();

function showDetails(pokemon) {
    POKEMONREPOSITORY.loadDetails(pokemon).then(function () {
        console.log(pokemon)
    });
}

POKEMONREPOSITORY.loadList().then(function () {
    POKEMONREPOSITORY.getAll().forEach(pokemon => {
        pokemonList.appendChild(POKEMONREPOSITORY.addListItem(pokemon)); // changed it a bit... lesson asks to append to pokemonList from inside the iife, I'm appending it outside
    });
});
