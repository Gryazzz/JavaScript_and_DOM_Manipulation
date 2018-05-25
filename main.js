var $tablehead = document.querySelector('#table-head');
var $tablebody = document.querySelector('#table-body');
var $pagination = document.querySelector('#pagination')

var $searchbutton = document.querySelector('#search');
var $refreshbutton = document.querySelector('#refresh');

var $date = document.querySelector('#date-time');
var $city = document.querySelector('#city');
var $state = document.querySelector('#state');
var $country = document.querySelector('#country');
var $shape = document.querySelector('#shape');

var alien_data = dataSet;
var chunkdata = dataSet;
var currentPage = 1;

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
        $headcell.innerText = 'Sorry we do not have the data you have requested. Please refresh the page and do another search.';
    }
}

// multisearch function

function searching() {

    var dateInput = $date.value.trim(); //need regexp for dates 
    var cityInput = $city.value.trim().toLowerCase(); //need regexp for partial entry
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

function chunk_render() {

    // $tablehead.innerHTML = '';
    // $tablebody.innerHTML = '';

    var perPage = 100;
    var numberOfPages = Math.ceil(alien_data.length / perPage);
    
    
    chunkdata = alien_data.slice((currentPage-1) * perPage, currentPage * perPage);

    //here should be rendertable function


}

chunk_render();



//Pagination

    // var list = alien_data;
    // var pageList = new Array();
    // var currentPage = 1;
    // var numberPerPage = 100; //number of records per page
    // var numberOfPages = Math.ceil(alien_data.length / numberPerPage);

    // function nextPage() {
    //     currentPage += 1;
    //     loadList();
    // }

    // function previousPage() {
    //     currentPage -= 1;
    //     loadList();
    // }

    // function firstPage() {
    //     currentPage = 1;
    //     loadList();
    // }

    // function lastPage() {
    //     currentPage = numberOfPages;
    //     loadList();
    // }

    // function loadList() {
    //     // var pageList = new Array();
    //     // var currentPage = 1;
    //     // var numberPerPage = 100; //number of records per page
    //     // var numberOfPages = Math.ceil(alien_data.length / numberPerPage);
    //     var begin = ((currentPage - 1) * numberPerPage);
    //     var end = begin + numberPerPage;
    
    // pageList = alien_data.slice(begin, end);

    //     try {
    //         var $headrow = $tablehead.insertRow(0);
    //         for (i=0; i < Object.keys(pageList[0]).length; i++) {
    //             var $headcell = $headrow.insertCell(i);
    //             $headcell.innerText = Object.keys(pageList[0])[i];
    //         }

    //         // setting up a table
    //         for (i=0; i < n; i++) {
    //             var $bodyrow = $tablebody.insertRow(i);
    //             for (j=0; j < Object.keys(pageList[i]).length; j++) {
    //                 var $bodycell = $bodyrow.insertCell(j);
    //                 $bodycell.innerText = Object.values(pageList[i])[j];
    //             }
    //         }
    //     }
    //     catch (error) {
    //         console.log('NO data in the dataset');
    //         var $headrow = $tablehead.insertRow(0);
    //         var $headcell = $headrow.insertCell(0);
    //         $headcell.innerText = 'Sorry we don\'t have the data you\'ve requested. Please do another search.';
    //     }
    // }

    // function check() {
    //         document.querySelector("#next").disabled = currentPage == numberOfPages ? true : false;
    //         document.querySelector("#previous").disabled = currentPage == 1 ? true : false;
    //         document.querySelector("#first").disabled = currentPage == 1 ? true : false;
    //         document.querySelector("#last").disabled = currentPage == numberOfPages ? true : false;
    //     }
    // check();         // determines the states of the pagination buttons



    // while(p) { //current page number
        
    //     $tablehead.innerHTML = '';
    //     $tablebody.innerHTML = '';

    //     var chunkdata = alien_data.slice(p*n, (p+1)*n);

    //     try {
    //         var $headrow = $tablehead.insertRow(0);
    //         for (i=0; i < Object.keys(alien_data[0]).length; i++) {
    //             var $headcell = $headrow.insertCell(i);
    //             $headcell.innerText = Object.keys(alien_data[0])[i];
    //         }

    //         // setting up a table
    //         for (i=0; i < n; i++) {
    //             var $bodyrow = $tablebody.insertRow(i);
    //             for (j=0; j < Object.keys(chunkdata[i]).length; j++) {
    //                 var $bodycell = $bodyrow.insertCell(j);
    //                 $bodycell.innerText = Object.values(chunkdata[i])[j];
    //             }
    //         }
    //     }
    //     catch (error) {
    //         console.log('NO data in the dataset');
    //         var $headrow = $tablehead.insertRow(0);
    //         var $headcell = $headrow.insertCell(0);
    //         $headcell.innerText = 'Sorry we don\'t have the data you\'ve requested. Please do another search.';
    //     }
    // }





