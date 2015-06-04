/// <reference path="../../define.test.ts"/>
/// <reference path="algorithm.ts"/>
require('should');

module AOJ {
  describe('AOJ TP1_1_A', () => {
    it('test', done => {
      TEST.write(AOJ.ITP1_1_A, outputs => {
        outputs.join('').should.equal('Hello World\n');
        done();
      });
    });
  });
}
