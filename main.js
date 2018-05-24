var $tablehead = document.querySelector('#table-head');
var $tablebody = document.querySelector('#table-body');

var $searchbutton = document.querySelector('#search');
var $refreshbutton = document.querySelector('#refresh');

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

    try {
        var $headrow = $tablehead.insertRow(0);
        for (i=0; i < Object.keys(alien_data[0]).length; i++) {
            var $headcell = $headrow.insertCell(i);
            $headcell.innerText = Object.keys(alien_data[0])[i];
        }

        // setting up a table
        for (i=0; i < alien_data.length; i++) {
        // for (i=0; i < 200; i++) {
            var $bodyrow = $tablebody.insertRow(i);
            for (j=0; j < Object.keys(alien_data[i]).length; j++) {
                var $bodycell = $bodyrow.insertCell(j);
                $bodycell.innerText = Object.values(alien_data[i])[j];
            }
        }
    }
    catch (error) {
        console.log('NO data in the dataset');
        var $headrow = $tablehead.insertRow(0);
        var $headcell = $headrow.insertCell(0);
        $headcell.innerText = 'Sorry we don\'t have the data you\'ve requested. Please do another search.';
    }
}

// multisearch function

function searching() {

    var dateInput = $date.value.trim(); //need regexp for dates 
    var cityInput = $city.value.trim().toLowerCase();
    var stateInput = $state.value.trim().toLowerCase();
    var countryInput = $country.value.trim().toLowerCase();
    var shapeInput = $shape.value.trim().toLowerCase();


    if ($date.value) {
        alien_data = dataSet.filter(function(date) {
        return date.datetime === dateInput;
    });
    }
    
    if ($city.value) {
        alien_data = alien_data.filter(c => { return c.city.toLowerCase() === cityInput; }); //key name can be changed to automatic one. one day
    }
        
    if ($state.value) {
        alien_data = alien_data.filter(s => { return s.state.toLowerCase() === stateInput; });
    }

    if ($country.value) {
        alien_data = alien_data.filter(c => { return c.country.toLowerCase() === countryInput; });
    }

    if ($shape.value) {
        alien_data = alien_data.filter(s => { return s.shape.toLowerCase() === shapeInput; });
    }

    render_table()   
}

$searchbutton.addEventListener('click', searching);
$refreshbutton.addEventListener('click', refresh);

// Refresh table data
function refresh() {
    alien_data = dataSet;

    $city.value = '';
    $date.value = '';
    $state.value = '';
    $country.value = '';
    $shape.value = '';

    render_table();
}

function pages() {
    var n = 100;
    var pagesnumber = alien_data.length / n - alien_data.length % n / 100 + 1;

    while(p) { //current page number
        
        $tablehead.innerHTML = '';
        $tablebody.innerHTML = '';

        var chunkdata = alien_data.slice(p*n, (p+1)*n);

        try {
            var $headrow = $tablehead.insertRow(0);
            for (i=0; i < Object.keys(alien_data[0]).length; i++) {
                var $headcell = $headrow.insertCell(i);
                $headcell.innerText = Object.keys(alien_data[0])[i];
            }

            // setting up a table
            for (i=0; i < n; i++) {
                var $bodyrow = $tablebody.insertRow(i);
                for (j=0; j < Object.keys(chunkdata[i]).length; j++) {
                    var $bodycell = $bodyrow.insertCell(j);
                    $bodycell.innerText = Object.values(chunkdata[i])[j];
                }
            }
        }
        catch (error) {
            console.log('NO data in the dataset');
            var $headrow = $tablehead.insertRow(0);
            var $headcell = $headrow.insertCell(0);
            $headcell.innerText = 'Sorry we don\'t have the data you\'ve requested. Please do another search.';
        }
        }
}





