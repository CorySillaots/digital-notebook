const router = require('express').Router();
let { notes } = require('../../db/db');
const fs = require ('fs');


router.get('/notes', (req, res) => {
    let results = notes;
    res.send(results);
});

router.post('/notes', (req, res) => {
    const note = req.body;
    notes.push(note);
    const data = JSON.stringify({"notes":notes});

    fs.writeFile('./db/db.json', data, err => {
        if (err) {
          console.error(err);
          res.status(500).send("whoops");
        } else {
          res.status(200).send('success'); 
        }
     });
});

router.delete('/notes/:id', (req, res) => {
 const data = notes.filter(note => note.title !== req.params.id);
 notes = data;
 const newData = JSON.stringify({"notes":data});
 fs.writeFile('./db/db.json', newData, err => {
    if (err) {
      console.error(err);
      res.status(500).send("whoops");
    } else {
      res.status(200).send('success'); 
    }
 });
});



module.exports = router;