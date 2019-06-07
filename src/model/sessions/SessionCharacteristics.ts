import SessionDataRow from "./SessionDataRow";

export default class SessionCharacteristics {
  accValueLength: number;
  gyroValueLength: number;
  avgAccPeaks: number;
  avgGyroPeaks: number;
  accMin: number;
  gMin: number;
  accMax: number;
  gMax: number;
  accIntegral: number;
  gyroIntegral: number;
  accIntegralPerSecond: number;
  gyroIntegralPerSecond: number;
  accAvgInterval: number;
  gyroAvgInterval: number;
  constructor(
    accValueLength: number,
    gyroValueLength: number,
    avgAccPeaks: number,
    avgGyroPeaks: number,
    accMin: number,
    gMin: number,
    accMax: number,
    gMax: number,
    accIntegral: number,
    gyroIntegral: number,
    accIntegralPerSecond: number,
    gyroIntegralPerSecond: number,
    accAvgInterval: number,
    gyroAvgInterval: number
  ) {
    this.accValueLength = accValueLength;
    this.gyroValueLength = gyroValueLength;
    this.avgAccPeaks = avgAccPeaks;
    this.avgGyroPeaks = avgGyroPeaks;
    this.accMin = accMin;
    this.gMin = gMin;
    this.accMax = accMax;
    this.gMax = gMax;
    this.accIntegral = accIntegral;
    this.gyroIntegral = gyroIntegral;
    this.accIntegralPerSecond = accIntegralPerSecond;
    this.gyroIntegralPerSecond = gyroIntegralPerSecond;
    this.accAvgInterval = accAvgInterval;
    this.gyroAvgInterval = gyroAvgInterval;
  }
}

function integral(array: Array<SessionDataRow>) {
  let integral = 0;
  for (let i = 1; i < array.length - 1; i++) {
    integral += array[i].norm * (array[i + 1].time - array[i].time);
  }
  return integral;
}

function peaks(array: Array<SessionDataRow>) {
  let peaks = [];
  let times = [];
  for (let i = 1; i < array.length - 1; i++) {
    if (
      (array[i].norm > array[i - 1].norm &&
        array[i].norm > array[i + 1].norm) ||
      (array[i].norm < array[i - 1].norm && array[i].norm < array[i + 1].norm)
    ) {
      peaks.push(array[i].norm);
      times.push(array[i].time);
    }
  }
  return {
    peaks,
    times
  };
}

// M i n s    a n d    M a x e s
function Minimum(...args: number[]) {
  var i;
  var min = Infinity;
  for (i = 0; i < args.length; i++) {
    if (args[i] < min) {
      min = args[i];
    }
  }
  return min;
}

function Maximum(...args: number[]) {
  var i;
  var max = -Infinity;
  for (i = 0; i < args.length; i++) {
    if (args[i] > max) {
      max = args[i];
    }
  }
  return max;
}

export function serialization(
  acc: Array<SessionDataRow>,
  gyro: Array<SessionDataRow>
): SessionCharacteristics {
  let calcAccPeaks = peaks(acc);
  let accValue = calcAccPeaks.peaks;
  let accTime = calcAccPeaks.times;
  let accIntegral = integral(acc);

  let calcGyroPeaks = peaks(gyro);
  let gyroValue = calcGyroPeaks.peaks;
  let gyroTime = calcGyroPeaks.times;
  let gyroIntegral = integral(gyro);
  let accAvgInterval = 0;
  let gyroAvgInterval = 0; // average intervals between peaks

  for (let i = 1; i < accTime.length - 1; i++) {
    accAvgInterval += accTime[i] - accTime[i - 1];
  }
  accAvgInterval = accAvgInterval / accTime.length / 1000;

  for (let i = 1; i < gyroTime.length - 1; i++) {
    gyroAvgInterval += gyroTime[i] - gyroTime[i - 1];
    //console.log('gyroAvgInterval iterator #', i);
  }
  gyroAvgInterval = gyroAvgInterval / gyroTime.length / 1000;
  // find min and max peaks

  let gMin = Minimum(...gyroValue);
  let accMin = Minimum(...accValue);
  let gMax = Maximum(...gyroValue);
  let accMax = Maximum(...accValue);

  let avgAccPeaks =
    ((accValue.length - 1) / (acc[acc.length - 1].time - acc[0].time)) * 60000;
  //console.log('avgAccPeaks');
  let avgGyroPeaks =
    ((gyroValue.length - 1) / (gyro[gyro.length - 1].time - gyro[0].time)) *
    60000;
  //console.log('avgGyroPeaks');

  let accIntegralPerSecond =
    accIntegral / (acc[acc.length - 1].time - acc[0].time);

  //console.log('accintegralpersecond');
  let gyroIntegralPerSecond =
    gyroIntegral / (gyro[gyro.length - 1].time - gyro[0].time);
  //console.log('gyrointegralpersecond');

  return new SessionCharacteristics(
    accValue.length, //number of accelerometer peaks
    gyroValue.length, //number of gyroscope peaks
    avgAccPeaks, //average number of accelerometer peaks per minute
    avgGyroPeaks, //average number of gyroscope peaks per minute
    accMin, //minimal peak of accelerometer
    gMin, //minimal peak of gyroscope
    accMax, //maximal peak of accelerometer
    gMax, //aximal peak of gyroscope
    accIntegral, //integral of accelerometer
    gyroIntegral, //integral of gyroscope
    accIntegralPerSecond, //integral of accelerometer per second
    gyroIntegralPerSecond, //integral of gyroscope per second
    accAvgInterval, //average interval between accelerometer peaks
    gyroAvgInterval //average interval between gyroscope peaks
  );
}
