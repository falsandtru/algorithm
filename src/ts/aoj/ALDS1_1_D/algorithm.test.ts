/// <reference path="../../define.test.ts"/>
/// <reference path="algorithm.ts"/>
require('should');

module AOJ {
  describe('AOJ ALDS1_1_D', () => {
    it('case1', done => {
      TEST.std('src/ts/aoj/ALDS1_1_D/input1.txt', AOJ.ALDS1_1_D, outputs => {
        outputs.join('').should.equal(3 + '\n');
        done();
      });
    });
    it('case2', done => {
      TEST.std('src/ts/aoj/ALDS1_1_D/input2.txt', AOJ.ALDS1_1_D, outputs => {
        outputs.join('').should.equal(-1 + '\n');
        done();
      });
    });
    it('case3', done => {
      TEST.std('src/ts/aoj/ALDS1_1_D/input3.txt', AOJ.ALDS1_1_D, outputs => {
        outputs.join('').should.equal(3 + '\n');
        done();
      });
    });
    it('case4', done => {
      TEST.std('src/ts/aoj/ALDS1_1_D/input4.txt', AOJ.ALDS1_1_D, outputs => {
        outputs.join('').should.equal(1 + '\n');
        done();
      });
    });
  });
}
