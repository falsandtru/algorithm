/// <reference path="../../define.ts"/>

module AOJ {
  export function ALDS1_3_A() {
    const input = require('fs').readFileSync('/dev/stdin', 'utf8') + '',
      offset = 0,
      rowcnt = 1,
      colcnt = offset > 0 ? +input.split('\n', offset)[0] : -1,
      data = input.split('\n', offset + rowcnt).slice(offset, offset + rowcnt + 1).map(v => v.split(' ', colcnt));

    console.log(parse(data[0]));

    function parse(sims: string[]): string {
      return sims.reduce((r, v) => isOpr(v) ? pickStack(push(r, v)) : cal(r, v), <typeof sims>[])[0] || '0';

      function isOpr(str: string): boolean {
        return !isNaN(+str);
      }
    }
    function cal(oprs: string[], expr: string): string[] {
      if (isEmpty(oprs)) { return []; }
      var opr2 = +pickData(pop(oprs));
      oprs = pickStack(pop(oprs));
      var opr1 = +pickData(pop(oprs));
      oprs = pickStack(pop(oprs));
      switch (expr) {
        case '+':
          return pickStack(push(oprs, opr1 + opr2 + ''));
        case '-':
          return pickStack(push(oprs, opr1 - opr2 + ''));
        case '*':
          return pickStack(push(oprs, opr1 * opr2 + ''));
      }
    }
    function pickStack<T>(result: [T[]]|[T[], T]): T[] {
      return result[0];
    }
    function pickData<T>(result: [T[], T]): T {
      return result[1];
    }
    function push<T>(stack: T[], data: T): [T[]] {
      return [[data].concat(stack)];
    }
    function pop<T>(stack: T[]): [T[], T] {
      return [stack.slice(1), stack[0]];
    }
    function isEmpty(stack: any[]): boolean {
      return stack.length === 0;
    }
    /*
    function isFull(stack: any[]): boolean {
      return stack.length > 100;
    }
    */
  }
}
