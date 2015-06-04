/// <reference path="../../define.test.ts"/>
/// <reference path="algorithm.ts"/>
require('should');

module AOJ {
  describe('AOJ ALDS1_2_A', () => {
    it('sample1', done => {
      TEST.std('src/ts/aoj/ALDS1_2_A/sample_input1.txt', AOJ.ALDS1_2_A, outputs => {
        outputs.join('').should.equal(require('fs').readFileSync('src/ts/aoj/ALDS1_2_A/sample_output1.txt', 'utf8'));
        done();
      });
    });
    it('sample2', done => {
      TEST.std('src/ts/aoj/ALDS1_2_A/sample_input2.txt', AOJ.ALDS1_2_A, outputs => {
        outputs.join('').should.equal(require('fs').readFileSync('src/ts/aoj/ALDS1_2_A/sample_output2.txt', 'utf8'));
        done();
      });
    });
  });
}
