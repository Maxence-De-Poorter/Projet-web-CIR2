function fetchAnnonces(annonces, pageNumber, pageSize, searchValues) {
    // Calculer l'indice de début et de fin de la page actuelle
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Récupérer les annonces de la page actuelle qui correspondent aux critères de recherche
    const annoncesPage = annonces.filter(annonce => {
        return annonce.price <= searchValues.price &&
            annonce.surface >= searchValues.surface &&
            annonce.nbRooms >= searchValues.rooms;
    }).slice(startIndex, endIndex);

    // Afficher les annonces de la page actuelle
    annoncesPage.forEach(annonce => {
        const div = document.createElement('div');
        div.innerHTML = `
        <img src="${annonce.image}" alt="Annonce ${annonce.id}">
        <h2>${annonce.type}</h2>
        <p>Prix : ${annonce.price}€</p>
        <p>Surface : ${annonce.surface}m²</p>
        <p>Pièce(s) : ${annonce.nbRooms}</p>
        <p>Posté le ${new Date(annonce.onMarketSince).toLocaleDateString()}</p>
        `;
        document.getElementsByClassName("items")[0].appendChild(div);
    });
}

    // Fonction pour gérer le changement de page
    function onPageChanged(annonces, pageNumber, pageSize, searchValues) {
    // Supprimer toutes les annonces précédentes de la liste
    const items = document.getElementsByClassName("items")[0]; 
    while (items.firstChild) {
        items.removeChild(items.firstChild);
    }

    // Récupérer les nouvelles annonces à afficher
    fetchAnnonces(annonces, pageNumber, pageSize, searchValues);

    // Revenir en haut de la page
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    }

    // Récupérer le tableau JSON complet depuis le backend
    fetch('tmp.json')
    .then(response => response.json())
    .then(annonces => {
    // Initialisation avec la première page de 10 annonces
    const pageSize = 10;
    const searchValues = {
        price: Infinity,
        surface: 0,
        rooms: 0
    };
    onPageChanged(annonces, 1, pageSize, searchValues);

    // Ajout des boutons de pagination
    const totalPages = Math.ceil(annonces.length / pageSize);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerHTML = i;
        button.addEventListener('click', () => onPageChanged(annonces, i, pageSize, searchValues));
        document.getElementsByClassName("pagination")[0].appendChild(button);
    }

    // Ecouteur d'événement pour le menu déroulant de tri
    document.getElementById('tri').addEventListener('change', function() {
    const tri = document.getElementById('tri').value;
    annonces.sort(function(a, b) {
        if (tri === 'croissant') {
        return a.price - b.price;
        } else if (tri === 'décroissant') {
        return b.price - a.price;
        } else if (tri === 'ancien') {
        return new Date(a.onMarketSince) - new Date(b.onMarketSince);
        } else if (tri === 'récent') {
        return new Date(b.onMarketSince) - new Date(a.onMarketSince);
        } else {
        return 0;
        }
    });
    onPageChanged(annonces, 1, pageSize, searchValues);
    });

    // Ecouteur d'événement pour le champ de prix maximum
    document.getElementById('price').addEventListener('change', function() {
        if (document.getElementById('price').value == ""){
            searchValues.price=Infinity;
        }else{
            searchValues.price = document.getElementById('price').value;
        }
    onPageChanged(annonces, 1, pageSize, searchValues);
    });

    // Ecouteur d'événement pour le champ de surface minimum
    document.getElementById('surface').addEventListener('change', function() {
        if (document.getElementById('surface').value == ""){
            searchValues.surface=0;
        }else{
            searchValues.surface = document.getElementById('surface').value;
        }
    onPageChanged(annonces, 1, pageSize, searchValues);
    });

    // Ecouteur d'événement pour le champ de nombre de pièces
    document.getElementById('rooms').addEventListener('change', function() {
    searchValues.rooms = document.getElementById('rooms').value;
    onPageChanged(annonces, 1, pageSize, searchValues);
    });


    })
    .catch(error => console.error(error));