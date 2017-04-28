var cns = {};
cns.is_logged_in = false;

//login flow
cns.login_flow = function(){
  //is user signed in
  firebase.auth().onAuthStateChanged(function(user) {
      debugger;
    if (user) {
      // User is signed in.
      cns.is_logged_in = true;
      cns.user = user;
      //access db
      cns.database = firebase.database();  
      /**  
      firebase.auth().getRedirectResult().then(function(result) {
        debugger;
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        cns.user = result.user;
        
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      **/
    } else {
      // No user is signed in.
      //redirect to login
      cns.auth_google_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(cns.auth_google_provider);
    }
  });
};

//cns.login_flow();

//signout
cns.log_out = function(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
};

//write to db
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

//read from db once 
var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  var username = snapshot.val().username;
  // ...
});

