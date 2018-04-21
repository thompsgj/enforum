var express = require('express');
var router = express.Router();

var ctrlForums = require('../controllers/forums');


/* TO DO LIST
Posting- CRUD
- make a new Post
- edit a Post
- retrieve a Post (post + replies)
- retrieve a list of posts
- delete a Post
- grade a Post
- revise the grade of a Post


Replying- CRUD
create
retrieve
update
delete
*/
console.log("API INDEX")

//Posts
router.post('/post/create', ctrlForums.createPost);

//Forums
router.post('/forum', ctrlForums.createForum); //Create a Post
router.get('/forum/list', ctrlForums.viewForumList); //View List of Forums
router.get('/forums/:forumid', ctrlForums.viewReadOne); //View One Forum's Posts
router.post('/forum/delete', ctrlForums.deleteForum); //Delete a Forum
router.put('/forum/update/:forumid', ctrlForums.updateForum);//Update a Forum's Settings



module.exports = router;