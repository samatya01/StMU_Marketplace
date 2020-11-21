firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		document.getElementById("login").setAttribute("hidden","");
        	document.getElementById("signUp").setAttribute("hidden","");
		document.getElementById("myAccount").removeAttribute("hidden");
        	document.getElementById("signOut").removeAttribute("hidden");
		document.getElementById('myAccount').innerHTML = user.email;
			//alert("Welcome: "+user.email);
  	} else {
        	document.getElementById("myAccount").setAttribute("hidden","");
        	document.getElementById("signOut").setAttribute("hidden","");
		document.getElementById("login").removeAttribute("hidden");
        	document.getElementById("signUp").removeAttribute("hidden");
    		console.log(' not signed in');
  	}
});

