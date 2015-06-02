/// <reference path="../../define.test.ts"/>
/// <reference path="algorithm.ts"/>
require('should');

module AOJ {
  describe('AOJ', () => {
    describe('ITP1-1-A', () => {
      it('test', done => {
        TEST.write(AOJ.ITP1_1_A, output => {
          output.should.equal('Hello World\n');
          done();
        });
      });
    });
  });
}
