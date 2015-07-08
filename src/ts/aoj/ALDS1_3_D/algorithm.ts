/// <reference path="../../define.ts"/>

module AOJ {
  interface Queue<T> extends Array<T> {
    head: number;
    tail: number;
  }
  export function ALDS1_3_D() {
    const input = require('fs').readFileSync('/dev/stdin', 'utf8') + '',
          offset = 0,
          //meta = input.split('\n', offset)[0],
          rowcnt = 1,
          colcnt = -1,
          data = input.split('\n', offset + rowcnt + 1).slice(offset, offset + rowcnt).map(v => v.split('', colcnt));

    const result = analyze(data[0]);

    console.log(result.reduce((a, b) => a + b, 0));
    console.log([result.length, result.join(' ')].join(' ').trim());

    function analyze(data: string[]) {
      return data
        .reduce((r, v, x) => {
          switch (v) {
            case '\\':
              r.xs.unshift(x);
              return {
                areas: r.areas,
                xs: r.xs
              };
            case '_':
              return r;
            case '/':
              if (r.xs.length === 0) { return r; }
              return {
                areas: merge(r.areas, layer(r.xs.shift(), x)),
                xs: r.xs
              };
          }
        }, {
          areas: <{ size: number; pos: number; }[]>[],
          xs: <number[]>[]
        })
        .areas
        .map(v => v.size);

      function layer(x1: number, x2: number) {
        const top = x2 + 1 - x1,
              bottom = x2 - x1 - 1,
              height = 1,
              size = (top + bottom) * height / 2;
        return {
          size: size,
          pos: x1
        };
      }
      function merge(areas: { size: number; pos: number; }[], layer: { size: number; pos: number; }) {
        var size = layer.size;
        while (areas.length > 0) {
          const prev = areas.pop();
          if (prev.pos < layer.pos) {
            areas.push(prev);
            break;
          }
          size += prev.size;
        }
        return areas.concat([{
          size: size,
          pos: layer.pos
        }]);
      }
    }
  }
}
