var $tablehead = document.querySelector('#table-head');
var $tablebody = document.querySelector('#table-body');

var $searchbutton = document.querySelector('#search');

var $date = document.querySelector('#date-time');
var $city = document.querySelector('#city');
var $state = document.querySelector('#state');
var $country = document.querySelector('#country');
var $shape = document.querySelector('#shape');

var alien_data = dataSet;

render_table();

function render_table() {
    $tablehead.innerHTML = '';
    $tablebody.innerHTML = '';

    // setting up a table header
    var $headrow = $tablehead.insertRow(0);
    for (i=0; i < Object.keys(alien_data[0]).length; i++) {
        var $headcell = $headrow.insertCell(i);
        $headcell.innerText = Object.keys(alien_data[0])[i];
    }

    // setting up a table
    // for (i=0; i < alien_data.length; i++) {
    for (i=0; i < 200; i++) {
        var $bodyrow = $tablebody.insertRow(i);
        for (j=0; j < Object.keys(alien_data[i]).length; j++) {
            var $bodycell = $bodyrow.insertCell(j);
            $bodycell.innerText = Object.values(alien_data[i])[j];
        }
    }
}

// filtering date/time
function searching() {
    alien_data = dataSet.filter(d => { return d.datetime === $date.value; });
    render_table()
}

$searchbutton.addEventListener('click', searching);






