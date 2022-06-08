// $(document).ready(function(){
//         let valueInput = $("#category").val();


//             $.ajax({

//                 type:"GET",
//                     url:`https://api-bsale-test1.herokuapp.com/api/v0/searchallproduct`,
//                     dataType: "json",
//                     success: (data)=>{
//                             $("#imgProduct").html(`
//                             <img id="imgProductq" src="${data.url_image}" alt="" class=" img-fluid"/> 
//                             `); //envia imagen a html
                    
//                     }
//             });
  
// });
// variable html 
{/* <div id="imgProduct"   class="col-md-6 imagencard  "></div>

<label class="nombreproducto" id="nombreProducto" for="">nombre Producto</label>   */}
const contenedorPadre = document.querySelector("#contenedorPadre");
const category = document.querySelector("#category");

( async() =>  {
        const solicitud = await fetch('https://api-bsale-test1.herokuapp.com/api/v0/searchallproduct', {
            method: 'GET', 
            headers:{
                    'Content-Type': 'application/json'
            }
        }

)
const prueba = await solicitud.json()
const guardarMap = prueba.map(({name,url_image,price}) => {
       return `<div class="tarjeta">
                <div class="cuerpo">
                        <div id="imgProduct" class="col-md-6 imagencard  ">
                                <img src="${url_image}" />
                        </div>

                        <label class="nombreproducto" id="nombreProducto" for="">${name}</label>
                </div>
                <div>
                        <label class="preciocolor" id="precioProducto" for="">$${price}</label>
                        <button class="botontienda"><i class="fas fa-cart-plus fa-2x "></i></button>
                </div>
        </div>`
})
contenedorPadre.innerHTML=guardarMap;
category.addEventListener('change',({target})=>{
        const guardarMap2 = prueba.map(({name,url_image,price,category}) => {

                if(category == target.value){
                        return `<div class="tarjeta">
                        <div class="cuerpo">
                                <div id="imgProduct" class="col-md-6 imagencard  ">
                                        <img src="${url_image}" />
                                </div>
        
                                <label class="nombreproducto" id="nombreProducto" for="">${name}</label>
                        </div>
                        <div>
                                <label class="preciocolor" id="precioProducto" for="">$${price}</label>
                                <button class="botontienda"><i class="fas fa-cart-plus fa-2x "></i></button>
                        </div>
                        </div>`

                }
               
         })


contenedorPadre.innerHTML=guardarMap2;

})


})()







