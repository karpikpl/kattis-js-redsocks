/*jshint esversion: 6, node: true*/
'use strict';

const Index = require('../index');
const assert = require('assert');

function testSolution(input) {

    const result = [];

    Index.init((ans) => result.push(ans), () => input.shift());
    Index.solution();

    return result;
}

describe('Solution', function() {

    describe('program', function() {

        [{
            input: ['1 2',
                '6 8',
                '12 2499550020',
                '56 789',
                '0 0'
            ],
            result: ['3 1',
                '7 1',
                '4 49992',
                'impossible',
                'impossible'
            ]
        }].forEach((testCase) => {

            it('should solve for ' + testCase.input, function() {

                // Arrange
                const input = testCase.input;

                // Act
                const result = testSolution(input);

                // Assert
                assert.deepEqual(result, testCase.result);
            });

        })
    });

    describe('program', function() {

        [{
            input: [
                '56 789'
            ],
            result: [
                'impossible'
            ]
        }].forEach((testCase) => {

            it('should solve for ' + testCase.input, function() {

                // Arrange
                const input = testCase.input;

                // Act
                const result = testSolution(input);

                // Assert
                assert.deepEqual(result, testCase.result);
            });

        })
    });
});
