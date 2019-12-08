const fs = require('fs');
let input = fs.readFileSync('./input.txt').toString();
input = input.split('\n');

const printPathArray = (strInstruction, lastPosition) => {
  let posX = lastPosition[0];
  let posY = lastPosition[1];

  const direction = strInstruction[0].toString();
  const cableLength = Number(strInstruction.replace(direction, ''));
  let result = [];

  for (let index = 0; index < cableLength; index++) {
    if (direction === 'U') {
      posY += 1;
    } else if (direction === 'D') {
      posY -= 1;
    } else if (direction === 'L') {
      posX -= 1;
    } else if (direction === 'R') {
      posX += 1;
    } else {
      //does nothing
    }

    result.push([posX, posY]);
  }

  return result;
};

const returnArrayPositionsCable = arrayPathCable => {
  let result = [[0, 0]];

  for (const strInstruction of arrayPathCable) {
    const lastPosition = result[result.length - 1];
    result = result.concat(printPathArray(strInstruction, lastPosition));
  }

  return result;
};

const intersectionArrays = (array1, array2) => {
  const setOfArray2 = new Set();

  for (const element of array2) {
    setOfArray2.add(element.toString());
  }

  return array1.filter(element => setOfArray2.has(element.toString()));
};

const minManhattanDistance = array => {
  const arrayPathCable1 = array[0].split(',');
  const arrayPathCable2 = array[1].split(',');
  const positionsCable1 = returnArrayPositionsCable(arrayPathCable1);
  const positionsCable2 = returnArrayPositionsCable(arrayPathCable2);

  const arrayIntersectionCables = intersectionArrays(
    positionsCable1,
    positionsCable2
  );
  arrayIntersectionCables.shift();

  let arrayDistances = arrayIntersectionCables.map(position => {
    return Math.abs(position[0]) + Math.abs(position[1]);
  });

  arrayDistances = arrayDistances.sort((a, b) => a - b);
  return arrayDistances[0];
};

console.time('part1');
console.log(minManhattanDistance(input));
console.timeEnd('part1');

//part2
const minLengthWiresForIntersection = array => {
  const arrayPathCable1 = array[0].split(',');
  const arrayPathCable2 = array[1].split(',');

  const positionsCable1 = returnArrayPositionsCable(arrayPathCable1);
  const positionsCable2 = returnArrayPositionsCable(arrayPathCable2);
  const strPositionsCable1 = positionsCable1.map(position =>
    JSON.stringify(position)
  );
  const strPositionsCable2 = positionsCable2.map(position =>
    JSON.stringify(position)
  );

  const arrayIntersectionCables = intersectionArrays(
    positionsCable1,
    positionsCable2
  );
  arrayIntersectionCables.shift();

  let arrayLengthWiresIntersections = arrayIntersectionCables.map(
    intersection => {
      return (
        strPositionsCable1.indexOf(JSON.stringify(intersection)) +
        strPositionsCable2.indexOf(JSON.stringify(intersection))
      );
    }
  );

  arrayLengthWiresIntersections = arrayLengthWiresIntersections.sort(
    (a, b) => a - b
  );
  return arrayLengthWiresIntersections[0];
};


console.time('part2');
console.log(minLengthWiresForIntersection(input));
console.timeEnd('part2');
