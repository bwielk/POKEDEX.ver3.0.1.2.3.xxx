//////////////////////////////////////////////////HELPER METHODS/////////////////////////////////////////////////////

var createLatLang = function(object){
  var statistics = object.stats;
  var statsArr = [];
  for(var i = 0; i<statistics.length; i++){
    statsArr.push(object.stats[i].base_stat);
  }
  var lat = statsArr.slice(0, 3).join("");
  var lang = statsArr.slice(3,6).join("");
  var coords = [lat, lang];
  var newcoords = [] 
  for(var coord of coords){
    if(coord.length > 6){
      coords.slice(0,6);
      var newcoord = parseInt(coord)
      newcoord = newcoord/10000;
      newcoords.push(newcoord);
    }else{
      var newcoord = parseInt(coord);
      newcoord = newcoord/10000;
      newcoords.push(newcoord);
    }
  }
  return new google.maps.LatLng(newcoords[0], newcoords[1]);
}


var typesOfPokemon = function(object){
  var types = object.types;
  var typesArr = [];
  for(var i = 0; i<types.length; i++){
    if(types.length > 1){
      typesArr.push(types[i].type.name);
    }else{
      return types[i].type.name;
    }
  }
  return typesArr.join(", ");
}

var abilitiesOfPokemon = function(object){
  var abilities = object.abilities;
  var abilitiesArr = [];
  for(var i = 0; i<abilities.length; i++){
    if(abilities.length > 1){
      abilitiesArr.push(abilities[i].ability.name);
    }else{
      return abilities[i].ability.name;
    }
  }
  return abilitiesArr.join(", ");
}

var statistics = function(object){
  var ul = document.createElement('ul');
  ul.innerText = "Statistics";
  var statistics = object.stats;
  var statsArr = [];
  for(var i =0; i<statistics.length; i++){
    var li = document.createElement('li');
    li.style.cssText = "list-style: none";
    var statname = object.stats[i].stat.name;
    var statrate = object.stats[i].base_stat;
    li.innerText = "" + statname + ": " + statrate + ""
    ul.appendChild(li);
  }
  return ul;
}

var moves = function(object){
  var p = document.createElement('p');
  var movesArr = [];
  for(var i = 0; i<11; i++){
    var attack = object.moves[i].move.name;
    movesArr.push(attack);
  }
  return p.innerText = movesArr.join(", ");
}

