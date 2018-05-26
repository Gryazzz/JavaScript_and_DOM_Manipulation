var $tablehead = d3.select('#table-head');
var $tablebody = d3.select('#table-body');


var $searchbutton = d3.select('#search');
var $refreshbutton = d3.select('#refresh');


var alien_data = dataSet;
var chunkdata = alien_data;

//pagination variables
var currentPage = 1;
var perPage = 50;
var numberOfPages = Math.ceil(alien_data.length / perPage);
var $currentpage = d3.selectAll('.curpage');

render_table_chunk();

$refreshbutton.on('click', refresh);
$searchbutton.on('click', searching);


// multisearch function

function searching() {

    currentPage = 1;

    var dateInput = d3.select("#date-time").node().value; //need regexp for dates 
    var cityInput = d3.select("#city").node().value.trim().toLowerCase(); //need regexp for partial entry
    var stateInput = d3.select('#state').node().value.trim().toLowerCase();
    var countryInput = d3.select('#country').node().value.trim().toLowerCase();
    var shapeInput = d3.select('#shape').node().value.trim().toLowerCase();
    
    var inpValues = [];
    inpValues.push(dateInput, cityInput, stateInput, countryInput, shapeInput);

    inpKeys = Object.keys(alien_data[0]);

    inpValues.forEach((item, index) => {
        if (item) {
            alien_data = alien_data.filter(val => {
                return val[inpKeys[index]].toLowerCase() === item;
            });
        }
    });

    // if (dateInput) {
    //     alien_data = dataSet.filter(function(date) {
            
    //         return date.datetime === dateInput;
    // });
    // }
    
    // if (cityInput) {
    //     alien_data = alien_data.filter(c => { return c.city.toLowerCase() === cityInput; }); //key name can be changed to automatic one. one day
    // }
        
    // if (stateInput) {
    //     alien_data = alien_data.filter(s => { return s.state.toLowerCase() === stateInput; });
    // }

    // if (countryInput) {
    //     alien_data = alien_data.filter(c => { return c.country.toLowerCase() === countryInput; });
    // }

    // if (shapeInput) {
    //     alien_data = alien_data.filter(s => { return s.shape.toLowerCase() === shapeInput; });
    // }

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
    window.name = JSON.stringify(alien_data);
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

//------------------------------------------------------------------

// function plotting() {

//     alien_data = window.name;
//     var plotdata = alien_data.reduce((acc, val) => {
//     acc[val.state.toUpperCase()] = acc[val.state.toUpperCase()] === undefined ? 1 : acc[val.state.toUpperCase()] += 1;
//     return acc;
//   }, {});

//     var data = [{
//         type: 'choropleth',
//         locationmode: 'USA-states',
//         locations: Object.keys(plotdata),
//         z: Object.values(plotdata),
//         text: Object.keys(plotdata),
//         colorscale: [
//             [0, 'rgb(254, 238, 174)'], [0.1, 'rgb(251, 218, 154)'],
//             [0.2, 'rgb(248, 198, 135)'], [0.3, 'rgb(245, 178, 116)'],
//             [0.4, 'rgb(242, 158, 96)'], [0.5, 'rgb(240, 139, 77)'],
//             [0.6, 'rgb(237, 119, 58)'], [0.7, 'rgb(234, 99, 38)'],
//             [0.8, 'rgb(231, 79, 19)'], [1, 'rgb(229, 60, 0)']
//         ],
//         colorbar: {
//             title: 'Observations count',
//             thickness: 0.5
//         },
//         marker: {
//             line:{
//                 color: 'rgb(255,255,255)',
//                 width: 2
//             }
//         }
//     }];


//     var layout = {
//         title: 'UFO observations',
//         geo:{
//             scope: 'usa',
//             showlakes: true,
//             lakecolor: 'rgb(90, 223, 252)'
//         }
//     };

//     Plotly.newPlot('dataplot', data, layout, {showLink: false});

// }


//-----------------------------------------------------

var datalist_ids = [];

d3.selectAll('datalist').each(function(d) {
    datalist_ids.push('#' + this.id);
  });

Object.keys(alien_data[0]).forEach((key, index) => {
    
    try {
        dataL = alien_data.map(item => {
            item.key;
            // console.log(key)});
        // 
        datalist = dataL.filter((v, i, a) => a.indexOf(v) === i);
        console.log(datalist);

        // datalist.forEach(value => {
        //     console.log(value);
        //     var option = d3.select(datalist_ids[index]).append('option');
        //     option.attr('value', value);
            
        // })
        // console.log(key, index);
        // console.log('add ' + key);
    }
    catch (error) {
        console.log(error);
    }
})


// date_list = alien_data.map(item => item.datetime);

// date_list.forEach(item => {
//     var option = d3.select('#date_list').append('option');
//     option.attr('value', item);
// });


// function dropdown() {

// }

