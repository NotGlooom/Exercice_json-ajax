$(document).ready(function () {
    // Le constructeur du personnage
    function Character(money, attack, defense) {
        this.money = money;
        this.attack = attack;
        this.defense = defense;
    }

    // Créer une instance du personnage au chargement de la page
    const player = new Character(5000, 10, 5);

    // Fonction pour mettre à jour l'interface utilisateur du personnage
    function updateCharacterUI() {
        $('#argent').text(player.money);
        $('#attaque').text(player.attack);
        $('#defense').text(player.defense);
    }

    // Fonction pour mettre à jour l'interface utilisateur des items
    function updateItemUI(item) {
        $('#achat').append(`<option value="${item.id}">${item.nom} - $${item.prix}</option>`);

        $('#tableau tbody').append(
            `<tr>
                <td>${item.nom}</td>
                <td>${item.defense}</td>
                <td>${item.attaque}</td>
                <td>${item.prix}</td>
            </tr>`
        );

        // Mettre à jour l'affichage initial du personnage
        updateCharacterUI();
    }

    // Charger les items depuis le fichier item.json
    $.getJSON('items.json')
        .done(function (items) {
            items.forEach(function (item) {
                updateItemUI(item);
            });
        })
        .fail(function (error) {
            console.error('Erreur lors du chargement des items :', error);
        });

    // Fonction pour acheter un item
    $('#btn-confirm').on('click', function () {
        const selectedItem = $('#achat option:selected');

        if (!selectedItem.length) {
            alert('Veuillez sélectionner un item.');
            return;
        }

        const itemId = parseInt(selectedItem.val(), 10);

        // Garder trace des items achetés
        if (!player.purchasedItems) {
            player.purchasedItems = [];
        }

        // Recharger les items depuis le fichier item.json
        $.getJSON('items.json')
            .done(function (data) {
                // Rechercher l'item dans la liste des items
                const purchasedItem = data.find(item => item.id === itemId);

                if (player.money < purchasedItem.prix) {
                    alert('Vous n\'avez pas assez d\'argent pour acheter cet item.');
                    return;
                }

                // Mettre à jour les scores du personnage
                player.money -= purchasedItem.prix;
                player.attack += purchasedItem.attaque;
                player.defense += purchasedItem.defense;

                // Mettre à jour l'interface utilisateur
                updateCharacterUI();

                player.purchasedItems.push({
                    name: purchasedItem.nom,
                    price: purchasedItem.prix
                });

                // Sauvegarder les items achetés dans LocalStorage
                savePurchasedItemsToLocalStorage(player.purchasedItems);

            })
            .fail(function (error) {
                console.error('Erreur lors du chargement des items :', error);
            });

    });
    // Fonction pour sauvegarder les items achetés dans localStorage
    function savePurchasedItemsToLocalStorage(purchasedItems) {
        localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
    }


    $('#adventure-btn').on('click', function () {
        window.location.href = 'aventure.html'
    });
});