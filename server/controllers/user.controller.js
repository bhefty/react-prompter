import User from '../models/user'

export function showUser(req, res) {
  User.find().exec((err, users) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ users })
  })
}
