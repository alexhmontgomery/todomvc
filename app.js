const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Todo = require('./models/Todo')

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/todomvc')

app.use('/static', express.static('static'))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/index.html')
})

// put routes here
app.get('/api/todos/', function (req, res) {
  Todo.find()
  .sort('order')
  .then(function (todos) {
    res.json(todos)
  })
  .catch(function (error) {
    res.status(422).json(error)
  })
})

app.get('/api/todos/:id', function (req, res) {
  Todo.findOne({
    '_id': req.params.id
  })
  .then(function (todo) {
    res.json(todo)
  })
  .catch(function (error) {
    res.status(422).json(error)
  })
})

app.post('/api/todos', function (req, res) {
  if (req.body._id) {
    Todo.findOne({
      '_id': req.body._id
    })
    .then(function (todo) {
      todo.title = req.body.title
      todo.order = req.body.order
      todo.completed = req.body.completed
      todo.save()
      .then(function (todo) {
        console.log('Updated task:' + todo)
        res.json(todo)
      })
      .catch(function (error) {
        res.status(404).json(error)
      })
    })
  } else {
    let todo = new Todo()
    todo.title = req.body.title
    todo.order = req.body.order
    todo.completed = req.body.completed
    todo.save()
    .then(function (todos) {
      console.log('New task: ' + todos)
      res.json(todos)
    })
    .catch(function (error) {
      res.status(422).json(error)
    })
  }
})

app.put('/api/todos/:id', function (req, res) {
  Todo.findOne({
    '_id': req.params.id
  })
  .then(function (todo) {
    todo.title = req.body.title
    todo.order = req.body.order
    todo.completed = req.body.completed
    todo.save()
    .then(function (todo) {
      console.log('Updated task:' + todo)
      res.json(todo)
    })
    .catch(function (error) {
      res.status(404).json(error)
    })
  })
})

app.patch('/api/todos/:id', function (req, res) {
  Todo.findOne({
    '_id': req.params.id
  })
  .then(function (todo) {
    todo.title = req.body.title
    todo.order = req.body.order
    todo.completed = req.body.completed
    todo.save()
    .then(function (todo) {
      console.log('Updated task:' + todo)
      res.json(todo)
    })
    .catch(function (error) {
      res.status(404).json(error)
    })
  })
})

app.delete('/api/todos/:id', function (req, res) {
  Todo.deleteOne({
    '_id': req.params.id
  })
  .then(function (todo) {
    res.json(todo)
  })
  .catch(function (error) {
    res.status(422).json(error)
  })
})

app.listen(3000, function () {
  console.log('Express running on http://localhost:3000/.')
})
