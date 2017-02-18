

var app = function(){

  var populateDropdown = function(array){

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
    console.log(array[0].name);
    populateDropdown(array);

  }

  var url = "http://pokeapi.co/api/v2/pokemon/?limit=386";
  makeRequest(url, completeRequest);
}
console.log(document.getElementById('list'));

window.onload = app