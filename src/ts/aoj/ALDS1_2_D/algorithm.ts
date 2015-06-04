/// <reference path="../../define.ts"/>

module AOJ {
  export function ALDS1_2_D() {
    const input = require('fs').readFileSync('/dev/stdin', 'utf8') + '',
      offset = 1,
      rowcnt = +input.split('\n', offset)[0],
      data = input.split('\n', offset + rowcnt + 1).slice(offset, offset + rowcnt);
    var m: number,
        G: number[],
        cnt: number;

    const sorted = shellSort(data);

    console.log(m);
    console.log(G.join(' '));
    console.log(cnt);
    console.log(sorted.join('\n'));

    function shellSort(array: string[], n: number = array.length) {
      G = [];
      cnt = 0;
      for (let i = 0; i < n && g(i + 1) <= n; i++) {
        G.unshift(g(i + 1));
      }
      m = G.length;
      return G.reduce((r, g) => insertionSort(r, r.length, g), array);

      function g(i: number) {
        return (Math.pow(3, i) - 1) / 2;
      }
    }
    function insertionSort(array: string[], n: number = array.length, g: number = 1): string[] {
      for (let i = g; i < n; i++) {
        const val = array[i];
        let j = i - g;
        while (j >= 0 && +array[j] > +val) {
          array[j + g] = array[j];
          j -= g;
          ++cnt;
        }
        array[j + g] = val;
      }
      return array;
    }
  }
}
