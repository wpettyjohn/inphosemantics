function main() {
    $.getJSON("../../data/inphosemantics-directory.json", 
	      function(response) {

		  // hides 'Make Selections' modal on load
		  $("#selectionModal").modal({
		      show: false
		  });

		  var dir = response;

		  // 'global' corpora variables
		  var corporaArray = dir['responseData']['results'][0]['corpora'];
		  var corporaLength = corporaArray.length;


		  // 'global' models variables
		  var modelsArray = [];
		  var modelsLength = 0;

		  // returns a corpus' dictionary key
		  function getCorpusKey(corpus) {
		      return Object.keys(corpus)[0];
		  }

		  // returns a model's dictionary key
		  function getModelKey(model) {
		      return Object.keys(model)[0];
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
		  
		  // populates 'modelsArray' with all of the models
		  // TODO: make array a set
		  for (var i=0; i<corporaLength; i++) {
		      var corpus = corporaArray[i];
		      var corpusKey = getCorpusKey(corpus);
		      var models = corpus[corpusKey]['models'];
		      for (var j=0; j<models.length; j++) {
			  var model = models[j];
			  modelsArray.push(model);
		      }
		  }
		  
		  // now that 'modelsArray' has been populated, modelsLength can be updated
		  modelsLength = modelsArray.length;

		  // populates the 'Add Corpus' modal
		  for (var i=0; i<corporaLength; i++) {
		      var corpus = corporaArray[i];
		      var corpusKey = getCorpusKey(corpus);
		      $("#corporaSelect").append("<option value='"+corpusKey+"'>"+getCorpusLongLabel(corpusKey)+"</option>");
		  }
		  
		  // populates the 'Add Model' modal
		  for (var i=0; i<modelsLength; i++) {
		      var model = modelsArray[i];
		      var modelKey = getModelKey(model);
		      $("#modelsSelect").append("<option value='"+modelKey+"'>"+getModelLongLabel(modelKey)+"</option>");
		  }

		  // adds the selected corpus to the URL
		  $("#corporaSubmit").click(function(event) {
		      event.preventDefault();
		      var selectedCorpus = $("#corporaSelect").val();
		      var selectedCorpora = convertHashToObject(window.location.hash)['corpora'];

		      // if hashObject does not already contain the selected corpus
		      if (selectedCorpora.indexOf(selectedCorpus) == -1) {
			  addCorpus(selectedCorpus);

			  var anchor = "<a id=\'" + selectedCorpus + "\'class='close' style='float: none; vertical-align: text-bottom;'>&times;</a>";
			  var listItem = "<li id=\'" + selectedCorpus + "li\'>" + getCorpusLongLabel(selectedCorpus) + anchor + "</li>";
			  
			  $("#currentCorpora").append(listItem);

			  document.getElementById(selectedCorpus).onclick = function(){
			      return function(){
				  removeCorpus(selectedCorpus);
				  var li = document.getElementById(selectedCorpus + "li");
				  $(li).remove();
			      };
			  }();

		      }
		  });

		  // adds the selected model to the URL
		  $("#modelsSubmit").click(function(event) {
		      event.preventDefault();
		      var selectedModel = $("#modelsSelect").val();
		      var hashModels = convertHashToObject(window.location.hash)['models'];

		      // if hashObject does not already contain the selected model
		      if (hashModels.indexOf(selectedModel) == -1) {
			  addModel(selectedModel);
			  
			  var anchor = "<a id=\'" + selectedModel + "\' class='close' style='float: none; vertical-align: text-bottom;'>&times;</a>";
			  var listItem = "<li id=\'" + selectedModel + "li\'>" + getModelLongLabel(selectedModel) + anchor + "</li>";

			  $("#currentModels").append(listItem);
			  
			  document.getElementById(selectedModel).onclick = function(){
			      return function(){
				  removeModel(selectedModel);
				  var li = document.getElementById(selectedModel + "li");
				  $(li).remove();
			      };
			  }();
			  
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

			  var anchor = "<a id=\'" + searchedPhrase +"\'class='close' style='float: none; vertical-align: text-bottom;'>&times;</a>";
			  var listItem = "<li id=\'" + searchedPhrase + "li\'>" + searchedPhrase + anchor +"</li>";

			  $("#currentPhrases").append(listItem);

			  document.getElementById(searchedPhrase).onclick = function(){
			      return function(){
				  removePhrase(searchedPhrase);
				  var li = document.getElementById(searchedPhrase + "li");
				  $(li).remove();
			      };
			  }();
			  
		      }
		      this.reset();
		  });

		  $("#querySubmit").click(function(){
		      renderTable(convertHashToObject(window.location.hash)['corpora'], convertHashToObject(window.location.hash)['models'], convertHashToObject(window.location.hash)['phrases']);
		      printTableData(10);
		      $("#selectionModal").modal('hide');
		      // alert(JSON.stringify(convertHashToObject(window.location.hash)));
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
		  
		  var hashCorpora = obj['corpora'];
		  if (hashCorpora){
		      for (var i=0; i<hashCorpora.length; i++) {
			  $("#currentCorpora").append("<li>"+getCorpusLongLabel(hashCorpora[i])+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
		      }
		  }

		  var hashModels = obj['models'];
		  if (hashModels){
		      for (var i=0; i<hashModels.length; i++) {
			  $("#currentModels").append("<li>"+getModelLongLabel(hashModels[i])+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
		      }
		  }

		  var hashPhrases = obj['phrases'];
		  if (hashPhrases){
		      for (var i=0; i<hashPhrases.length; i++) {
			  $("#currentPhrases").append("<li>"+hashPhrases[i]+" <a class='close' style='float: none; vertical-align: text-bottom;'>&times;</a></li>");
		      }
		  }

		  function renderTable(corpora, models, phrases) {
		      $("#root").css("display", "table");

		      for (var i=0; i<corpora.length; i++) {
			  var corpus = corpora[i];
			  $("#root > tbody > tr").append(
			      "<td><table class='table' id='"+corpus+"'><thead><tr><th colspan='"+models.length+"' style='text-align: center;'>"+getCorpusLongLabel(corpus)+"</th></tr></thead><tbody><tr></tr></tbody></table></td>"
			  );
		      }

		      $("#root > tbody > tr > td > table > tbody > tr").each(function() {
			  for (var i=0; i<models.length; i++) {
			      var model = models[i];
			      $(this).append(
				  "<td><table class='table' id='"+$(this).closest("table").attr("id")+":"+model+"'><thead><tr><th colspan='"+phrases.length+"' style='text-align: center;'>"+getModelLongLabel(model)+"</th></tr></thead><tbody><tr></tr></tbody></table></td>"
			      );
			  }
		      });

		      $("#root > tbody > tr > td > table > tbody > tr > td > table > tbody > tr").each(function() {
			  for (var i=0; i<phrases.length; i++) {
			      var phrase = phrases[i];
			      $(this).append(
				  "<td><table class='table' id='"+$(this).closest("table").attr("id")+":"+phrase+"'><thead><tr><th colspan='2' style='text-align: center;'>"+phrase+"</th></tr><tr><th>Phrase</th><th>Similarity</th></tr></thead><tbody></tbody></table></td>"
			      );    
			  }
		      });
		  }

		  function printTableData(limit) {
		      $("#root > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody").each(function() {
			  for (var i=0; i<limit; i++) {
			      var index = i+1;
			      $(this).append("<tr><td>p"+index+"</td><td>s"+index+"</td></tr>");
			  }
		      });
		  }
	      });
}

$(document).ready(function(){
    main();
});

