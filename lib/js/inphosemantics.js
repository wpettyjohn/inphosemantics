// hides 'Add Corpus' modal on load
$("#corpora").modal({
  show: false
});

// hides 'Add Model' modal on load
$("#models").modal({
  show: false
});

var dir = {};

var corporaArray = [];
var corporaLength = 0;
var corporaKeys = [];
var corporaLongLabels = [];

var modelsArray = [];
var modelsLength = 0;
var modelsKeys = [];
var modelsLongLabels = [];

function main() {
    $.getJSON("../../data/inphosemantics-directory.json", 
	      function(response) {
		  dir = response;

		  corporaArray = dir['responseData']['results'][0]['corpora'];
		  corporaLength = corporaArray.length; 

		  // populates 'corporaKeys' with the dictionary keys of all of the corpora
		  for (var i=0; i<corporaLength; i++) {
		      var keys = Object.keys(corporaArray[i]);
		      corporaKeys = corporaKeys.concat(keys);
		  }

		  // populates 'corporaLongLabels' with the 'long labels' of all of the corpora
		  for (var i=0; i<corporaLength; i++) {
		      corporaLongLabels.push(corporaArray[i][corporaKeys[i]]['long label']);
		  }
		  
		  // populates 'modelsArray' with all of the models
		  // TODO: make array a set
		  for (var i=0; i<corporaLength; i++) {
		      var models = corporaArray[i][corporaKeys[i]]['models'];
		      for (var j=0; j<models.length; j++) {
			  var model = models[j];
			  modelsArray.push(model);
		      }
		  }
		  
		  modelsLength = modelsArray.length;
	      
		  // populates 'modelsKeys' with the dictionary keys of all of the models
		  for (var i=0; i<modelsLength; i++) {
		      var keys = Object.keys(modelsArray[i]);
		      modelsKeys = modelsKeys.concat(keys);
		  }
	      	  
		  // populates 'modelsLongLabels' with the 'long labels' of all of the models
		  for (var i=0; i<modelsLength; i++) {
		      modelsLongLabels.push(modelsArray[i][modelsKeys[i]]['long label']);
		  }
		  
		  // populates the 'Add Corpus' modal
		  for (var i=0; i<corporaLength; i++) {
			  $("#corporaSelect").append("<option value='"+corporaKeys[i]+"'>"+corporaLongLabels[i]+"</option>");
		  }
		  
		  // populates the 'Add Model' modal
		  for (var i=0; i<modelsLength; i++) {
		      $("#modelsSelect").append("<option value='"+modelsKeys[i]+"'>"+modelsLongLabels[i]+"</option>");
		  }

		  // returns a corpus' 'long label' given its dictionary key
		  function getCorpusLongLabel(corpusKey) {
		      for (var i=0; i<corporaLength; i++) {
			  var keys = Object.keys(corporaArray[i]);
			  if (keys.indexOf(corpusKey) != -1) {
			      return corporaArray[i][corpusKey]['long label'];
			  }
		      }	   
		      alert('Corpus key not found.')
		  }

		  // returns a model's 'long label' given its dictionary key
		  function getModelLongLabel(modelKey) {
		      for (var i=0; i<modelsLength; i++) {
			  var keys = Object.keys(modelsArray[i]);
			  if (keys.indexOf(modelKey) != -1) {
			      return modelsArray[i][modelKey]['long label'];
			  }
		      }	   
		      alert('Model key not found.')
		  }

		  // adds the selected corpus to the URL
		  $("#corporaSubmit").click(function(event) {
		      event.preventDefault();
		      var selectedCorpus = $("#corporaSelect").val();
		      var selectedCorpora = convertHashToObject(window.location.hash)['corpora'];
		      $("#corpora").modal('hide');

		      // if hashObject does not already contain the selected corpus
		      if (selectedCorpora.indexOf(selectedCorpus) == -1) {
			  addCorpus(selectedCorpus);
			  $("#currentCorpora").append("<li>"+getCorpusLongLabel(selectedCorpus)+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
		      }
		  });

		  // adds the selected model to the URL
		  $("#modelsSubmit").click(function(event) {
		      event.preventDefault();
		      var selectedModel = $("#modelsSelect").val();
		      var selectedModels = convertHashToObject(window.location.hash)['models'];
		      $("#models").modal('hide');

		      // if hashObject does not already contain the selected model
		      if (selectedModels.indexOf(selectedModel) == -1) {
			  addModel(selectedModel);
			  currentModels = convertHashToObject(window.location.hash)['models']; 
			  $("#currentModels").append("<li>"+getModelLongLabel(selectedModel)+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
		      }
		  });

		  // adds the searched phrase to the URL
		  $("#search").submit(function(event) {
		      event.preventDefault();
		      var searchedPhrase = $("#searchTerm").val();
		      var searchedPhrases = convertHashToObject(window.location.hash)['phrases'];
		      
		      // if hashObject does not already contain the search phrase.
		      if (searchedPhrases.indexOf(searchedPhrase) == -1) {
			  addPhrase(searchedPhrase);
			  $("#currentPhrases").append("<li>"+searchedPhrase+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");

		      }
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
		  
		  // ensures that "current selection" data persists on refresh
		  // TODO: implement 'long labels'
		  var hash = window.location.hash; 
		  var obj = convertHashToObject(hash);
		  
		  var corpora = obj['corpora'];
		  if (corpora){
		      for (var i=0; i<corpora.length; i++) {
			  $("#currentCorpora").append("<li>"+getCorpusLongLabel(corpora[i])+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
		      }
		  }
		  var models = obj['models'];
		  if (models){
		      for (var i=0; i<models.length; i++) {
			  $("#currentModels").append("<li>"+getModelLongLabel(models[i])+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
		      }
		  }
		  var phrases = obj['phrases'];
		  if (phrases){
		      for (var i=0; i<phrases.length; i++) {
			  $("#currentPhrases").append("<li>"+phrases[i]+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
		      }
		  }
	      });
}

$(document).ready(function(){
    main();
});


