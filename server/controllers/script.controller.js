import Script from '../models/script'

export function getScripts(req, res) {
  Script.find().exec((err, scripts) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ scripts })
  })
}
