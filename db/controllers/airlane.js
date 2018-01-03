const models = require("../models");

//methods to connect to mongo db
module.exports = {
  findAll: function(req, res) {
    models.airlane
      .find(console.log(res))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    models.airlane
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    models.airlane
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  update: function(req, res) {
    models.airlane
      .findOneAndUpdate({ _id: req.params.id }, dbModel)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    models.airlane
      .findById({ _id: req.params.id })
      .then(function(dbModel) {
        dbModel.remove();
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
