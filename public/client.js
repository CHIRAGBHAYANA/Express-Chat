const socket = io() 
let UserName;
let textArea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')

do {
    UserName =prompt('Please Enter your name: ');
} while(!UserName)

textarea.addEventListener('keyup',(e) => {
   if(e.key === 'Enter'){
       sendMessage(e.target.value);     
   }
});

function sendMessage(message) {
    let msg = {
        user: UserName,
        message : message.trim()
    } 
    //Append the message
    appendMessage(msg,'outgoing')
     textArea.value= ''
    // Send to server

    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className,'message')

    let markup = `
         <h4>${msg.user}</h4>
         <p>${msg.message}</p>
      `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
 
}


//Recieve Message

socket.on('message',(msg) => {
    appendMessage(msg,'incoming')
})


