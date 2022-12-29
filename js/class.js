//class constructora
class Libro {
    constructor(id, autor, titulo, precio, imagen){
        //propiedades o atributos de nuestra clase
        this.id = id,
        this.autor = autor,
        this.titulo = titulo,
        this.precio = precio,
        this.imagen = imagen

    }
    //métodos
    mostrarData(){
        console.log(`El titulo es ${this.titulo}, el autor es ${this.autor} y su precio es ${this.precio} MËTODO`)
    }
}
//Instanciación de objetos -- respetamos orden y cantidad de atributos

// const libro1 = new Libro(1,"Jorge Luis Borges","Aleph", 900, "AlephBorges.jpg")

// const libro2 = new Libro(2,"Gabriel García Marquez","Cien años de Soledad", 4500, "CienSoledadMarquez.jpg")

// const libro3 = new Libro(3,"Isabel Allende", "Paula", 2800, "PaulaAllende.jpg")

// const libro4 = new Libro(4,"Jorge Luis Borges","Ficciones", 1400, "FiccionesBorges.jpg")

// const libro5 = new Libro(5,"Mario Benedetti", "Andamios", 2200, "AndamiosBenedetti.jpg")

// const libro6 = new Libro(6,"Mario Vargas Llosa", "La ciudad y los perros", 2000, "CiudadPerrosVargasLlosa.jpg")

//array de stock
let estanteria = []
const cargarEstanteria = async()=>{
    //ruta relativa del HTML al .JSON y abrir con liveServer
    const response = await fetch("libros.json")
    const data = await response.json()
    console.log(data)
    for(let libro of data){
        let libroNuevo = new Libro(libro.id, libro.autor, libro.titulo, libro.precio, libro.imagen)
        estanteria.push(libroNuevo)
    }
}
//inicializar estanteria con operador OR 
if(localStorage.getItem("estanteria")){
    estanteria = JSON.parse(localStorage.getItem("estanteria"))
}else{
    //Entra por primera -- setear el array el original
    console.log("Seteando el array por primera vez")
    cargarEstanteria()
    console.log(estanteria)
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}

