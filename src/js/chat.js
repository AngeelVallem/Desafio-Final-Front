let input;

function validatePrompt() {
  while (true) {
    input = prompt("Enter a name ");

    if (input == null) {
    
        window.location.reload();
      return true;
    } else {
      if (input.length <= 0) {
        alert("Invalid input.");
      } else {
        return parseInt(input);
      }
    }
  }
}



const sendMessage = (event) => {
  let message = $("#message");

  if (event.keyCode === 13) {
    firebase.database().ref("messages").push().set({
      sender: input,
      message: message.val(),
      time : moment().format('h:mm:ss a')
    });

    message.val("");
  }
};

$("#message").keyup(sendMessage);

// listen messages

firebase
  .database()
  .ref("messages")
  .on("child_added", snapshot => {

    let msg = `<li> ${snapshot.val().sender} : ${snapshot.val().message}  -<small class="pl-2">${snapshot.val().time}</small> </li> `;


    $('#messages').append(msg)
  });
