

var app = function(){

  var handleDropdown = function(array){

    var list = document.getElementById('list');
    var indexNum = 251;


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
      console.log(pokemonDetails);
    }

    var img = document.getElementById('image');
    var genImage = document.createElement('img');
    genImage.style.cssText = "max-width: 200px; max-height: 200px";
    
    var getPokemon = function(){
      genImage.src = "";
      var pokemon = array[this.value];
      var pokeurl = pokemon.url;
      getDetailsRequest(pokeurl, completeRequest);
      genImage.src = "https://img.pokemondb.net/artwork/" + pokemon.name +".jpg";
      image.appendChild(genImage);
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