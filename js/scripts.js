let POKEMON_REPOSITORY = function () {

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

var MODAL_CONTROLS = (function () {
    var $modalContainer = document.querySelector('#modal-container');

    function showModal(pokemon) {
        // Clear all existing modal content
        $modalContainer.innerHTML = '';

        var modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
        var closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        var nameDisplay = document.createElement('h1');
        nameDisplay.innerText = pokemon.name;

        var heightDisplay = document.createElement('p');
        heightDisplay.innerText = `Height: ${pokemon.height}`;

        var imageDisplay = document.createElement('img');
        imageDisplay.setAttribute('src', pokemon.imageUrl);

        modal.appendChild(closeButtonElement);
        modal.appendChild(nameDisplay);
        modal.appendChild(heightDisplay);
        modal.appendChild(imageDisplay);
        $modalContainer.appendChild(modal);

        $modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        $modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    $modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal container,
        // We only want to close if the user clicks directly on the overlay
        var target = e.target;
        if (target === $modalContainer) {
            hideModal();
        }
    });

    return {
        showModal: showModal,
        hideModal: hideModal
    }

})();

// The ul to which the Pokemon will be appended:
let pokemonList = document.querySelector('.pokemon-list');

// The entry point for the app - lists the clickable Pokemon:
POKEMON_REPOSITORY.loadList().then(function () {
    POKEMON_REPOSITORY.getAll().forEach(pokemon => {
        pokemonList.appendChild(POKEMON_REPOSITORY.addListItem(pokemon)); // changed it a bit... lesson asks to append to pokemonList from inside the iife, I'm appending it outside
    });
});

// Shows details of clicked Pokemon in modal form:
function showDetails(pokemon) {
    POKEMON_REPOSITORY.loadDetails(pokemon).then(function () {
        MODAL_CONTROLS.showModal(pokemon);
    });
}