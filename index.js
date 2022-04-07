const client  = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')

let mensaje = document.getElementById('mensaje');
let topic = document.getElementById('topic');
let btnSend = document.getElementById('send');
let divMensajes = document.getElementById('mensajes');

btnSend.addEventListener('click', ()=>{
    let mnsj = mensaje.value;
    let tema = topic.value;
    if( mnsj != '' && tema != ''){
        client.publish(`carg/${tema}`, mnsj);
        mensaje.value = "";
        topic.value = "";
    }else{
        alert('Llena todos los campos');
    }
    
});

function mensajeEvent (topic, message){
    console.log(topic + " - "+message.toString()); 
    let showMnsj =`
    <div class= "txtMensaje">
    <p>_______________________________</p>
    <p> <b>Topic: </b> ${topic} dice:</p>
    <p>${message}</p>
    </div>
    `;
    divMensajes.innerHTML+=showMnsj;
}

function reconectar(){
    console.log('Reconnecting...')
}


client.on('connect', () => {
    console.log('Conectado');
    client.subscribe('carg/#', function (err) {
       if (!err) {
          client.publish('carg/hola', 'Hello mqtt');
        }else{
            console.log(err);
        }
    });
})
client.on('message', mensajeEvent)
client.on('reconnect', reconectar)

