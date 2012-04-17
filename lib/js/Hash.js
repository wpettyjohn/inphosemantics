/**
 * Our JSON requests will be in the following form:
 * {
 *   "corpora" : [<String>, ...],
 *   "models" : [<String>, ...],
 *   "phrases" : [<String>, ...]
 * }
 */


function addModel(modelStr){
    var hash = window.location.hash;
    var obj = convertHashToObject(hash);
    if (obj["models"]){
	obj["models"].push(modelStr);
    } else {
	obj["models"] = [modelStr];
    }
    // !!! But does not give us to difference,
    // as means to remove graphical components.
    window.location.hash = convertObjectToHash(obj);
}

function addCorpus(corpusStr){
    var hash = window.location.hash;
    var obj = convertHashToObject(hash);
    if (obj["corpora"]){
	obj["corpora"].push(corpusStr);
    } else {
	obj["corpora"] = [corpusStr];
    }
    // !!! But does not give us to difference,
    // as means to remove graphical components.
    window.location.hash = convertObjectToHash(obj);
}

function addPhrase(phraseStr){
    var hash = window.location.hash;
    var obj = convertHashToObject(hash);
    if (obj["phrases"]){
	obj["phrases"].push(phraseStr);
    } else {
	obj["phrases"] = [phraseStr];
    }
    // !!! Currently we only support a single phrase,
    // so we simply append it to the parameters object.
    // !!! But does not give us to difference,
    // as means to remove graphical components.
    window.location.hash = convertObjectToHash(obj);
}

/**
 * convertHashToObject takes a string representing
 * a URL's hash data and attempts to convert it into
 * an object.
 */
var convertHashToObject = function(str){
    //console.log("Objectifying: " + str);
    if (str){
	if(str.charAt(0) === "#"){
	    str = str.substring(1);
	}
	return JSON.parse(decodeURI(str));
    }
    return {};
}


/**
 * convertObjectToHash takes an object representing
 * a collection of query parameters and lops them into
 * a string which is acceptable for use as a URL's hash.
 */
var convertObjectToHash = function(obj){
    if(obj ){
	//console.log("Hashing: " + JSON.stringify(obj));
	return encodeURI(JSON.stringify(obj));
    }
    return "";
}