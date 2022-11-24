let chat_container = document.querySelector("#chat_container");
chat_container.scrollTop =
  chat_container.scrollHeight - chat_container.clientHeight;

$("#input_message").keyup(function (event) {
  if (event.keyCode == 13) {
    if (event.shiftKey) {
      event.stopPropagation();
    } else {
      $("#btn_send").click();
    }
  }
});

// Envoi d'un texte à tous les utilisateurs à travers le serveur
function sendText(conn, message) {
  // Création d'un objet msg qui contient les données
  // dont le serveur a besoin pour traiter le message
  var msg = {
    type: "message",
    text: message,
    id: "id",
    date: Date.now(),
  };

  // Envoi de l'objet msg à travers une chaîne formatée en JSON
  conn.send(JSON.stringify(msg));

  // Efface le texte de l'élément input
  // afin de recevoir la prochaine ligne de texte
  // que l'utilisateur va saisir
}

//   ssh key : q%V^pC(B{UL.
//   var conn = new WebSocket("ws://localhost:8080");

//   var conn = new WebSocket("ws://fentasunlightsarl.com/sever_web");
var conn = new WebSocket(
  "wss://socketsbay.com/wss/v2/100/099b14aa2233559879b43f5f56df13d5/"
);

conn.onopen = function (e) {
  console.log("Connection established!");
  conn.send("Hello World");
};

function getTime() {
  let actual = new Date();

  let h = actual.getHours() > 10 ? actual.getHours() : "0" + actual.getHours();
  let m =
    actual.getMinutes() > 10 ? actual.getMinutes() : "0" + actual.getMinutes();
  let ampm = h >= 12 ? "PM" : "AM";

  let time = h + ":" + m + " " + ampm;

  return time;
}

conn.onmessage = function (e) {
  let time = getTime();

  console.log(e.data);

  let message = `
    <div class="item_msg receive">
    <div class="item_msg_box">${e.data}</div>
    <div class="item_msg_box_time">${time}</div>
  </div>
    `;
  document.querySelector("#message").pause();
  document.querySelector("#message").play();
  $("#message_root").append(message);
  chat_container.scrollTop =
    chat_container.scrollHeight - chat_container.clientHeight;
};

$("#btn_send").on("click", function () {
    let msg =($("#input_message").val()).trim();
  if (msg != "") {
 
    conn.send(msg);
    let time = getTime();
    let message = `<div class="item_msg send">
                  <div class="item_msg_box">${msg}</div>
                  <div class="item_msg_box_time">${time}</div>
                </div>
      `;
    document.querySelector("#send").pause();
    document.querySelector("#send").play();
    $("#message_root").append(message);
    chat_container.scrollTop =
      chat_container.scrollHeight - chat_container.clientHeight;
    $("#input_message").val("");
  }
});
