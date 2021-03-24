const URL_BASE = 'https://platzi-avo.vercel.app/';
const APP_NODE = document.querySelector('#app');

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN',{
        style: "currency",
        currency: "USD",
    }).format(price);

    return newPrice;
}

const fetchData = async (url_api) => {
    try {
        //Conectamos al servidor         //La respuesta la convertimos a JSON
        const DATA = await fetch(`${url_api}api/avo`).then((RES_JSON) => RES_JSON.json());
        //creamos array para nuestra data
        const ALL_ITEMS = [];
        //Recorremos los datos y por cada elementos generamos elementos, los agremos a un container padre.
        DATA.data.forEach(element => {
            const image = document.createElement('img');
            image.className = 'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6'
            image.src = `${url_api}${element.image}`;

            const title = document.createElement('h2');
            title.className = 'text-lg text-green-900 font-bold'
            title.textContent = element.name;

            const price = document.createElement('div');
            price.className = 'text-gray-600'
            price.textContent = formatPrice(element.price);

            const priceAndTitle = document.createElement("div");
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.append(title, price);

            const card = document.createElement("div");
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-green-200";
            card.append(image, priceAndTitle);

            //Empujamos el container y sus elementos al array
            ALL_ITEMS.push(card);
        });
        //Agregamos todos los elementos del array al div con el ID "APP".
        APP_NODE.append(...ALL_ITEMS);
        APP_NODE.className = 'mt-10 grid grid-cols-3 gap-2'
    } catch (error) {
        console.error(error);
    }
}
fetchData(URL_BASE);