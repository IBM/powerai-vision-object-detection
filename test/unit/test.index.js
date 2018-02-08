/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
require('jsdom-global')();
const indexjs = require('../../js/index');

describe('test index.js functions', function() {
  it('#addRow()', function(done) {
    const appendChild = sinon.spy();
    const mockTable = {
      appendChild: appendChild,
    };

    indexjs.addRow(mockTable, 'testType', ['a', 'b', 'c']);

    sinon.assert.calledOnce(appendChild);
    done();
  });

  it('#textColor()', function(done) {
    const f = indexjs.textColor;
    expect(f('coca-cola')).to.equal('white');
    expect(f('diet coke')).to.equal('red');
    expect(f('coke zero')).to.equal('white');
    expect(f('how did pepsi get in here')).to.equal('cornsilk');
    done();
  });
});
