


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
      console.log(resultData); 

      //use object.entries to get value key pairs
      Object.entries(resultData).forEach(([key,value]) => {
         d3.select("#sample-metadata")
            .append("<h5>").text(`${key}: ${value}`);
      });


   });   
}

// function that builds the bar chart


// function that builds the bubble chart


// function that initializes the dashboard
function initialize()
{
   let data = d3.json("samples.json");
   console.log(data);
   

   //access dropdown from html file
   var select = d3.select("#selDataset");

   //use d3.json to get data
   d3.json("samples.json").then((data) =>{
      let sampleNames = data.names;
      console.log(sampleNames);

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
   });
   
}   

// function that updates the dashboard
function optionChanged(item)
{
   console.log(item);
}

// call the initialize function
initialize();
