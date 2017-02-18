var typesOfPokemon = function(object){
  var types = object.types;
  var typesString = [];
  for(var i = 0; i<types.length; i++){
    if(types.length > 1){
      typesString.push(types[i].type.name);
    }else{
      return types[i].type.name;
    }
  }
  return typesString.join(", ");
}

var app = function(){

  var handleDropdown = function(array){

    var list = document.getElementById('list');
    var indexNum = 251;

    var img = document.getElementById('image');
    var genImage = document.createElement('img');
    genImage.style.cssText = "max-width: 200px; max-height: 200px";

    for(var pokemon of array){
      if(array.indexOf(pokemon) >= 251){
        var newOption = document.createElement('option');
        newOption.value = indexNum;
        newOption.name = pokemon.name;
        newOption.innerText = pokemon.name;
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
      genImage.src = "https://img.pokemondb.net/artwork/" + pokemon.name +".jpg";
      image.appendChild(genImage);
    }

    var basicInfo = document.getElementById('basic_info');
    var num_name = document.createElement('h1');
    num_name.style.cssText = "font-size: 200%; margin: 1% 0% 1% 5%";
    var type = document.createElement('h2');
    type.style.cssText = "font-size: 200%; margin: 1% 0% 1% 5%";
    var height = document.createElement('h2');
    height.style.cssText = "font-size: 170%; margin: 1% 0% 1% 5%";
    var weight = document.createElement('h2');
    weight.style.cssText = "font-size: 170%; margin: 1% 0% 1% 5%";
    var exp = document.createElement('h2');
    exp.style.cssText = "font-size: 170%; margin: 1% 0% 1% 5%";

    var populateDetails = function(details){
      num_name.innerText = "";
      num_name.innerText = "#" + details.id + " " + details.name.toUpperCase() + "";
      type.innerText = "Type: " + this.typesOfPokemon(details) + "";
      height.innerText = "Height: " + details.height;
      weight.innerText = "Weight: " + details.weight;
      exp.innerText = "Base experience: " + details.base_experience;
      basicInfo.appendChild(num_name);
      basicInfo.appendChild(type);
      basicInfo.appendChild(height);
      basicInfo.appendChild(weight);
      basicInfo.appendChild(exp);
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
}

window.onload = app