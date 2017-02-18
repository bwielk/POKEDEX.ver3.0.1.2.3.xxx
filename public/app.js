

var app = function(){

  var populateDropdown = function(array){

    var list = document.getElementById('list');
    var indexNum = 251;

    for(pokemon in array){
      var newOption = document.createElement('option');
      newOption.value = indexNum;
      newOption.name = array[indexNum].name;
      newOption.innerText = array[indexNum].name;
      list.appendChild(newOption);
      indexNum ++;
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
    console.log(array[255].name);
    populateDropdown(array);
  }

  var url = "http://pokeapi.co/api/v2/pokemon/?limit=386";
  makeRequest(url, completeRequest);
}

window.onload = app