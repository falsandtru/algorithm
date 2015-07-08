/// <reference path="../../define.test.ts"/>
/// <reference path="algorithm.ts"/>
require('should');

module AOJ {
  describe('AOJ ALDS1_3_C', () => {
    it('sample1', done => {
      TEST.std('src/ts/aoj/ALDS1_3_C/sample_input1.txt', AOJ.ALDS1_3_C, outputs => {
        outputs.join('').should.equal(require('fs').readFileSync('src/ts/aoj/ALDS1_3_C/sample_output1.txt', 'utf8'));
        done();
      });
    });
    it('sample2', done => {
      TEST.std('src/ts/aoj/ALDS1_3_C/sample_input2.txt', AOJ.ALDS1_3_C, outputs => {
        outputs.join('').should.equal(require('fs').readFileSync('src/ts/aoj/ALDS1_3_C/sample_output2.txt', 'utf8'));
        done();
      });
    });
    it('case2', done => {
      TEST.std('src/ts/aoj/ALDS1_3_C/input2.txt', AOJ.ALDS1_3_C, outputs => {
        outputs.join('').should.equal(require('fs').readFileSync('src/ts/aoj/ALDS1_3_C/output2.txt', 'utf8'));
        done();
      });
    });
  });
}
