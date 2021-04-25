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
    });

    message.val("");
  }
};

$("#message").keyup(sendMessage);

// listen messages

firebase
  .database()
  .ref("messages")
  .on("child_added", (snapshot) => {
    let msg = "";
    msg += "<li>";
    msg += `${snapshot.val().sender} : ${snapshot.val().message}`;
    msg += "</li>";

    document.getElementById("messages").innerHTML += msg;
  });
