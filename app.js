const fs = require('fs');
const csv = require('fast-csv');

var stream = fs.createReadStream("utf8.csv");

csv
  .fromStream(stream, {headers : true})
  .on("data", function(data){

    var stream = fs.createWriteStream('output/'+data.Country+'.csv', {'flags': 'a'});
    stream.write(data.Country+','+data.AccentCity+'\n');
    stream.end();

  })
  .on("error", function(data){
    console.log('data', data)
  })
  .on("end", function(){
    console.log("done");
  });

