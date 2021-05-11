const startShift = 300; //05:00
const endShift = 1320;  //22:00
const driveTimeMap = [[0, null], [25, 85], [45, 65], [80, 30], [null, 0]]
const EAST = 0;
const WEST = 1;
const QUERYNUM = 5;

export default function handler(req, res) {
  // console.log(req.body.spoint);
  const {spoint, epoint, date, time} = req.body;
  const query = main(date, startShift, endShift, spoint, epoint, time);
  res.status(200).json({ dTime: query })
}

const main = (inputDate, startShift, endShift, inputSPoint, inputEPoint, inputTime) => {
  if(inputSPoint === inputEPoint)
    return [];
  let dateNum = Math.pow(parseInt(inputDate.split('-').join('')), 2); //日期平方(yyyymmdd^2)
  let interval = 11 + dateNum % 7;
  let shift = createShift(interval, startShift, endShift);
  shift = getValidShift(dateNum, shift.length, shift);
  // console.log('shift', shift);  
  let driveTime = getDriveTime(inputSPoint, inputEPoint);
  return response(shift, driveTime, inputTime)
}

const createShift = (interval, startNum, endNum) => {
  let shift = [];
  while(startNum <= endNum) {
    shift.push(startNum);
    startNum += interval; 
  }
  return shift;
}

const generateMoreNum = (num) => {
  // num = abcdefghijklm
  // return [abcdefghijklm, bcdefghijklm, cdefghijklm, defghijklm...], length = 8
  let numArr = [];
  while(numArr.length < 8) {
    numArr.push(num);
    num = parseInt(num.toString().slice(1));
  }
  return numArr;
}

const getValidShift = (num, shiftNum, shift) => {
  let numArr = generateMoreNum(num);
  let remainArr = new Set();
  for(let i = 0; i < numArr.length; i++) {
    let opNum = numArr[i];
    while(opNum > 0) {
      let remain = opNum % shiftNum;
      remainArr.add(remain);
      opNum = (opNum - remain) / shiftNum;
    }
  }
  return shift.filter((element, index) => remainArr.has(index));
}

const getDriveTime = (inputSPoint, inputEPoint) => {
  let s = parseInt(inputSPoint);
  let e = parseInt(inputEPoint);
  if(s < e)
    return driveTimeMap[s][EAST];
  else if(s > e)
    return driveTimeMap[s][WEST];
}

const response = (shift, driveTime, inputTime) => {
  shift = shift.map(x => x + driveTime);
  let inputTimeArray = inputTime.split(':').map(x => parseInt(x));
  let inputNum = inputTimeArray[0] * 60 + inputTimeArray[1];
  let res = [];
  let count = 0;
  for(let i = 0; i < shift.length; i++) {
    if(shift[i] >= inputNum) {
      res.push(shift[i]);
      count++;
    }
    if(count === QUERYNUM)
      break;
  }
  return res.map(x => {
    let min = (x % 60).toString().padStart(2, '0');
    let hour = ((x - min) / 60).toString().padStart(2, '0');
    return `${hour}:${min}`;
  })
}
