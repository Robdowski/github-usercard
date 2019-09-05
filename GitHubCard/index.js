/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

////// CARD CONSTRUCTOR //////

function gitCard(request) {
  // TOP LEVEL
  const card = document.createElement("div");
  card.classList.add("card");
  // SECOND LEVEL
  const image = document.createElement("img");
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");
  // THIRD LEVEL
  const h3 = document.createElement("h3");
  h3.classList.add("name");
  const username = document.createElement("p");
  username.classList.add("username");
  const location = document.createElement("p");
  const profile = document.createElement("p"); /// APPEND AN ANCHOR TO THIS
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");
  // FOURTH LEVEL
  const anchor = document.createElement("a"); /// APPEND TO PROFILE

  ///// STRUCTURE
  // level 1
  card.appendChild(image);
  card.appendChild(cardInfo);
  // level 2
  cardInfo.appendChild(h3);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  //level 3
  profile.appendChild(anchor);

  //// ADDING DATA
  image.src = request.avatar_url;
  h3.textContent = request.name;
  username.textContent = request.login;
  location.textContent = `Location: ${request.location}`;
  followers.textContent = `Followers: ${request.followers}`;
  following.textContent = `Following: ${request.following}`;
  bio.textContent = `Bio: ${request.bio}`;

  anchor.setAttribute("href", request.html_url);
  anchor.textContent = request.html_url;

  return card;
}

/////// MY CARD //////

const container = document.querySelector(".cards");
axios.get("https://api.github.com/users/Robdowski").then(res => {
  //console.log(res)
  const newCard = container.appendChild(gitCard(res.data));
});

/////// FOLLOWERS CARDS ///////

const followersArray = []


/// ADD FOLLOWERS TO ARRAY AND THEN ADD THEM AS CARDS
axios
.get("https://api.github.com/users/Robdowski/followers")
.then(res => {
  console.log(res);
  res.data.forEach(item => followersArray.push(item.url));
})
.then(res =>{
  followersArray.forEach(item => {
    axios.get(item).then(res => {
      container.appendChild(gitCard(res.data))
    })
  })
})