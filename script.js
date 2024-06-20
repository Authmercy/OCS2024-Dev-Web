//1. Interaction avec les données statiques :
const restaurants = [
    {
        name: "Le Petit Line",
        type: "Française",
        image: "restaurant1.jpeg",
    
    },
    {
        name: "Traiteur Shan Dong",
        type: "Chinois",
        image: "restaurant2.jpeg",
       
    },
    {
        name: "Brasserie LIPP",
        type: "Française",
         image: "restau3.jpg",
       
    }
];
//2. Manipulation du DOM :
function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    
    const img = document.createElement('img');
    img.src = restaurant.image;
    card.appendChild(img);
    
    const title = document.createElement('h3');
    title.textContent = restaurant.name;
    card.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = `Cuisine: ${restaurant.type}`;
    card.appendChild(description);

    
    
    return card;
}
function displayRestaurants(restaurants) {
    const grid = document.getElementById('restaurant-grid');
    grid.innerHTML = '';
    restaurants.forEach(restaurant => {
        const card = createRestaurantCard(restaurant);
        grid.appendChild(card);
    });
}

// Partie 4 Utilisation de l'API : geoapi

async function getRestaurants() {
    try {
        const response = await fetch(("https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=place:5194a2957b81c9024059ece5d2533f6d4840f00101f9016517010000000000c00208&limit=20&apiKey=549757e660ae405c93a95c0ba18a27ee"));
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const res = await response.json();
        console.log('Données récupérées:', res); 

        
        return res.features.map(feature => ({
            name: feature.properties.name || 'name not found',
            type: feature.properties.categories.join(', ') || 'Type de cuisine non disponible',
            image: 'restaurant1.jpeg' // les images ne sont pas disponible sur cette api
        }));
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
}

async function init() {
    const restaurants = await getRestaurants();
    console.log('Restaurants :', restaurants); 
    displayRestaurants(restaurants);
}


init();
