const fs = require ('fs');

let manuallyEnabledCount = 0;
let hourlyDataCount = 0;
let switchedOnCount = 0;
let switchedOnManuallyCount = 0;

class HourlyDataTempHumid {

  constructor(dateTimeTemp, humidity, temperature) {
    this.dateTimeTemp = dateTimeTemp.trim();
    this.humidity = humidity.trim();
    this.temperature = temperature.trim();//Degree celcius
  }

  toString(){
    return this.dateTimeTemp +" "+this.humidity+" "+this.temperature;
  }

}

let hourlyData = new Array();

function parseIntoHourlyDataObject(dataString, startingLine){
  let indexOfHumidity = dataString.indexOf('Humidity');
  let dateTimeTemp = dataString.substring(startingLine.length, indexOfHumidity);
  let humidityTemp = dataString.substring( indexOfHumidity,dataString.length);
  let humidityString = humidityTemp.substring(0,humidityTemp.indexOf('Temp')-1);
  let humidity = humidityString.split('=')[1].trim();
  let temperatureString = humidityTemp.substring(humidityTemp.indexOf('Temp'),humidityTemp.length);
  let temperature = temperatureString.split('=')[1].trim();
  //console.log("\n"+startingLine);
  console.log(dataString);
  //console.log(indexOfHumidity);
  console.log(dateTimeTemp);
  console.log(humidity);
  console.log(temperature);

  return new HourlyDataTempHumid(dateTimeTemp, humidity, temperature);
  //TODO
}

function parseLoggerContent(data){

  let manuallyEnabledFlag = false;
  let array = data.toString().split("\n");
    for(i in array) {
      if(array[i].length >1){
        //console.log(array[i].length);
        //console.log(array[i].substring(0, 18));

        if(array[i].startsWith("Manually Enabled")){
          manuallyEnabledCount++;
          manuallyEnabledFlag=true;
          //console.log(array[i]);
        }else if (array[i].startsWith("Hourly Data")){
          hourlyDataCount++;
          hourlyData.push(parseIntoHourlyDataObject(array[i],'Hourly Data : '));
        }else if (array[i].startsWith("Switched ON") && !manuallyEnabledFlag){
          switchedOnCount++;
          parseIntoHourlyDataObject(array[i],'Switched ON at ');
        }else if (array[i].startsWith("Switched ON") && manuallyEnabledFlag){
          switchedOnManuallyCount++;
          parseIntoHourlyDataObject(array[i],'Switched ON at ');
        }else if (array[i].startsWith("Switched OFF") && manuallyEnabledFlag){
          parseIntoHourlyDataObject(array[i],'Switched OFF at ');
          manuallyEnabledFlag=false;

        }
      //  console.log(array[i]);

      }

    }
}

fs.readFile('./GardenAutomationLogger_RealLife.txt', 'utf-8', (err , data) =>{
  if (err)  console.error(err);
  else{
    //console.log(data);

    parseLoggerContent(data);
    console.log( 'manuallyEnabledCount : '+manuallyEnabledCount );
    console.log( 'hourlyDataCount : '+hourlyDataCount );
    console.log( 'switchedOnCount : '+switchedOnCount );
    console.log( 'switchedOnManuallyCount : '+switchedOnManuallyCount );

    console.log('hourlyDataArray Length '+hourlyData.length);
    console.log('hourlyDataArray Sample '+hourlyData[2].toString());
  }
}
);
