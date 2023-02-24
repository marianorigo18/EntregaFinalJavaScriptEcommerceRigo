mostrarProducts()

let carrito = []

function mostrarProducts(){
    const containerCard = document.querySelector('#container__cards');
    lamparas.forEach(element => {
        const contenedorCard = document.createElement('div');
        contenedorCard.classList = 'col-6 col-sm-6 col-md-4 col-lg-3'; 
        contenedorCard.innerHTML = `
            <div class="card__link">
                <div class="card-body" data-id="${element.id}">
                    <img class="card-img-top" src="${element.img}" alt="${element.title}">
                    <div>
                        <h5 class="card-title text-center mt-3 text-black-50 text-uppercase fs-6 fw-normal py-3">${element.title}</h5>
                        <form class="card-form">
                            <div class="inputContainer">
                                <input class="input-card" type="tel" placeholder="cantidad" value="1">
                            </div>
                            <div class="button-container">
                                <button class="btn btn-primary btn-sm card__button btnPush buttonFunc">Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `
        containerCard.appendChild(contenedorCard)
    });
    cargarListeners()
}

function cargarListeners(){
    let productsList = document.querySelector('#container__cards');
    const contenedorCarrito = document.querySelector('#table tbody');

    productsList.addEventListener('input', validar);
    productsList.addEventListener('submit', cargarData);
    
    document.addEventListener('DOMContentLoaded', () => {
        carrito = JSON.parse( localStorage.getItem('carrito')) || [];
        cargarHTML();
    })
    //Elimina un producto del curso.
    contenedorCarrito.addEventListener('click', eliminarProduct);
}

function eliminarProduct(e){
    e.preventDefault()
    if(e.target.classList.contains('borrar-product')){
        
        const productId = e.target.getAttribute('data-id');
        
        carrito = carrito.filter( product => product.id !== productId );

        cargarHTML();
    }
}

function validar(e){
    let input = e.target.value;
    let buttonPush = e.target.parentElement.parentElement.children[1].children[0]; 

    if(e.target.classList.contains('input-card')){
        if(input > '0'){
            buttonPush.disabled = false;
        }else{
            buttonPush.disabled = true;
        }
        if(input == ''){
            buttonPush.disabled = true;
        }
    }
}

function cargarData(e){
    e.preventDefault()
    const productSeleccionado = e.target.parentElement.parentElement;
    leerDatosProduct(productSeleccionado);
    e.target.reset();
}

function leerDatosProduct(product){
    const infoProduct = {
        id: product.getAttribute('data-id'),
        img: product.querySelector('img').src,
        title: product.querySelector('h5').textContent,
        quatity: Number(product.querySelector('.input-card').value),
    }
    // Revisa si un elemento ya existe en el carrito
    const existe = carrito.some( product => product.id === infoProduct.id)
    if(existe){
        //si ya existe actualizamos la cantidad
        const products = carrito.map( product => {
            if(product.id === infoProduct.id){
                product.quatity += infoProduct.quatity;
                return product;
            }else{
                return product;
            }
        })
        carrito = [...products]
    }else{
        // Agregando elementos al carrito, tomamos una copia de lo que haya en este carrito.
        carrito = [...carrito, infoProduct]
    }
    cargarHTML()
}
function cargarHTML(){
    const contenedorCarrito = document.querySelector('#table tbody');
    //Vaciar HTML
    limpiarHTML(contenedorCarrito)
    //Recorre el carrito y genera el HTML
    carrito.forEach(product => {
        const {quatity, title, img, id} = product;
        const row = document.createElement('tr');
        row.innerHTML = `
        <th scope="row">${quatity}</th>
        <td>${title}</td>
        <td><img class="img-fluid" width="50" src="${img}" alt=""></td>
        <td><a href="#" class="borrar-product" data-id="${id}">X</a></td>
        `
        contenedorCarrito.appendChild(row)
    });
    //sincroniza el carrito con el localStorage
    sincronizaLocalStorage()
}

function sincronizaLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function limpiarHTML(contenedor){
    // contenedor.innerHTML = '';
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild)
    }
}

































