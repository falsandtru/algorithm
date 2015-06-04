/// <reference path="../../define.ts"/>

module AOJ {
  export function ALDS1_2_C() {
    const input = require('fs').readFileSync('/dev/stdin', 'utf8') + '',
      offset = 1,
      rowcnt = 1,
      colcnt = +input.split('\n', offset)[0],
      data = input.split('\n', offset + rowcnt).slice(offset, offset + rowcnt)[0].split(' ', colcnt);

    const stable = bubbleSort(data.slice()),
          nonstable = selectionSort(data.slice());

    console.log(stable.join(' '));
    console.log('Stable');
    console.log(nonstable.join(' '));
    console.log(stable.join() === nonstable.join() ? 'Stable' : 'Not stable');

    function bubbleSort(array: string[]): string[] {
      for (let i = 0; i < array.length; i++) {
        for (let j = array.length - 2; j >= i; j--) {
          if (+array[j][1] > +array[j + 1][1]) {
            swap(array, j, j + 1);
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
    function selectionSort(array: string[]): string[] {
      for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
          if (+array[j][1] < +array[min][1]) {
            min = j;
          }
        }
        if (i < min) {
          swap(array, i, min);
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
