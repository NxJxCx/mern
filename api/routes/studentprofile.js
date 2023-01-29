var express = require('express');
var router = express.Router();
var StudentProfileModel = require('../model/model');


/* GET request on student profile data
 * (Retrieve student profile data from database)
 */
router.get('/', function(req, res, next) {
  if (req.query.id) { // if the get request query data passed in the url has id ex. http://localhost:4000/?id=id123456&name=student%20name
    // retrieve one (1) record
    StudentProfileModel.findById(req.query.id)
    .then(data => {
        if (!data) {
          res.status(400).send({error: 'Error: Failed to retrieve student profile'});
        } else {
          res.status(200).send(data);
        }
      })
    .catch(err => {
      console.log(err);
      res.status(400).send({error: 'Error: Failed to retrieve student profile'});
    });
  } else { // if no id passed in the url
    // retrieve all records
    StudentProfileModel.find()
    .then(data => {
      if (!data) {
        res.status(400).send({error: 'No Records Found'});
      } else {
        res.status(200).send(data);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({error: 'Error: Failed to retrieve student profile'});
    });
  }
});

/* POST request on student profile data
 * (Create student profile data to save in database)
 */
router.post('/', (req, res, next) => {
  if (!req.body) {
    console.log('Post body content must not be empty!');
    return res.status(400).send({error: 'Post body content must not be empty!'});
  }
  StudentProfileModel.create(req.body)
    .then(data => {
      if (!data) {
        res.status(400).send({error: 'Error: Failed to add student profile'});
      } else {
        res.status(200).send(data);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({error: 'Error: Failed to add student profile'});
    });
});

/* PUT request on student profile data
 * (Update student profile data from database)
 */
router.put('/:id', (req, res, next) => {
  if (!req.body) {
    console.log('PUT request data content must not be empty!');
    return res.status(400).send({error: 'PUT data content must not be empty!'});
  }
  if (!req.params.id) {
    console.log('PUT request ID is not provided');
    return res.status(400).send({error: 'Error: PUT request ID is not provided'});
  }
  StudentProfileModel.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(data => {
      if (!data) {
        res.status(400).send({error: `Error: Failed to update student profile id ${req.params.id} from database`});
      } else {
        res.status(200).send(Object.assign(Object.assign({}, data), req.body));
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({error: `Error: Failed to update student profile id ${req.params.id} from database`});
    });
});

/* DELETE request on student profile data
 * (Delete student profile data from database)
 */
router.delete('/:id', (req, res, next) => {
  if (!req.params.id) {
    console.log('DELETE request ID is not provided');
    return res.status(400).send({error: 'Error: DELETE request ID is not provided'});
  }
  StudentProfileModel.findByIdAndRemove(req.params.id)
  .then(data => {
    if (!data) {
      res.status(400).send({error: `Error: Failed to delete student profile id ${req.params.id} from database`});
    } else {
      res.status(200).send(data);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(400).send({error: `Error: Failed to delete student profile id ${req.params.id} from database`});
  });
});

module.exports = router;
