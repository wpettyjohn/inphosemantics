/* alert(dir['responseData']['results'][0]['corpora'][0]['sep.complete']['long label']) */

var kant = {"kant": [{"hume": 0.91794278932365247}, {"leibniz": 0.88537851050795435}, {"herder": 0.8753212567380434}, {"aristotle": 0.87024416994341403}, {"spinoza": 0.85926509164300868}, {"locke": 0.85888683236409924}, {"hegel": 0.85849343284862778}, {"wolff": 0.85748667120495348}, {"bradley": 0.84722366230370616}, {"strawson": 0.84458059258174023}, {"reid": 0.84188141318227327}, {"cohen": 0.83685662225276858}, {"mill": 0.83652194554221815}, {"maimon": 0.83544172029147257}, {"newton": 0.8344075826950208}, {"quine": 0.83245172505995968}, {"plato": 0.832291917065342}, {"frege": 0.83002595290102388}, {"views": 0.82937957386278915}, {"fichte": 0.82539844268173246}]};

function print_search(n) {
    $("#row1").append("<div id='search"+n+"' class='well span2 offset5'><form class='form-search'><input type='text' class='input-small search-query' /><button type='submit' class='btn'><i class='icon-search'></i></button></form></div>");
}

function print_table(n) {
    $("#search"+n).append(
			  "<table class='table table-striped table-condensed' id='tbl1'><thead><tr><th>Term</th><th colspan='2'><strong>Similarity</strong></th></tr></thead><tbody></tbody></table>");
}
print_table(1);

function print_rows(data, key) {
    $("#tbl1 tbody").html("<tr><td>"+key+"</td><td colspan='2'>1.000000</td></tr>");
    for (var i in data[key]) {
	var term = Object.keys(data[key][i])[0];
	var value = data[key][i][term];
	var row = "<tr><td><a href=''>"+term+"</a></td><td>"+roundNumber(value,6)+"</td><td><a href=''><i class='icon-chevron-right'></i></a></td></tr>";
	$("#tbl1 tbody").append(row);
    }
}
print_rows(kant, "kant");

function roundNumber(rnum, rlength) {
    var newnumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
    return parseFloat(newnumber);
}

$(".icon-chevron-right").click(
			       function(event) {
				   event.preventDefault();
				   print_search(2);  
			       });