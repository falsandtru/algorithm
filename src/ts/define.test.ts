/// <reference path="define.ts"/>
/// <reference path=".d/mocha.d.ts"/>
/// <reference path=".d/should.d.ts"/>

module TEST {
  //const stdin = process.stdin;
  const stdout = process.stdout;

  module MEASURE {
    var time: number,
        memory: number;
    export function begin() {
      //global.gc();
      time = Date.now();
      memory = process.memoryUsage().rss;
      capture_begin();
    }
    export function end(callback: (data: string[]) => any) {
      process.nextTick(() => capture_end(callback));
      //console.log(Date.now() - time + 'ms', (process.memoryUsage().rss - memory) / 1024 + 'KB');
    }

    const write = stdout.write;
    var outputs = [];
    function capture_begin() {
      outputs = [];
      stdout.write = function (data) {
        outputs.push(data);
        return true;
      };
    }
    function capture_end(callback: (data: string[]) => any) {
      stdout.write = write;
      callback(outputs);
    }
  }

  export function write(logic: () => void, test: (outputs: string[]) => void) {
    MEASURE.begin();
    logic();
    MEASURE.end(test);
    return;
  }

  export function std(input: string, logic: () => void, test: (outputs: string[]) => void) {
    redirect_readFileSync();
    MEASURE.begin();
    logic();
    MEASURE.end(test);
    return;

    function redirect_readFileSync() {
      const read = require('fs').readFileSync;

      require('fs').readFileSync = function (path, ops) {
        if (path === '/dev/stdin' && ops === 'utf8') {
          require('fs').readFileSync = read;
          return require('fs').readFileSync(input, 'utf8');
        }
        return read.apply(require('fs'), arguments);
      };
    }
  }
}

describe('TEST', () => {
  it('write', done => {
    const input = 'test\n';
    TEST.write(proc, test);
    return;

    function proc() {
      process.stdout.write(input);
    }
    function test(outputs: string[]) {
      outputs.join('').should.equal(input);
      done();
    }
  });

  it('std', done => {
    const input = 'src/ts/input.txt';
    TEST.std(input, proc, test);
    return;

    function proc() {
      const input = require('fs').readFileSync('/dev/stdin', 'utf8');
      process.stdout.write(input);
    }
    function test(outputs: string[]) {
      outputs.join('').should.containEql('algorithm');
      done();
    }
  });
});
