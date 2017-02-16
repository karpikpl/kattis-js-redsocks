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

        [
            {
                input: [
                    '1 2', '6 8', '12 2499550020', '56 789', '0 0'
                ],
                result: ['3 1', '7 1', '4 49992', 'impossible']
            }
        ].forEach((testCase) => {

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

        [
            {
                input: [
                    '228145920 1011271800', '0 0'
                ],
                result: ['5377 5943']
            }
        ].forEach((testCase) => {

            it('should solve for ' + testCase.input, function() {

                // Arrange
                const input = testCase.input;

                // Act
                const result = testSolution(input);

                // Assert
                assert.deepEqual(result, testCase.result);
            });

        })

        it.skip('should solve for random data', function() {

            this.timeout(15000);

            for (let i = 0; i < 10000; i++) {
                // Arrange
                let red = Math.floor(Math.random() * (50000 - 2) + 2);
                let black = Math.floor(Math.random() * (50000 - red));
                const p = red * (red - 1);
                const q = (red + black) * (red + black - 1);

                if (black === 0) {
                    red = 2;
                }

                console.log(`p:${p} q:${q} red:${red} black:${black}`);

                const input = [`${p} ${q}`, '0 0'];
                const solution = [`${red} ${black}`];

                // Act
                const result = testSolution(input);

                // Assert
                const resultProb = calculateProb(result);
                assert(Math.abs(resultProb - p / q) < 0.000000001, `solution should match for p:${p} q:${q} red:${red} black:${black}`);
            }
        });

        it('should return "impossible" when probability too low', function() {

            // Arrange
            const input = ['2 50000', `2 24758412547`, '0 0'];
            const solution = ['impossible', 'impossible'];

            // Act
            const result = testSolution(input);

            // Assert
            assert.deepEqual(result, solution, `solution should match for ${input}`);
        });

        it('should return result when max integer used', function() {

            // Arrange
            const input = [`2 ${Number.MAX_SAFE_INTEGER}`, `${Number.MAX_SAFE_INTEGER} ${Number.MAX_SAFE_INTEGER}`, `${Number.MAX_SAFE_INTEGER-1} ${Number.MAX_SAFE_INTEGER}`];
            const solution = ['impossible', '2 0', 'impossible'];

            // Act
            const result = testSolution(input);

            // Assert
            assert.deepEqual(result, solution, `solution should match for ${input}`);
        });

        function calculateProb(answer) {
            const array = answer[0].split(' ');
            const red = parseInt(array[0]);
            const black = parseInt(array[1]);

            return (red / (red + black)) * ((red - 1) / (red + black - 1));
        }
    });
});
