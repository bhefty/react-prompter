import User from '../models/user'

export function showUser(req, res) {
  User.find().exec((err, users) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ users })
  })
}

export function allScripts(req, res) {
  User.find({'userId': req.params.user}, (err, doc) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json(doc[0].scripts)
  })
}
