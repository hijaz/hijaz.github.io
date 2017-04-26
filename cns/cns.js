var cns = {};

//auth
cns.auth_google_provider = new firebase.auth.GoogleAuthProvider();

//redirect to login
firebase.auth().signInWithRedirect(cns.auth_google_provider);

firebase.auth().getRedirectResult().then(function(result) {
  debugger;
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
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

/**
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
**/
