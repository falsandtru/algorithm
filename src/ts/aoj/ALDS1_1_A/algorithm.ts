/// <reference path="../../define.ts"/>

module AOJ {
  export function ALDS1_1_A() {
    const input = require('fs').readFileSync('/dev/stdin', 'utf8') + '',
      offset = 1,
      rowcnt = 1,
      colcnt = +input.split('\n', offset)[0],
      data = input.split('\n', offset + rowcnt).slice(offset, offset + rowcnt)[0].split(' ', colcnt),
      log = [];

    insertionSort(data);

    console.log(log.map(v => v.join(' ')).join('\n'));

    function insertionSort(array: string[]): string[] {
      for (let i = 0; i < array.length; i++) {
        const val = array[i];
        let j = i - 1;
        while (j >= 0 && +array[j] > +val) {
          array[j + 1] = array[j];
          --j;
        }
        array[j + 1] = val;
        log.push(array.slice());
      }
      return array;
    }
  }
}
