/// <reference path="../../define.ts"/>

module AOJ {
  export function ALDS1_2_A() {
    const input = require('fs').readFileSync('/dev/stdin', 'utf8') + '',
      offset = 1,
      rowcnt = 1,
      colcnt = +input.split('\n', offset)[0],
      data = input.split('\n', offset + rowcnt).slice(offset, offset + rowcnt)[0].split(' ', colcnt),
      log = [];
    var count = 0;

    const sorted = bubbleSort(data);

    //console.log(log.map(v => v.join(' ')).join('\n'));
    console.log(sorted.join(' '));
    console.log(count);

    function bubbleSort(array: string[]): string[] {
      for (let i = 0; i < array.length; i++) {
        for (let j = array.length - 2; j >= i; j--) {
          if (+array[j] > +array[j + 1]) {
            swap(array, j, j + 1);
            ++count;
            log.push(array.slice());
          }
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
