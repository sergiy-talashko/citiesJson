const fs = require('fs');
const csv = require('fast-csv');
var Converter = require("csvtojson").Converter;

fs.readdir('output', function(err, files){
  //console.log(files);
  for(var i=0; i<files.length; i++){

    console.log(files[i].replace('csv','json'));

    var converter = new Converter({headers:["Country","AccentCity"]});
    converter.on("end_parsed", function (jsonArray) {
      console.log(jsonArray);
      console.log(files[i]);
      fs.createWriteStream('output/'+jsonArray[0].Country+'.json', {encoding: "utf8"});
      fs.write(jsonArray);
      fs.end();
    });

    fs.createReadStream('output/'+files[i]).pipe(converter);
  }
});

