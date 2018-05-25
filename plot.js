var $plotlink = d3.select('#plothref');
$plotlink.on('click', plotting);

function plotting() {

    alien_data = JSON.parse(window.name);
    var plotdata = alien_data.reduce((acc, val) => {
    acc[val.state.toUpperCase()] = acc[val.state.toUpperCase()] === undefined ? 1 : acc[val.state.toUpperCase()] += 1;
    return acc;
  }, {});

    var data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: Object.keys(plotdata),
        z: Object.values(plotdata),
        text: Object.keys(plotdata),
        colorscale: [
            [0, 'rgb(254, 238, 174)'], [0.1, 'rgb(251, 218, 154)'],
            [0.2, 'rgb(248, 198, 135)'], [0.3, 'rgb(245, 178, 116)'],
            [0.4, 'rgb(242, 158, 96)'], [0.5, 'rgb(240, 139, 77)'],
            [0.6, 'rgb(237, 119, 58)'], [0.7, 'rgb(234, 99, 38)'],
            [0.8, 'rgb(231, 79, 19)'], [1, 'rgb(229, 60, 0)']
        ],
        colorbar: {
            title: 'Observations count',
            thickness: 0.5
        },
        marker: {
            line:{
                color: 'rgb(255,255,255)',
                width: 2
            }
        }
    }];


    var layout = {
        title: 'UFO observations',
        geo:{
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(90, 223, 252)'
        }
    };

    Plotly.newPlot('dataplot', data, layout, {showLink: false});

}
