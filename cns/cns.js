var cns = {};

//auth
cns.auth_google_provider = new firebase.auth.GoogleAuthProvider();

//is logged in?
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    firebase.auth().getRedirectResult().then(function(result) {
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
  } else {
    // No user is signed in.
    //redirect to login
    firebase.auth().signInWithRedirect(cns.auth_google_provider);
  }
});

//signout
/**
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
**/

/**
  // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyB9B968uA15pTg_VpJS1VoApHjJJhWlRtc",
    authDomain: "cands-fcd62.firebaseapp.com",
    databaseURL: "https://cands-fcd62.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();
**/
