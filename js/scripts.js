
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

    return {
        getAll: getAll,
        add: add
    }
}();

POKEMONREPOSITORY.add({ // test adding pokemon to repo
    name: 'Catasaur',
    height: 222,
    types: ['mew', 'neko punch']
})

POKEMONREPOSITORY.getAll().forEach(pokemon => {
    document.write(pokemon.name + ': ' + pokemon.height);
    if (pokemon.height > 30) {
        document.write('... <span style="color: red">Wow, that\'s big!</span>');
    }
    document.write('<br />');
});