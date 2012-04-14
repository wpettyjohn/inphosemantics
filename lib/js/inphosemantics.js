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

function populateModals(jsonDirectory) {
  var dir = jsonDirectory;
  var corporaArray = dir['responseData']['results'][0]['corpora'];
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
var selectedCorpora;
$("#corporaSubmit").click(function(event) {
  event.preventDefault();
  selectedCorpora = $("#corporaSelect").val();
  $("#corpora").modal('hide');
  setSelectedCorpora(selectedCorpora);
});

// tracks models that the user has selected
var selectedModels;
$("#modelsSubmit").click(function(event) {
  event.preventDefault();
  selectedModels = $("#modelsSelect").val();
  $("#models").modal('hide');
  setSelectedCorpora(selectedCorpora);
});

// tracks terms that the user has selected and submits them along with selected corpora and models
// TODO: allow for selection of multiple terms
var searchTerms;
$("#search").submit(function(event) {
  event.preventDefault();
  searchTerms = $("#searchTerm").val();
  addPhrases(searchTerms);
});

//end data submit jquery