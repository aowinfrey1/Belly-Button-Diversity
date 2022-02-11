


// function the populates the metadata
function demoInfo(sample)
{
   console.log(sample);
   
   //use d3.json to get data
   d3.json("samples.json").then((data) =>{
      //grab metadata
      let metaData = data.metadata;
      //console.log(metaData);

      //filter for sample values
      let result = metaData.filter(sampleResult => sampleResult.id == sample);
      //console.log(result);

      //grab index[0] from array
      let resultData = result[0];
      //console.log(resultData);
      
      //to clear metadata
      d3.select("#sample-metadata").html("");

      //use object.entries to get value key pairs
      Object.entries(resultData).forEach(([key,value]) => {
         d3.select("#sample-metadata")
            .append("h5").text(`${key}: ${value}`);
      });


   });   
}
   

// function that builds the bar chart
   function buildBarChart(sample)
   {
      //console.log(sample);
      //let data = d3.json("samples.json");
      //console.log(data);

      d3.json("samples.json").then((data) =>{
         //grab sample adata
         let sampleData = data.samples;
         
   
         //filter for sample values
         let result = sampleData.filter(sampleResult => sampleResult.id == sample);
         
   
         //grab index[0] from array
         let resultData = result[0];
         
         
         //get otu_ids, labels, values
         let otu_ids = resultData.otu_ids;
         let otu_labels = resultData.otu_labels;
         let sample_values = resultData.sample_values;
         
         
         //build bar chart
         let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
         let xValues = sample_values.slice(0, 10);
         let textLabels = otu_labels.slice(0, 10);
         
         let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels,
            type: "bar",
            orientation: "h"
         }

         let layout = {
            title: "Top 10 Belly Button Bacteria"
         };
         Plotly.newPlot("bar", [barChart], layout);
      
      });   
   }
   
// build bubble chart
function buildBubbleChart(sample)
{
   //console.log(sample);
      //let data = d3.json("samples.json");
      //console.log(data);

      d3.json("samples.json").then((data) =>{
         //grab sample adata
         let sampleData = data.samples;
         
   
         //filter for sample values
         let result = sampleData.filter(sampleResult => sampleResult.id == sample);
         
   
         //grab index[0] from array
         let resultData = result[0];
         
         
         //get otu_ids, labels, values
         let otu_ids = resultData.otu_ids;
         let otu_labels = resultData.otu_labels;
         let sample_values = resultData.sample_values;
         
         
         //build bubble chart
         
         
         let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker:{
               size: sample_values,
               color: otu_ids,
               colorscale: "Earth"
            }
         }

         let layout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
         };
         Plotly.newPlot("bubble", [bubbleChart], layout);
      });
}

/*function gauge(sample)
{
   var select = d3.select("#selDataset");
      {
         x: (0, 1), 
         y: (0, 1) ,
         value: 270,
         title: { text: "Speed" },
         type: "indicator",
         mode: "gauge+number"
      }

   
   var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
   Plotly.newPlot('myDiv', select, layout);
   
}
*/
// function that initializes the dashboard
function initialize()
{
   //let data = d3.json("samples.json");
   //console.log(data);
   

   //access dropdown from html file
   var select = d3.select("#selDataset");

   //use d3.json to get data
   d3.json("samples.json").then((data) =>{
      let sampleNames = data.names;
      //console.log(sampleNames);

      //have foreach to create options for each sample in selector
      sampleNames.forEach((sample) => {
         //console.log(sample)
         select.append("option")
         .text(sample)
         .property("value", sample);

      });
      
      //populate info for first sample
   let sample1 = sampleNames[0];

   //function to build metadata
   demoInfo(sample1);
   //function to build bar chart
   buildBarChart(sample1);
   //function to build bubble chart
   buildBubbleChart(sample1);
   //function to build gauge meter
   gauge(sample1);
   });
   
}   

// function that updates the dashboard
function optionChanged(item)
{
   //call function to upate metadata
   demoInfo(item);
   // call function for bar chart
   buildBarChart(item);
   // call function for bubble chart
   buildBubbleChart(item);
   // call function for gauge
   gauge(item);
}

// call the initialize function
initialize();
