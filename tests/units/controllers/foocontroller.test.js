const { show_all } = require('../../../api/controllers/foocontroller');
const sinon = require("sinon");

describe("Test foocontroller.js", () => {
    describe("show_all", () => {
        it("should be successfully", () => {
            const req = sinon.stub();
            const res = sinon.stub();
            res.send = sinon.spy();
            show_all(req, res)
            sinon.assert.calledWith(res.send, { message: "ok" })
        })
    })
})

