const fs = require ('fs');

let manuallyEnabledCount = 0;
let hourlyDataCount = 0;
let switchedOnCount = 0;

function parseLoggerContent(data){
  var array = data.toString().split("\n");
    for(i in array) {
      if(array[i].length >1){
        //console.log(array[i].length);
        //console.log(array[i].substring(0, 18));

        if(array[i].startsWith("Manually Enabled")){
          manuallyEnabledCount++;
        }else if (array[i].startsWith("Hourly Data")){
          hourlyDataCount++;
        }else if (array[i].startsWith("Switched ON")){
          switchedOnCount++;
        }
        console.log(array[i]);
      }

    }
}

fs.readFile('C:\\Dev\\Arduino\\Garden Automation Log Arduiono\\GardenAutomationLogger_RealLife.txt', 'utf-8', (err , data) =>{
  if (err)  console.error(err);
  else{
    //console.log(data);

    parseLoggerContent(data);
    console.log( 'manuallyEnabledCount : '+manuallyEnabledCount );
    console.log( 'hourlyDataCount : '+hourlyDataCount );
    console.log( 'switchedOnCount : '+switchedOnCount );
  }
}
);
