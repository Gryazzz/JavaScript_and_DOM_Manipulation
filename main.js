var $tablehead = document.querySelector('#table-head');
var $tablebody = document.querySelector('#table-body');
var $currentpage = document.querySelector('.curpage');

var $searchbutton = document.querySelector('#search');
var $refreshbutton = document.querySelector('#refresh');

var $date = document.querySelector('#date-time');
var $city = document.querySelector('#city');
var $state = document.querySelector('#state');
var $country = document.querySelector('#country');
var $shape = document.querySelector('#shape');

var alien_data = dataSet;
var chunkdata = alien_data;

//pagination variables
var currentPage = 1;
var perPage = 10;
var numberOfPages = Math.ceil(alien_data.length / perPage);


render_table_chunk();

// function render_table() {
//     $tablehead.innerHTML = '';
//     $tablebody.innerHTML = '';

//     // setting up a table header

//     try {
//         var $headrow = $tablehead.insertRow(0);
//         for (i=0; i < Object.keys(alien_data[0]).length; i++) {
//             var $headcell = $headrow.insertCell(i);
//             $headcell.innerText = Object.keys(alien_data[0])[i];
//         }

//         // setting up a table
//         for (i=0; i < alien_data.length; i++) {
//             var $bodyrow = $tablebody.insertRow(i);
//             for (j=0; j < Object.keys(alien_data[i]).length; j++) {
//                 var $bodycell = $bodyrow.insertCell(j);
//                 $bodycell.innerText = Object.values(alien_data[i])[j];
//             }
//         }
//     }
//     catch (error) {
//         console.log('NO data in the dataset');
//         var $headrow = $tablehead.insertRow(0);
//         var $headcell = $headrow.insertCell(0);
//         $headcell.innerText = 'Sorry we do not have the data you have requested. Please refresh the page and do another search.';
//     }
// }

// multisearch function

function searching() {

    var dateInput = $date.value.trim(); //need regexp for dates 
    var cityInput = $city.value.trim().toLowerCase(); //need regexp for partial entry
    var stateInput = $state.value.trim().toLowerCase();
    var countryInput = $country.value.trim().toLowerCase();
    var shapeInput = $shape.value.trim().toLowerCase();
    currentPage = 1;


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

    render_table_chunk();   
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

    render_table_chunk();
}

//render data by chunks
function render_table_chunk() {

    $tablehead.innerHTML = '';
    $tablebody.innerHTML = '';
    
    chunkdata = alien_data.slice((currentPage-1) * perPage, currentPage * perPage);

    $currentpage.innerText = currentPage;

    try {

        //setting up a header
        var $headrow = $tablehead.insertRow(0);
        Object.keys(alien_data[0]).forEach(function(item, index) {
            var $headcell = $headrow.insertCell(index);
            $headcell.innerText = item;
        });

        // setting up a table
        chunkdata.forEach(function(item, index) {
            var $bodyrow = $tablebody.insertRow(index);
            Object.values(item).forEach(function(item, index) {
                var $bodycell = $bodyrow.insertCell(index);
                $bodycell.innerText = item;
            })
        });   
    }

    catch (error) {
        console.log('NO data in the dataset');
        var $headrow = $tablehead.insertRow(0);
        var $headcell = $headrow.insertCell(0);
        $headcell.innerText = 'Sorry we do not have the data you have requested. Please refresh the page and do another search.';
    }
}

function nextPage() {

    if (currentPage === numberOfPages) {
        currentPage = currentPage;
    }
    else {
        currentPage++;
        render_table_chunk();
    }
}

function previousPage() {

    if (currentPage === 1) {
        currentPage = currentPage;
    }
    else {
        currentPage--;
        render_table_chunk();
    }
}

function firstPage(){
    currentPage = 1;
    render_table_chunk();
}

function lastPage() {
    currentPage = numberOfPages;
    render_table_chunk();
}







