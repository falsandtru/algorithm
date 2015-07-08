/// <reference path="../../define.test.ts"/>
/// <reference path="algorithm.ts"/>
require('should');

module AOJ {
  describe('AOJ ALDS1_3_B', () => {
    it('sample1', done => {
      TEST.std('src/ts/aoj/ALDS1_3_B/sample_input1.txt', AOJ.ALDS1_3_B, outputs => {
        outputs.join('').should.equal(require('fs').readFileSync('src/ts/aoj/ALDS1_3_B/sample_output1.txt', 'utf8'));
        done();
      });
    });
  });
}
