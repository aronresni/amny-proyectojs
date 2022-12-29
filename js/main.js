//capturas DOM
let divProductos = document.getElementById("productos")
let btnGuardarLibro = document.getElementById("guardarLibroBtn")
let buscador = document.getElementById("buscador")
let btnVerCatalogo = document.getElementById("verCatalogo")
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let divCompra = document.getElementById("precioTotal")
let loaderTexto = document.getElementById("loaderTexto")
let loader = document.getElementById("loader")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")

let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    for(let libro of array){
        let nuevoLibro = document.createElement("div")
        nuevoLibro.classList.add("col-12", "col-md-6", "col-lg-4", "my-1")
        
        nuevoLibro.innerHTML = `<div id="${libro.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top img-fluid" style="height: 320px;"src="assets/${libro.imagen}" alt="${libro.titulo} de ${libro.autor}">
                                    <div class="card-body">
                                        <h4 class="card-title">${libro.titulo}</h4>
                                        <p>Autor: ${libro.autor}</p>
                                        <p class="${libro.precio}">Precio: ${libro.precio}</p>
                                    <button id="agregarBtn${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                    </div>
    </div>`
        divProductos.appendChild(nuevoLibro)
        let btnAgregar = document.getElementById(`agregarBtn${libro.id}`)
        
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(libro)
            
        })
    }
}

function agregarAlCarrito(libro){
    //Primer paso
    productosEnCarrito.push(libro)
    console.log(productosEnCarrito)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    //sweetAlert para agregar al carrito
    Swal.fire({

        title: "Ha agregado un producto",
        icon: "success",
        confirmButtonText: "Entendido",
        confirmButtonColor: "black",
        timer: 3000,
        text: `El libro ${libro.titulo} del autor ${libro.autor} ha sido agregado`,
        imageUrl: `assets/${libro.imagen}`,
        imageHeight: 200,
        imageAlt: `${libro.titulo} de ${libro.autor}`
    })
}

function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito)=>{
        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="320px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.titulo}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
`
    })
    array.forEach((productoCarrito, indice)=>{
        //capturo elemento del DOM sin guardarlo en variable
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
           
           //Eliminar del DOM
           let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
           cardProducto.remove()
           //Eliminar del array de comprar
           productosEnCarrito.splice(indice, 1) 
           console.log(productosEnCarrito)
           //Eliminar del storage
           localStorage.setItem('carrito', JSON.stringify(productosEnCarrito))
           //vuelvo a calcular el total
           compraTotal(array)
        })
    })
    compraTotal(array)
}

//function calcular total
function compraTotal(array){
    let acumulador = 0
    acumulador = array.reduce((acc, productoCarrito)=>acc + productoCarrito.precio,0)
    console.log(acumulador)
    acumulador == 0 ? divCompra.innerHTML = `No hay libros en el carrito`: divCompra.innerHTML = `EL total de su carrito es ${acumulador}`
}

function buscarInfo(buscado, array){
    let busqueda = array.filter(
        (libro) => libro.autor.toLowerCase().includes(buscado.toLowerCase()) || libro.titulo.toLowerCase().includes(buscado.toLowerCase())
    )

    busqueda.length == 0 ? 
    (coincidencia.innerHTML = `<h3 class="text-success m-2 text $black" >Disculpe, no tenemos el libro que esta buscando en stock</h3>`, mostrarCatalogo(array)) 
    : (coincidencia.innerHTML = "", mostrarCatalogo(busqueda))
}


function ordenarMayorMenor(array){
   let mayorMenor = [].concat(array)
   mayorMenor.sort((a,b) => (b.precio - a.precio))
   console.log(array)
   console.log(mayorMenor)
   mostrarCatalogo(mayorMenor)
}
function ordenarMenorMayor(array){
let menorMayor = [].concat(array)
   menorMayor.sort((a,b) => (a.precio - b.precio))
   console.log(array)
   console.log(menorMayor)
   mostrarCatalogo(menorMayor)
}
function ordenarAlfabeticamente(array){
    let alfabeticamente = array.slice()
    alfabeticamente.sort((a,b) => {
    if(a.titulo < b.titulo)return -1
    if(a.titulo > b.titulo)return 1
    return 0
   })
   console.log(array)
   console.log(alfabeticamente)
   mostrarCatalogo(alfabeticamente)
}




buscador.addEventListener("input", ()=>{buscarInfo(buscador.value, estanteria)})
botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)

    if(selectOrden.value == 1){
        ordenarMayorMenor(estanteria)
    }else if (selectOrden.value == 2){
        ordenarMenorMayor(estanteria)
    }else if (selectOrden.value == 3){
        ordenarAlfabeticamente(estanteria)
    }else{
        mostrarCatalogo(estanteria)
    }
}) 
botonFinalizarCompra.addEventListener("click",()=>{
    finalizarCompra()
})
function finalizarCompra(){
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
            title: 'Compra realizada',
            icon: 'success',
            confirmButtonColor: 'green',
            text: `Muchas gracias por su compra nos estaremos contactando para concretar la compra `,
            })
            productosEnCarrito =[]
            localStorage.removeItem("carrito")
        }else{
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada! Sus productos siguen en el carro`,
                confirmButtonColor: 'green',
                timer:3500
            })
        }
    })
}
setTimeout(()=>{
    loaderTexto.innerHTML = ""
    loaderTexto.remove()
    mostrarCatalogo(estanteria)

}, 3000)
