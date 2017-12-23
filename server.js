// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
   res.send({todos:todos.filter(function(thing){return thing.task === req.query.q;})});
});

app.get('/api/todos', function index(req, res) {
  res.send({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  if(req.body.task && req.body.description){
    var newTodo = {
      _id: todos[todos.length-1]._id+1,
      task: req.body.task,
      description: req.body.description
    };
    todos.push(newTodo);
    res.send(newTodo);
  }
});

app.get('/api/todos/:id', function show(req, res) {
    res.send(todos.find(function(todos){return todos._id === Number(req.params.id);}));
  });


app.put('/api/todos/:id', function update(req, res) {
   let thisTodo = todos.find(function(todos){return todos._id === Number(req.params.id);});
   if(req.body.task) thisTodo.task = req.body.task;
   if(req.body.description) thisTodo.description = req.body.description;
   res.send(thisTodo);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  let thisTodo = todos.find(function(todos){return todos._id === Number(req.params.id);});
  res.send(thisTodo);
  todos.splice(todos.indexOf(thisTodo),1);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
