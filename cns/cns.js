var cns = {};
cns.is_logged_in = false;
cns.config = {
    apiKey: "AIzaSyB9B968uA15pTg_VpJS1VoApHjJJhWlRtc",
    authDomain: "cands-fcd62.firebaseapp.com",
    databaseURL: "https://cands-fcd62.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
};

//login flow
cns.login_flow = function(){
  //is user signed in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      cns.is_logged_in = true;
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        cns.user = result.user;
        
        //init app & access db
        firebase.initializeApp(cns.config);
        cns.database = firebase.database();

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
      cns.auth_google_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(cns.auth_google_provider);
    }
  });
};

cns.login_flow();

//signout
/**
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
**/
