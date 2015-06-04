/// <reference path="../../define.ts"/>

module AOJ {
  export function ALDS1_2_B() {
    const input = require('fs').readFileSync('/dev/stdin', 'utf8') + '',
      offset = 1,
      rowcnt = 1,
      colcnt = +input.split('\n', offset)[0],
      data = input.split('\n', offset + rowcnt).slice(offset, offset + rowcnt)[0].split(' ', colcnt),
      log = [];
    var count = 0;

    const sorted = selectionSort(data);

    //console.log(log.map(v => v.join(' ')).join('\n'));
    console.log(sorted.join(' '));
    console.log(count);

    function selectionSort(array: string[]): string[] {
      for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
          if (+array[j] < +array[min]) {
            min = j;
          }
        }
        if (i < min) {
          swap(array, i, min);
          ++count;
          log.push(array.slice());
        }
      }
      return array;

      function swap(array: string[], i: number, j: number) {
        const val = array[i];
        array[i] = array[j];
        array[j] = val;
        return array;
      }
    }
  }
}
