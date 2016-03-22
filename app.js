const fs = require('fs');
const csv = require('fast-csv');

var stream = fs.createReadStream("worldcity.csv");

csv
  .fromStream(stream, {headers : true})
  .on("data", function(data){
    console.log(data);

    var stream = fs.createWriteStream('output/'+data.Country+'.csv', {'flags': 'a', defaultEncoding: 'utf-8'});
    console.log(data.AccentCity);
    stream.write('Aixàs,'+data.Country+','+data.AccentCity+'\n\r');
    stream.end();

  })
  .on("error", function(data){
    console.log('data', data)
  })
  .on("end", function(){
    console.log("done");
  });

