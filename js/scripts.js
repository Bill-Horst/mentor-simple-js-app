
let POKEMONREPOSITORY = function () {
    let repository = [
        {
            name: 'Bulbasaur',
            height: 21,
            types: ['grass', 'poison']
        },
        {
            name: 'HarrySaur',
            height: 26,
            types: ['grass', 'needles']
        },
        {
            name: 'Smidgeon',
            height: 40,
            types: ['grass', 'flying']
        }
    ];

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
        pokeButton.addEventListener('click', function(e) {
            showDetails(pokemon)
        });
        let listItem = document.createElement('li');
        listItem.appendChild(pokeButton);
        return listItem;
    }

    function showDetails(pokemon) {
        console.log(pokemon)
    }

    return {
        getAll: getAll,
        add: add,
        findByName: findByName,
        addListItem: addListItem
    }
}();

POKEMONREPOSITORY.add({ // test adding pokemon to repo
    name: 'Catasaur',
    height: 222,
    types: ['mew', 'neko punch']
});

let pokemonList = document.querySelector('.pokemon-list');

POKEMONREPOSITORY.getAll().forEach(pokemon => {
    pokemonList.appendChild(POKEMONREPOSITORY.addListItem(pokemon)); // changed it a bit... lesson asks to append to pokemonList from inside the iife, I'm appending it outside
});

console.log('test for findByName function: ', POKEMONREPOSITORY.findByName('Bulbasaur')[0].name); // test for findByName function