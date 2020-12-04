const RequestModel = require('../models/requestModel');

exports.sendRequest = (req, res) => {
    const requestModel = new RequestModel(req.body);
    requestModel.save((err, data) => {
        if (err) return res.json({ error: err })
        res.json({ msg: "Request success" })
    })
}



exports.allRequest = (req, res) => {
    RequestModel.find({})
        .populate('book')
        .exec((err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        })
}