var favbrand = function(object){
  var types = object.types;
  var brandsArr = [];
  for(var i = 0; i< types.length; i++){
    var type = types[i].type.name;
    switch(type){
      case "normal":
      brandsArr.push("Michael Kors");
      break
      case "fire":
      brandsArr.push("Jean Paul Gaultier");
      break
      case "flying":
      brandsArr.push("Alberta Ferretti");
      break
      case "fighting":
      brandsArr.push("Alexander Wang");
      break
      case "water":
      brandsArr.push("Valentino");
      break
      case "grass":
      brandsArr.push("Stella McCartney");
      break
      case "poison":
      brandsArr.push("Balenciaga");
      break
      case "ground":
      brandsArr.push("Balmain");
      break
      case "psychic":
      brandsArr.push("Alexander McQueen");
      break
      case "rock":
      brandsArr.push("Givenchy");
      break
      case "ice":
      brandsArr.push("Fendi");
      break
      case "bug":
      brandsArr.push("Gucci");
      break
      case "dragon":
      brandsArr.push("Saint Laurent");
      break
      case "ghost":
      brandsArr.push("Chanel");
      break
      case "dark":
      brandsArr.push("Rick Owens");
      break
      case "steel":
      brandsArr.push("Dior");
      break
      case "fairy":
      brandsArr.push("Prada");
      break
      case "electric":
      brandsArr.push("Versace");
      break
    }
  }
  return brandsArr.join(', ');
}
/////////////////////////////////////////////////APP and its structure//////////////////////////////////////////////////
var app = function(){

  var img = document.getElementById('image');
  var genImage = document.createElement('img');
  genImage.style.cssText = "max-width: 200px; max-height: 200px";

  var basicInfo = document.getElementById('basic_info');
  var furtherInfo = document.getElementById('bottom');
  var ablscont = document.getElementById('ablscont');
  var ablsfield = document.getElementById('abls');
  var statfield = document.getElementById('statistics');
  var movesfield = document.getElementById('moves');
  var num_name = document.createElement('h1');
  num_name.style.cssText = "font-size: 160%; margin: 1% 0% 1% 5%";
  var type = document.createElement('h2');
  type.style.cssText = "font-size: 140%; margin: 1% 0% 1% 5%";
  var height = document.createElement('h2');
  height.style.cssText = "font-size: 120%; margin: 1% 0% 1% 5%";
  var weight = document.createElement('h2');
  weight.style.cssText = "font-size: 120%; margin: 1% 0% 1% 5%";
  var exp = document.createElement('h2');
  exp.style.cssText = "font-size: 120%; margin: 1% 0% 1% 5%;";
  var brand = document.createElement('p');
  brand.style.cssText = "font-size: 120%; margin: 1% 0% 0% 5%";
  var abls = document.createElement('p');
  abls.style.cssText = "font-size: 160%; margin: auto 0%; margin-left: 5%";
  var movespar = document.createElement('p');
  movespar.style.cssText = "font-size: 160%; margin: 1% 0% 1% 5%";

  var populateDetails = function(details){
    genImage.src = "https://img.pokemondb.net/artwork/" + details.name +".jpg";
    image.appendChild(genImage);
    num_name.innerText = "";
    num_name.innerText = "#" + details.id + " " + details.name.toUpperCase() + "";
    type.innerText = "Type: " + this.typesOfPokemon(details) + "";
    height.innerText = "Height: " + details.height;
    weight.innerText = "Weight: " + details.weight;
    exp.innerText = "Base experience: " + details.base_experience;
    brand.innerText = "Favourite brand: " + this.favbrand(details);
    basicInfo.appendChild(num_name);
    basicInfo.appendChild(type);
    basicInfo.appendChild(height);
    basicInfo.appendChild(weight);
    basicInfo.appendChild(exp);
    basicInfo.appendChild(brand);
    var stats = this.createLatLang(details);
    console.log(stats);

    abls.innerText = "Abilities : " + this.abilitiesOfPokemon(details);
    ablsfield.appendChild(abls);
    movespar.innerText = "Attacks:\n " + this.moves(details);
    statfield.innerText = "";
    statfield.appendChild(this.statistics(details));
    movesfield.appendChild(movespar);
  }

////////////////////////////////////////////////RANDOM BUTTON///////////////////////////////////////////////////////
  var button = document.getElementById('randomPokemon');

  var handleButtonRandom = function(){

    var url = "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random()*(385 - 251 +1)+252)+ "";

    var getDetailsRequest = function(url, callback){
      var request = new XMLHttpRequest();
      request.open("GET", url);
      request.onload = callback;
      request.send();
    }

    var completeRequest = function(){
      if(this.status != 200) return;
      var jsonString = this.responseText;
      var pokemonDetails = JSON.parse(jsonString);
      populateDetails(pokemonDetails);
    }
    getDetailsRequest(url, completeRequest);
  }

  button.onclick = handleButtonRandom;

///////////////////////////////////////////////////////DROPDOWN////////////////////////////////////////////////////////

  var handleDropdown = function(array){

    var list = document.getElementById('list');
    var indexNum = 251;

    for(var pokemon of array){
      if(array.indexOf(pokemon) >= 251){
        var newOption = document.createElement('option');
        newOption.value = indexNum;
        newOption.name = pokemon.name;
        newOption.innerText =  "#" + (indexNum + 1) + " " + pokemon.name.toUpperCase() + "";
        list.appendChild(newOption);
        indexNum ++;
      }
    }

    var view = document.getElementById('display');

    var getDetailsRequest = function(url, callback){
      var request = new XMLHttpRequest();
      request.open("GET", url);
      request.onload = callback;
      request.send();
    }

    var completeRequest = function(){
      if(this.status != 200) return;
      var jsonString = this.responseText;
      var pokemonDetails = JSON.parse(jsonString);
      populateDetails(pokemonDetails);
      console.log(pokemonDetails);
    }

    var getPokemon = function(){
      genImage.src = "";
      var pokemon = array[this.value];
      var pokeurl = pokemon.url;
      getDetailsRequest(pokeurl, completeRequest);
    }

    list.onchange = getPokemon;

  }

  var makeRequest = function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  }

  var completeRequest = function(){
    if(this.status != 200) return;
    var jsonString = this.responseText;
    var pokemons = JSON.parse(jsonString);
    var array = pokemons.results;
    handleDropdown(array);
  }

  var url = "http://pokeapi.co/api/v2/pokemon/?limit=386";
  makeRequest(url, completeRequest);

  /////////////////////////////////////////////////////////MAP//////////////////////////////////////////////////////

  var initializeMap = function(){
    var container = document.getElementById('main-map');
    var centre = {lat: 0, lng: 0};
    var zoom = 18;
    var map = new MapWrapper(container, centre, zoom);
    map.addMarker(centre);
  }
  initializeMap();

  // var locatePokemon = function(){

  // }

  // var geoButton = document.getElementById('geolocation');
  // geoButton.onclick = locatePokemon;

}

window.onload = app