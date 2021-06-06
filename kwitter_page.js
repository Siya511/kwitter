// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyCx4g66qRVhG_QSG4Bwwqr9XEiFrnL_slo",
      authDomain: "kwitter-c2364.firebaseapp.com",
      databaseURL: "https://kwitter-c2364-default-rtdb.firebaseio.com",
      projectId: "kwitter-c2364",
      storageBucket: "kwitter-c2364.appspot.com",
      messagingSenderId: "137854783734",
      appId: "1:137854783734:web:f9071df7977cf690d09cd7"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
//YOUR FIREBASE LINKS

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send()
{
      msg = document.getElementById("message").value;
      console.log(msg);
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);

name = message_data['name'];
message = message_data['message'];
like = message_data['like'];

name1 = "<h4>" + name + "<img class = 'user_tick' src = 'tick.png'> <h4>";
message1 = "<h4 class = 'message_h4'>" + message + "</h4>";
like1 = "<button class = 'btn btn-warning' id = "+firebase_message_id+" value = "+like+" onclick = 'update(this.id)'>";
span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> Like: "+like+"</span> </button> <hr>";

row = name1 + message1 + like1 + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function update(message_id)
{
      console.log("cliked on like button-" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like = updated_likes
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
          window.location = "index.html";
      }      