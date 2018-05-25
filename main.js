var $tablehead = d3.select('#table-head');
var $tablebody = d3.select('#table-body');


var $searchbutton = d3.select('#search');
var $refreshbutton = d3.select('#refresh');

var alien_data = dataSet;
var chunkdata = alien_data;

//pagination variables
var currentPage = 1;
var perPage = 10;
var numberOfPages = Math.ceil(alien_data.length / perPage);
var $currentpage = d3.selectAll('.curpage');

render_table_chunk();

$refreshbutton.on('click', refresh);
$searchbutton.on('click', searching);

// multisearch function

function searching() {

    var dateInput = d3.select("#date-time").node().value; //need regexp for dates 
    var cityInput = d3.select("#city").node().value.trim().toLowerCase(); //need regexp for partial entry
    var stateInput = d3.select('#state').node().value.trim().toLowerCase();
    var countryInput = d3.select('#country').node().value.trim().toLowerCase();
    var shapeInput = d3.select('#shape').node().value.trim().toLowerCase();

    currentPage = 1;


    if (dateInput) {
        alien_data = dataSet.filter(function(date) {
            
            return date.datetime === dateInput;
    });
    }
    
    if (cityInput) {
        alien_data = alien_data.filter(c => { return c.city.toLowerCase() === cityInput; }); //key name can be changed to automatic one. one day
    }
        
    if (stateInput) {
        alien_data = alien_data.filter(s => { return s.state.toLowerCase() === stateInput; });
    }

    if (countryInput) {
        alien_data = alien_data.filter(c => { return c.country.toLowerCase() === countryInput; });
    }

    if (shapeInput) {
        alien_data = alien_data.filter(s => { return s.shape.toLowerCase() === shapeInput; });
    }

    render_table_chunk();
    numberOfPages = Math.ceil(alien_data.length / perPage);   
}


// Refresh table data
function refresh() {
    
    alien_data = dataSet;

    var forms = d3.selectAll('.form-control').nodes();
    forms.forEach(form => form.value = '');

    render_table_chunk();
    numberOfPages = Math.ceil(alien_data.length / perPage);

    d3.selectAll('.pagination')
        .style('display', 'flex');
}

//render data by chunks
function render_table_chunk() {

    $tablehead.text('');
    $tablebody.text('');
    
    chunkdata = alien_data.slice((currentPage-1) * perPage, currentPage * perPage);

    try {
        
        //setting up a header
        var $headrow = $tablehead.append("tr");
        Object.keys(alien_data[0]).forEach(item => $headrow.append('td').text(item));

        // setting up a table
        chunkdata.forEach(function(item) {
            var $bodyrow = $tablebody.append('tr');
            Object.values(item).forEach(value => $bodyrow.append('td').text(value));
            });
        }

    catch (error) {
        console.log('NO data in the dataset');
        $tablehead.append('tr')
            .append('td')
            .text('Sorry we do not have the data you have requested. Please refresh the page and do another search.');
        
        d3.selectAll('.pagination')
            .style('display', 'none'); 
    }
    $currentpage.text(currentPage);
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









