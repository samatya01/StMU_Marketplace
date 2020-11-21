/* JS used for seller.html */
console.log("2:50");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	  console.log("IN");
	  console.log(user);
    // User is signed in.
  } else {
	  console.log(" Not In");
    // No user is signed in.
  }
});

/* get UID passed in URL, url format is https://hmartinez20.github.io/STMUmarket/seller.html#"UIDgoesHere" */
var sellerId = window.location.hash.substring(1)
console.log(sellerId);
	/* redirect to home page if no variable was passed */
	if (!(window.sellerId)){
		alert("Error Occurred, Redirecting to Home Page");
		window.location = "https://hmartinez20.github.io/STMUmarket/";
	}
/*
$( document ).ready(function() { 
*/
/* see if user is signed in */
	if (firebase.auth().currentUser){
		console.log("Signed In")
	}
	else{
		console.log("Not signed In")
	}

	
	/*load the seller's data from  firebase */
	db.collection("users").doc(window.sellerId).get().then(function(doc) {
		if (doc.exists) { 
			/* get and store min amount of seller data needed, omit sensitive information */
			var data = doc.data();
			var email = data.email;
			var name = data.first + data.last;
			var username = data.username;
			/*  var bio = data.bio;  */
			
		
			/* popover for contact seller, uses email retrieved from db */
			$('#popover2').popover(
				{
				html:true,
				content: "To contact, send email to " + email + " <br> and include STMUM and posting number as email subject",
				trigger: "focus"
				}				
			);
			
			
			/* set and display seller username to html*/
			var seller = document.createElement('h1');
			seller.innerHTML = username;
			document.getElementById('sellerName').appendChild(seller);
			
			
			/* Get and display seller's listings, will load max of 12 listings */
			db.collection('items').where('seller', '==', username).limit(12).get().then((snapshot) => {
				console.log("geting seller listings");
				var postCount = snapshot.size;
				var postNum = 0;
				var cardImage;   
				/* container for listings */
				var listings = document.createElement("div");
				/* listings.className = "card-deck"; */
				/* listings.className = "container"; */
				/* row of listigs */
				var dRow;
				/* listing card, contains image, title, and price */
				var card;
				/* add a listing card for each listing */
				snapshot.docs.forEach(doc => {
					if (postNum % 4==0){
						dRow = document.createElement("div");
						dRow.className = "row";	
					}
				
					postNum+=1;
					
					var post = doc.data();
					var postURL = "item.html#" + doc.id
					
					/* listing's title and price in card body */
					firebase.storage().ref(post.image1).getDownloadURL().then((url) => {
						console.log(url);
						var cardBody = "<div class='card-body'><h4 class='card-title'>"
						cardBody+= post.title + "</h4><p class='card-text'> Asking Price: " + post.price + "<p>";
						cardBody+= "<a href=" + postURL + " class='btn btn-primary stretched-link'>See Posting</a></div>";
						/*cardBody+= "<br> <a href=" + postURL +">Go To Posting</a></p></div>"; */
						var cardImage = "<img class='card-image-top' src=" + url + " height='400' alt=''></img>";
						card = document.createElement("div");
						card.className = "card col-3";
						card.style.cssText = 'max-width:40rem;'
						card.innerHTML = cardImage + cardBody;
						dRow.appendChild(card); 	
					}); 
					if (postNum % 4==0 || postNum==postCount){
						listings.appendChild(dRow);	
					}
				})
				document.getElementById("sellerListings").appendChild(listings);
			})
			var sellerBio = document.createElement("p");
			sellerBio.innerHTML = "Classification: " + data.class + "<br> Major: " + data.major;
			document.getElementById("sellerInfo").appendChild(sellerBio);
	    	} else {
        		// doc doesn't exist
        		alert("Invalid seller, redirecting to Home Page");
			window.location = "https://hmartinez20.github.io/STMUmarket/";
   		 }
		}).catch(function(error) {
   		 	console.log("Error getting document:", error);
		});	
/*
}); 
*/

/* Function to set seller information, remove later
	$("#setinfo").click(function(){
		db.collection("sampleseller").doc("samplelistings").set({
    			email: "srodriguezgome@mail.stmarytx.edu",
			first: "Salvador",
			last: "Rodriguez",
			username: "srodriguezgome",
			bio: "Hello. I am a Junior at St Mary's."
		})
		.then(function() {
    			console.log("Document successfully written!");
		})
		.catch(function(error) {
    			console.error("Error writing document: ", error);
		});
	});
*/	

