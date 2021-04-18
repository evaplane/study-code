'use strict'
const Controller = require('egg').Controller
const svgCaptcha = require('svg-captcha')
class UtilController extends Controller {
  async captcha() {
    const captcha = svgCaptcha.create(
      {
        size: 4,
        fontSize: 50,
        width: 100,
        height: 40,
        noise: 3,
      }
    )
    // 存入session
    this.ctx.session.captcha = captcha.text
    this.ctx.response.type = 'image/svg+xml'
    this.ctx.body = captcha.data
  }
}

module.exports = UtilController
