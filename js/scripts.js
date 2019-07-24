
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

for(i = 0; i < repository.length; i++) {
    let currentPokemon = repository[i];
    document.write(currentPokemon.name + ': ' + currentPokemon.height);
    if (currentPokemon.height > 30) {
        document.write('... <span style="color: red">Wow, that\'s big!</span>');
    }
    document.write('<br />');
}