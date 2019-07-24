
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

repository.forEach(pokemon => {
    document.write(pokemon.name + ': ' + pokemon.height);
    if (pokemon.height > 30) {
        document.write('... <span style="color: red">Wow, that\'s big!</span>');
    }
    document.write('<br />');
});