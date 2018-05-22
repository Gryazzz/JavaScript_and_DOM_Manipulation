var $tablehead = document.querySelector('#table-head');
var $tablebody = document.querySelector('#table-body');


var alien_data = dataSet;

// setting up a table header

var $headrow = $tablehead.insertRow(0);
$tablehead.innerHTML = '';
for (i=0; i < Object.keys(alien_data[0]).length; i++) {
    var $headcell = $headrow.insertCell(i);
    $headcell.innerText = Object.keys(alien_data[0])[i];
}

// setting up a table

$tablebody.innerHTML = '';
for (i=0; i < alien_data.length; i++) {
    var $bodyrow = $tablebody.insertRow(i);
    for (j=0; j < Object.keys(alien_data[i]).length; j++) {
        var $bodycell = $bodyrow.insertCell(j);
        $bodycell.innerText = Object.values(alien_data[i])[j];
    }
}



