/// <reference path="../../define.ts"/>

module AOJ {
  export function ALDS1_1_D() {
    const input = require('fs').readFileSync('/dev/stdin', 'utf8'),
          offset = 1,
          count = +input.split('\n', offset)[0],
          data = input.split('\n', offset + count).slice(offset, offset + count);
    const max = data
      .reduce((r, v) => {
        const val = +v,
              diff = val - r.min;
        return {
          min: val < r.min ? val : r.min,
          max: diff > r.max ? diff : r.max
        };
      }, {
        min: Infinity,
        max: -Infinity
      })
      .max;
    console.log(max);
  }
}
