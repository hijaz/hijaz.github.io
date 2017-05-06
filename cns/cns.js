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
      //init data
      cns.db.init();
    } else {
      // No user is signed in.
      jQuery('#login_details').hide();
      jQuery('.login').show();
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
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
};

//data
cns.db.data={};

//write to db
cns.db.write = function () {
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('users/' + userId).set(cns.db.data);
}

//read from db once 
cns.db.read = function(){
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    //var username = snapshot.val().username;
    cns.db.data= snapshot.val();
  });
}

//init db
cns.db.init = function(){
  var userId = firebase.auth().currentUser.uid;
  cns.db.read();
  if(cns.db.data.timestamp){
    //existing user
  }else{
    //first time user
    cns.db.data.timestamp = new Date().getTime();
    cns.db.data.habits = {
                      'Sample Habit - Workout':{
                        'good':true,
                        'carrots': 2,
                        'sticks': 2
                      }
                     };
    cns.db.data.carrots = {
                  'Sample Carrot - Pizza':{
                    'unit':'slice',
                    'price': 4
                  }
                 };
    cns.db.data.sticks = {
                  'Sample Stick - Squats':{
                    'unit': 'rep',
                    'price': 1
                  }
                 };
    cns.db.write();
  }
}

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
