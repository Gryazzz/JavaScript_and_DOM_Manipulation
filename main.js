var $tablehead = d3.select('#table-head');
var $tablebody = d3.select('#table-body');


var $searchbutton = d3.select('#search');
var $refreshbutton = d3.select('#refresh');

// var alien_data = dataSet;
var alien_data = newData;
var chunkdata = alien_data;

//pagination variables
var currentPage = 1;
var perPage = 50;
var numberOfPages = Math.ceil(alien_data.length / perPage);
var $currentpage = d3.selectAll('.curpage');

//set up a page
// changeDate();
render_table_chunk();
refresh();
dropdowns(dropHelp);

$refreshbutton.on('click', refresh);
$searchbutton.on('click', searching);

//change date format to YYYY/MM/DD  Don't use it, because I changed the initial dataset

// function changeDate() {
//     dataSet.forEach(item => {
//         return item['datetime'] = dateFormat(item['datetime']); //terrible naming (datetime), just tired to change now
//     });
// }


// function dateFormat(d) {
    
//         var date = d.split('/');
      
//         if(date[0].length === 1){
//             date[0] = '0' + date[0];
//         };

//         if (date[1].length === 1){
//             date[1] = '0' + date[1];
//         };
        
//         newDate = date[2] + '/' + date[0] + '/' + date[1];

//         return newDate
// }


// multisearch function

function searching() {

    currentPage = 1;

    var inputIds = [];
    var inpValues = [];

    d3.selectAll('.form-control').each(function(d) {
        inputIds.push('#' + this.id);
    });

    inputIds.forEach(item => {
        inpValues.push(d3.select(item).node().value.trim().toLowerCase());
    })

    inpKeys = Object.keys(alien_data[0]);
    // add one more datetime to the array
    inpKeys.unshift(Object.keys(alien_data[0])[0]);

    inpValues.forEach((item, index) => {
        if (item) {
            if (index > 1) {
                alien_data = alien_data.filter(val => {
                    return val[inpKeys[index]].toLowerCase() === item;
                });
            }
            else if (index === 0) {
                alien_data = alien_data.filter(val => {
                    return val[inpKeys[index]].toLowerCase() >= item;
                });
            }
            else {
                alien_data = alien_data.filter(val => {
                    return val[inpKeys[index]].toLowerCase() <= item;
                });
            }
        }
    });

    render_table_chunk();
    dropdowns(dropHelp);
}


// Refresh table data
function refresh() {
    
    // alien_data = dataSet;
    alien_data = newData;

    var forms = d3.selectAll('.form-control').nodes();
    forms.forEach(form => form.value = '');

    render_table_chunk();
    dropdowns(dropHelp);

    currentPage = 1;
    d3.selectAll('.pagination').style('display', 'flex');
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
    numberOfPages = Math.ceil(alien_data.length / perPage);
    
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
// autocompletion dropdowns

function dropdowns(callback) {

    var datalist_ids = [];

    d3.selectAll('datalist').each(function(d) {
        datalist_ids.push('#' + this.id);
    });

    if (d3.selectAll('option').empty()) {

        try {
            callback(datalist_ids);
        }
        catch (error) {
            console.log(error);
        }
    }

    else  {
            d3.selectAll('.dropoptions').remove();
        
        try {
            callback(datalist_ids);
        }
        catch (error) {
            console.log(error);
        }
    }
}

function dropHelp(d) {
    inpKeys = Object.keys(alien_data[0]);
        // add one more datetime to the array
    inpKeys.unshift(Object.keys(alien_data[0])[0]);

    inpKeys.forEach((key, index) => {
        // console.log(key + alien_data.length);
        
        var datalist = alien_data.map(item => item[key]).filter((v, i, a) => a.indexOf(v) === i);

        datalist.forEach(value => {
            var option = d3.select(d[index]).append('option');
            option.attr('value', value);
            // option.style('background', 'rgb(44, 65, 118)');
            option.attr('class', 'dropoptions');
                    
        });
        // console.log(d3.select(datalist_ids[index]).selectAll('option')['_groups'][0].length);
    });
}