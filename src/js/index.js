// tomo todo el div que contiene ese id
const contenedorPadre = document.querySelector("#contenedorPadre");
// tomo el valor de la categoria
const category = document.querySelector("#category");

( async() =>  {
        // creo un callback y en una constante guardo el objeto que me trae la api 
        const solicitud = await fetch('https://api-bsale-test1.herokuapp.com/api/v0/searchallproduct', {
            method: 'GET', 
            headers:{
                    'Content-Type': 'application/json'
            }
        }

)
// guardo en un objeto toda la dolicitud del api
const objetoSolicitud = await solicitud.json()
// en una constante guardo el mapeo del objeto
const guardarMap = objetoSolicitud.map(({name,url_image,price}) => {
        // el punto clave vendria siendo este ya que destructuro el objeto en los campos que estan solicitando
        // y realizo un return en el cual nos retornara lo que va dentro  del div padre (contenedorPadre)
       return `<div class="column">
                <div class="card">
                        <div id="imgProduct" class="col-md-6 imagencard  ">
                                <img class="imagencard" src="${url_image}" />
                        </div>

                        <label class="nombreproducto" id="nombreProducto" for="">${name}</label>
                        <div>
                                <label class="preciocolor" id="precioProducto" for="">$${price}</label>
                                <button class="botontienda"><i class="fas fa-cart-plus fa-2x "></i></button>
                        </div>
                </div>
               
        </div>`
})

// se repite el mismo paso de arriba pero con una llamado de id 
contenedorPadre.innerHTML=guardarMap;
// en este caso del category que capure arriba agrego el evento listener el cual se 
// activara cuando vea un cambio  tomara toda la info con target 
category.addEventListener('change',({target})=>{
        const guardarMap2 = objetoSolicitud.map(({name,url_image,price,category}) => {
                // luego de desestructurar al igual que arriba solo los datos a trabajar 
                // realizaremos un if en el cual verificaremos que la categoria sea igual
                // al targeta.value que es el id clickeado en el html 
                if(category == target.value){
                        return `<div class="column">
                        <div class="card">
                                <div id="imgProduct" class="col-md-6 imagencard  ">
                                        <img class="imagencard" src="${url_image}" />
                                </div>
        
                                <label class="nombreproducto" id="nombreProducto" for="">${name}</label>
                                <div>
                                        <label class="preciocolor" id="precioProducto" for="">$${price}</label>
                                        <button class="botontienda"><i class="fas fa-cart-plus fa-2x "></i></button>
                                </div>
                        </div>
                       
                </div>`

                }
               
         })

contenedorPadre.innerHTML=guardarMap2;

})


})()







