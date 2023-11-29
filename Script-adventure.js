$(document).ready(function () {
    // Charger les items depuis le fichier item.json
    $.getJSON('items.json')
        .done(function (items) {
            displayOwnedItems(items);
        })
        .fail(function (error) {
            console.error('Erreur lors du chargement des items :', error);
        });

    // Fonction pour afficher les items possédés
    function displayOwnedItems(allItems) {

        // Récupérer les items possédés par le joueur depuis localStorage
        const playerOwnedItems = getStoredPlayerOwnedItems();
        console.log('Stored player owned items:', playerOwnedItems);

        // Afficher les items possédés dans la liste
        const ownedItemsList = $('#owned-items-list');
        playerOwnedItems.forEach(item => {
            ownedItemsList.append(`<li>${item.name} - ${item.price}</li>`);
        });

    }

// Fonction pour récupérer les IDs des items possédés par le joueur depuis localStorage
    function getStoredPlayerOwnedItems() {
        const storedItems = localStorage.getItem('purchasedItems');
        return storedItems ? JSON.parse(storedItems) : [];
    }

    // Rediriger vers la page du magasin lors du clic sur le bouton "Retourner au magasin"
    $('#return-btn').on('click', function () {
        window.location.href = 'index.html';
    });
});