var cns = {};
cns.is_logged_in = false;

//login flow
cns.login_flow = function(){
  //is user signed in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      cns.is_logged_in = true;
      cns.user = firebase.auth().currentUser;
      //hide sign in button
      jQuery('.login').hide();
      //show user details
      jQuery('#login_details').show();
      jQuery('#login_name').html(cns.user.displayName + ' (Log Out)');
      jQuery('#login_img').attr('src',cns.user.photoURL);
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
      //cns.auth_google_provider = new firebase.auth.GoogleAuthProvider();
      //firebase.auth().signInWithRedirect(cns.auth_google_provider);
    }
  });
};

//signin
cns.log_in = function(){
  cns.auth_google_provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(cns.auth_google_provider);
}

//signout
cns.log_out = function(){
    firebase.auth().signOut().then(function() {
      debugger;
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      debugger;
      console.log(error);
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
/**
var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  var username = snapshot.val().username;
  // ...
});
**/

//attach events
jQuery(document).ready(function(){
  var $login = jQuery('.login');
  var $logout = jQuery('#login_name');
  $login.click(function(){
    cns.log_in();
  });
  $logout.click(function(){
    cns.log_out();
  });
  //trigger login flow
  cns.login_flow();
});
