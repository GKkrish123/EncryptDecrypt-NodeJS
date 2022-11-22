'use strict'
var express = require('express')
var bodyParser = require('body-parser')

import crypto from 'crypto'

import DataInterceptor from './DataInterceptor'
import { ENCRYPTION_CONFIG } from './ENCRYPTION_CONFIG'
import { Encrypter } from './encrypter'

const { ENCRYPTION_KEY, ENCRYPTION_ENCODING_SCHEME } = ENCRYPTION_CONFIG

var PORT = process.env.PORT || 8092

const app = new express()

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
// parse application/json
app.use(bodyParser.json())

app.post('/encrypt', function(req, res, next) {
    const data = {}
    const iv = crypto.randomBytes(16).toString(ENCRYPTION_ENCODING_SCHEME)
    const key = ENCRYPTION_KEY
    const encrypter = new Encrypter(key, iv)
    data.payload = iv +':'+ encrypter.encrypt(req.body)
    return res.status(200).json(data)
})

app.post('/decrypt', function(req, res, next) {
  try {
    const { body } = req
    console.log(req)
    const { payload }  = body
    const apiResponse = { payload }
    const resBody = new DataInterceptor().decryptPayload(apiResponse)
    const responseBody = { statusCode: 200, message: 'OK', data: resBody }
    res.send(responseBody)
  } catch (error) {
    console.log(error)
  }
})

app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => console.log('Server is running at PORT: ' + PORT))