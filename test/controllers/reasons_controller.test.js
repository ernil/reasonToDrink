var app, compound
, request = require('supertest')
, sinon   = require('sinon');

function ReasonStub () {
    return {
        title: '',
        content: ''
    };
}

describe('ReasonController', function() {
    beforeEach(function(done) {
        app = getApp();
        compound = app.compound;
        compound.on('ready', function() {
            done();
        });
    });

    /*
     * GET /reasons/new
     * Should render reasons/new.ejs
     */
    it('should render "new" template on GET /reasons/new', function (done) {
        request(app)
        .get('/reasons/new')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/reasons\/new\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /reasons
     * Should render reasons/index.ejs
     */
    it('should render "index" template on GET /reasons', function (done) {
        request(app)
        .get('/reasons')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/reasons\/index\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /reasons/:id/edit
     * Should access Reason#find and render reasons/edit.ejs
     */
    it('should access Reason#find and render "edit" template on GET /reasons/:id/edit', function (done) {
        var Reason = app.models.Reason;

        // Mock Reason#find
        Reason.find = sinon.spy(function (id, callback) {
            callback(null, new Reason);
        });

        request(app)
        .get('/reasons/42/edit')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Reason.find.calledWith('42').should.be.true;
            app.didRender(/reasons\/edit\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * GET /reasons/:id
     * Should render reasons/index.ejs
     */
    it('should access Reason#find and render "show" template on GET /reasons/:id', function (done) {
        var Reason = app.models.Reason;

        // Mock Reason#find
        Reason.find = sinon.spy(function (id, callback) {
            callback(null, new Reason);
        });

        request(app)
        .get('/reasons/42')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Reason.find.calledWith('42').should.be.true;
            app.didRender(/reasons\/show\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * POST /reasons
     * Should access Reason#create when Reason is valid
     */
    it('should access Reason#create on POST /reasons with a valid Reason', function (done) {
        var Reason = app.models.Reason
        , reason = new ReasonStub;

        // Mock Reason#create
        Reason.create = sinon.spy(function (data, callback) {
            callback(null, reason);
        });

        request(app)
        .post('/reasons')
        .send({ "Reason": reason })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            Reason.create.calledWith(reason).should.be.true;

            done();
        });
    });

    /*
     * POST /reasons
     * Should fail when Reason is invalid
     */
    it('should fail on POST /reasons when Reason#create returns an error', function (done) {
        var Reason = app.models.Reason
        , reason = new ReasonStub;

        // Mock Reason#create
        Reason.create = sinon.spy(function (data, callback) {
            callback(new Error, reason);
        });

        request(app)
        .post('/reasons')
        .send({ "Reason": reason })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Reason.create.calledWith(reason).should.be.true;

            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * PUT /reasons/:id
     * Should redirect back to /reasons when Reason is valid
     */
    it('should redirect on PUT /reasons/:id with a valid Reason', function (done) {
        var Reason = app.models.Reason
        , reason = new ReasonStub;

        Reason.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(null) }
            });
        });

        request(app)
        .put('/reasons/1')
        .send({ "Reason": reason })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            res.header['location'].should.include('/reasons/1');

            app.didFlash('error').should.be.false;

            done();
        });
    });

    /*
     * PUT /reasons/:id
     * Should not redirect when Reason is invalid
     */
    it('should fail / not redirect on PUT /reasons/:id with an invalid Reason', function (done) {
        var Reason = app.models.Reason
        , reason = new ReasonStub;

        Reason.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(new Error) }
            });
        });

        request(app)
        .put('/reasons/1')
        .send({ "Reason": reason })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * DELETE /reasons/:id
     * -- TODO: IMPLEMENT --
     */
    it('should delete a Reason on DELETE /reasons/:id');

    /*
     * DELETE /reasons/:id
     * -- TODO: IMPLEMENT FAILURE --
     */
    it('should not delete a Reason on DELETE /reasons/:id if it fails');
});
