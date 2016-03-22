const fs = require('fs');
const csv = require('fast-csv');
var Converter = require("csvtojson").Converter;

var fileList, currentIndex;


fs.readdir('output', function(err, files){
  //console.log(files);
  fileList = files;
  convert(0);
});

function convert(index){
  console.log(fileList[index]);
  var converter = new Converter({
    noheader: true,
    headers:["Country","AccentCity"],
    quote: "Ψ"
  });

  converter.on("end_parsed", function (jsonArray) {
    var stream = fs.createWriteStream('output/'+jsonArray[0].Country+'.json', {encoding: "utf8"});
    stream.write(JSON.stringify(jsonArray));
    stream.end();
    if (index < fileList.length-1){
      convert(++index);
    }
  });

  fs.createReadStream('output/'+fileList[index]).pipe(converter);
}

