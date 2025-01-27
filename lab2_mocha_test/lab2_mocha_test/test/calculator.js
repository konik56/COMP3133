import { assert } from 'chai';
import { add, mul, div, sub } from '../app/calculator.js';

describe("add", function() {
    it("adds to numbers", function() {
        assert.equal(add(1, 2), 3);
    });

    it("should fail", function() {
        assert.equal(add(1, 2), 4);
    });
});

describe("subtract", function() {
    it("subtracts a number from another", function() {
        assert.equal(sub(4, 3), 1);
    });

    it("should fail", function() {
        assert.equal(sub(4, 3), 10);
    });
})

describe("div", function() {
    it("divides a number from another", function() {
        assert.equal(div(10,5), 2);
    });

    it("should fail", function() {
        assert.equal(div(10,5), 1);
    });
})

describe("mul", function() {
    it("multiplies two numbers", function() {
        assert.equal(mul(10, 8), 80);
    });

    it("should fail", function() {
        assert.equal(mul(10, 8), 30);
    })
})