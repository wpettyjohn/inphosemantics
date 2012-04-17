//begin bootstrap jquery
// hides corpora modal on load
$("#corpora").modal({
  show: false
});

// hides model modal on load
$("#models").modal({
  show: false
});
//end bootstrap jquery

var dir;
var corporaArray;

function populateModals(jsonDirectory) {
  dir = jsonDirectory;
  corporaArray = dir['responseData']['results'][0]['corpora'];
  var corporaLength = corporaArray.length;

  // generates an array of the dictionary keys for all of the corpora
  var corporaKeys = [];
  function populateCorporaKeys() {
    for (i=0;i<corporaLength;i++) {
      corporaKeys.push(Object.keys(corporaArray[i]));
    }
  }
  populateCorporaKeys();

  // generates an array of all of the models
  // TODO: make array a set
  var modelsArray = [];
  function populateModelsArray() {
    for (var i=0;i<corporaLength;i++) {
      var models = corporaArray[i][corporaKeys[i]]['models'];
      for (var j=0;j<models.length;j++) {
        var model = models[j];
        if (modelsArray.indexOf(model) < 0) {
          modelsArray.push(model);
        }
      }
    }
  }
  populateModelsArray();

  modelsLength = modelsArray.length;

  // generates an array of the dictionary keys for all of the models
  var modelsKeys = [];
  function populateModelsKeys() {
    for (i=0;i<modelsLength;i++) {
      modelsKeys.push(Object.keys(modelsArray[i]));
    }
  }
  populateModelsKeys();

  // begin long label array population for modal population
  corporaLongLabels = [];
  // populates corporaLongLabels
  function populateCorporaLongLabels() {
    for (i=0;i<corporaLength;i++) {
      corporaLongLabels.push(corporaArray[i][corporaKeys[i]]['long label']);
    }
  }
  populateCorporaLongLabels();

  modelsLongLabels = [];
  // populates modelsLongLabels
  function populateModelsLongLabels() {
    for (i=0;i<modelsLength;i++) {
      modelsLongLabels.push(modelsArray[i][modelsKeys[i]]['long label']);
    }
  }
  populateModelsLongLabels();
  // end long label array population for modal population

  // populates Select Corpora modal
  function populateCorpusSelect() {
    for (var i=0;i<corporaLength;i++) {
      $("#corporaSelect").append("<option value='"+corporaKeys[i]+"'>"+corporaLongLabels[i]+"</option>");
    }
  }
  populateCorpusSelect();

  // populates Select Models modal
  function populateModelSelect() {
    for (var i=0;i<modelsLength;i++) {
      $("#modelsSelect").append("<option value='"+modelsKeys[i]+"'>"+modelsLongLabels[i]+"</option>");
    }
  }
  populateModelSelect()
}

$.getJSON("../../data/inphosemantics-directory.json", function(data) {
  populateModals(data);
});

// begin data submit jquery
// tracks corpora that the user has selected
$("#corporaSubmit").click(function(event) {
    event.preventDefault();
    var selectedCorpus = $("#corporaSelect").val();
    var selectedCorpora = convertHashToObject(window.location.hash)['corpora'];
    $("#corpora").modal('hide');
    addCorpus(selectedCorpus);
    $("#currentCorpora").append("<li>"+selectedCorpus+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
});

// tracks models that the user has selected
$("#modelsSubmit").click(function(event) {
    event.preventDefault();
    var selectedModel = $("#modelsSelect").val();
    var selectedModels = convertHashToObject(window.location.hash)['models'];
    $("#models").modal('hide');
    addModel(selectedModel);
    currentModels = convertHashToObject(window.location.hash)['models']; 
    $("#currentModels").append("<li>"+selectedModel+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
});

// tracks terms that the user has selected and submits them along with selected corpora and models
$("#search").submit(function(event) {
    event.preventDefault();
    var searchedPhrase = $("#searchTerm").val();
    var searchedPhrases = convertHashToObject(window.location.hash)['phrases'];
    addPhrase(searchedPhrase);
    $("#currentPhrases").append("<li>"+searchedPhrase+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
    this.reset();
});

$("#querySubmit").click(function(){
    alert(JSON.stringify(convertHashToObject(window.location.hash)));
});

// TODO: very crudely implemented
$("#queryReset").click(function(){
    window.location.hash = "";
    window.location.reload();
});
//end data submit jquery

/*
// ensures that "current selection" data persists on refresh
$(document).ready(function(){
    var hash = window.location.hash; 
    var obj = convertHashToObject(hash);
    
    var corpora = obj['corpora'];
    if (corpora){
	$.each(obj['corpora'], function(){
	    $("#currentCorpora").append("<li>"+this+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
	});
    }
    var models = obj['models'];
    if (models){
	$.each(obj['models'], function(){
	    $("#currentModels").append("<li>"+this+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
	});
    }
    var phrases = obj['phrases'];
    if (phrases){
	$.each(obj['phrases'], function(){
	    $("#currentPhrases").append("<li>"+this+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
	});
    }
});
*/