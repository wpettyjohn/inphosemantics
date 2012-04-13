$.getJSON("../../data/inphosemantics-directory.json", function(data) {
    
    var dir = data;
    var corporaArray = dir['responseData']['results'][0]['corpora'];
    var corporaLength = corporaArray.length;

    var corporaKeys = [];
    function populateCorporaKeys() {
	for (i=0;i<corporaLength;i++) {
	    corporaKeys.push(Object.keys(corporaArray[i]));
	}
    }
    populateCorporaKeys();

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

    // begin modal population functions                                                                                                 
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
    // end modal population functions

    var searchTerms;
    $("#search").submit(function() {	 		     
	alert($("#searchTerm").val()+";"+selectedCorpora+";"+selectedModels);
    });

    var selectedCorpora;
    $("#corporaSubmit").click(function(event) {
	event.preventDefault();
	selectedCorpora = $("#corporaSelect").val();
	$("#corpora").modal('hide');
    });

    var selectedModels;
    $("#modelsSubmit").click(function(event) {
	event.preventDefault();
	selectedModels = $("#modelsSelect").val();
	$("#models").modal('hide');
    });

});

$("#corpora").modal({
	show: false
});

$("#models").modal({
    show: false
});