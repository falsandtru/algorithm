/// <reference path="define.ts"/>
/// <reference path=".d/mocha.d.ts"/>
/// <reference path=".d/should.d.ts"/>

module TEST {
  const stdin = process.stdin;
  const stdout = process.stdout;

  export function write(logic: () => void, test: (output: string) => void) {
    capture_stdout(test);
    logic();
    return;

    function capture_stdout(callback: (data: string) => any) {
      const write = stdout.write.bind(stdout);

      stdout.write = function (data) {
        stdout.write = write;
        callback(data);
        return true;
      };
    }
  }

  export function std(input: string, logic: () => void, test: (output: string) => void) {
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.once('data', () => {
      stdin.once('data', test);
    });
    redirect_stdout();
    logic();
    stdin.emit('data', input);
    return;

    function redirect_stdout() {
      const write = stdout.write;

      stdout.write = function (data) {
        stdout.write = write;
        stdin.emit('data', data);
        return true;
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
    function test(output: string) {
      output.should.equal(input);
      done();
    }
  });

  it('std', done => {
    const input = 'algorithm\n';
    TEST.std(input, proc, test);
    return;

    function proc() {
      process.stdin.once('data', (input: string) => {
        process.stdout.write(input + input);
      });
    }
    function test(output: string) {
      output.should.containEql(input + input);
      done();
    }
  });
});
