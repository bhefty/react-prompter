const exec = require('mz/child_process').exec
const request = require('supertest-as-promised')
const expect = require('chai').expect

const app = require('../../server/app')

describe('express serving', () => {
  it('responds to / with the index.html', () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .then(res => expect(res.text).to.contain('<div id="root"></div>'))
  })
  
  it('responds to favicon.icon request', () => {
    return request(app)
      .get('/favicon.ico')
      .expect('Content-Type', 'image/x-icon')
      .expect(200)
  })

  it('responds to any route with the index.html', () => {
    return request(app)
      .get('/foo/bar')
      .expect('Content-Type', /html/)
      .expect(200)
      then(res => expect(res.text).to.contain('div id="root"></div>'))
  })
})
