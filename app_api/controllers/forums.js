var monk = require('monk');
var assert = require('assert');
var asynch = require('asynch');
var db = monk('localhost:27017/enforum');
var forumcoll = db.get('forumcollection');


var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};
/*
module.exports.createForum = function(req,res) {
	var data = req.params.data
	doCreateForum(req, res)
}
*/

module.exports.createForum = function(req, res) {
	console.log("API CREATE FORUM")
	forumcoll.insert({
		settings: {
			name: req.body.name ,
			description: req.body.description ,
			/*
			dateRestrictions: {
				dateOpen: req.body. ,
				dateClosed: req.body. 
			},
			*/
			gradingMethod: req.body.gradingMethod ,
			points: req.body.points ,
			peereval: req.body.peereval ,
			reflection: req.body.reflection 
		}
	}).then(function(doc, err) {
		if(err) {
			res.send("Problem");
		} else {
			console.log("API CREATE FORUM SUCCESS DOC", doc)
			sendJsonResponse(res, 201, doc);
		}
	})
}


module.exports.viewForumList = function(req, res) {
	console.log("API VIEW FORUM LIST")
	forumcoll.find({

	}).then(function(doc, err){
		console.log("FORUMLIST RESPONSE", doc)
		if(err) {
			res.send("Problem");
		} else {
			sendJsonResponse(res, 201, doc);
		}

	})
}


module.exports.deleteForum = function(req, res) {
	console.log("API DELETE FORUM")
	console.log("DELETE FORUM START")
	console.log("DELETE FORUM REQ DATA", req.body.id)
	forumcoll.remove({
		_id: req.body.id
	}).then(function(doc, err) {
		console.log("DELETE FORUM RESPONSE")
		if(err) {
			res.send("Problem");
		} else {
			sendJsonResponse(res, 201, doc);
		}
	})
	console.log("DELETE FORUM END")
}

module.exports.viewReadOne = function(req, res) {
	console.log("API VIEW ONE FORUM")
	console.log("VIEW ONE FORUM API START", req.params)
	forumcoll.find({
		_id: req.params.forumid
	}).then(function(doc, err) {
		if(err){
			res.send("Problem");
		} else {
			console.log("API VIEW READ ONE SUCCESS", doc)
			sendJsonResponse(res, 201, doc);
		}
	})
	console.log("VIEW ONE FORUM API END")
}

module.exports.updateForum = function(req, res) {
	console.log("API UPDATE FORUM", req.body)
	forumcoll.update({_id: req.body.forumid},{
		$set:{
			settings: {
				name: req.body.name ,
				description: req.body.description ,
				/*
				dateRestrictions: {
					dateOpen: req.body. ,
					dateClosed: req.body. 
				},
				*/
				gradingMethod: req.body.gradingMethod ,
				points: req.body.points ,
				peereval: req.body.peereval ,
				reflection: req.body.reflection 
			}
		}

	}).then(function(doc, err) {
		if(err) {
			res.send("Problem");
		} else {
			console.log("API UPDATE FORUM SUCCESS DOC", doc)
			sendJsonResponse(res, 201, doc);
		}
	})
}


/*
	TO ADD
	- set the forum ID
	- poster: "USER1"
	- dates
	   * start date for writing postPLACEHOLDER
	   * end date for writing postDONE
	- reflection
	   * checklist
	   * student summary
	   * teacher feedback
*/
module.exports.createPost = function(req, res) {
	console.log("API CREATE POST", req.body)
	//GOOD RESOURCE FOR OBJECTID: https://stackoverflow.com/questions/35050750/mongodb-creating-an-objectid-for-each-new-child-added-to-the-array-field?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
	//can't put 'var' in front of this variable
	ObjectID = require('mongodb').ObjectID;
	uploadData = {
			posts: {
				_id: new ObjectID(),
				title: req.body.title,
				content: req.body.content,
				beginPost : req.body.beginPost,
				sendPost : req.body.sendPost,
				wordCount : req.body.content.split(' ').length
			}	
		}
	console.log("API CREATE POST UPLOAD DATA", uploadData)
	forumcoll.update(
		{_id: req.body.id},
		{ $push: uploadData}
	).then(function(doc, err) {
		if(err) {
			res.send("Problem");
		} else {
			console.log("API CREATE POST SUCCESS DOC", doc)
			sendJsonResponse(res, 201, uploadData);
		}
	})
	console.log("CREATE POST API END")
}


/* ORIGINAL FUNCTION- WORKING
module.exports.createPost = function(req, res) {
	console.log("API CREATE POST", req.body)
	uploadData = {
			posts: {
				title: req.body.title,
				content: req.body.content
			}	
		}
	forumcoll.update(
		{_id: req.body.id},
		{ $push: uploadData}
	).then(function(doc, err) {
		if(err) {
			res.send("Problem");
		} else {
			console.log("API CREATE POST SUCCESS DOC", doc)
			sendJsonResponse(res, 201, uploadData);
		}
	})
	console.log("CREATE POST API END")
}
*/



module.exports.viewThread = function(req, res) {
	console.log("VIEW THREAD API START", req.params.threadid)
	ObjectID = require('mongodb').ObjectID
	forumcoll.find({
		"posts._id" : ObjectID(req.params.threadid)
	}, {
		"posts.$" : 1
	}).then(function(doc, err) {
		if(err){
			res.send("Problem");
		} else {
			console.log("API VIEW THREAD SUCCESS", doc)
			sendJsonResponse(res, 201, doc);
		}
	})
	console.log("VIEW THREAD API END")
}

module.exports.deleteThread = function(req, res) {
	console.log("API DELETE THREAD")
	console.log("DELETE THREAD START")
	console.log("DELETE THREAD REQ DATA", req.body.id)
	ObjectID = require('mongodb').ObjectID
	forumcoll.update({
		"posts._id": ObjectID(req.body.id)
	},{
		$pull : {"posts": {"_id": ObjectID(req.body.id)}}
	}).then(function(doc, err) {
		console.log("DELETE THREAD RESPONSE", doc)
		if(err) {
			res.send("Problem");
		} else {
			sendJsonResponse(res, 201, doc);
		}
	})
	console.log("DELETE THREAD END")
}



module.exports.viewThreadPost = function(req, res) {
	console.log("API RETRIEVE THREAD MAIN POST", req.params.threadid)
	ObjectID = require('mongodb').ObjectID
	forumcoll.find({
		"posts._id": ObjectID(req.params.threadid)
	}, {
		"posts.$" : 1
	}).then(function(doc, err) {
		console.log("VIEW THREAD API RESPONSE", doc)
		if(err) {
			res.send("Problem");
		} else {
			sendJsonResponse(res, 201, doc);
		}
	})
}

module.exports.updateThread = function(req, res) {
	console.log("API UPDATE THREAD FUNCTION", req.body)
	console.log("CONTENT COUNT",req.body.content.split(' ').length)
	ObjectID = require('mongodb').ObjectID
	forumcoll.update({
		"posts._id": ObjectID(req.body.id)
	},{
		$set:{
			"posts.$.title": req.body.title,
			"posts.$.content": req.body.content,
			"posts.$.wordCount" : req.body.content.split(' ').length
		}
	}).then(function(doc, err) {
		if(err) {
			res.send("Problem");
		} else {
			console.log("API UPDATE FORUM SUCCESS DOC", doc)
			sendJsonResponse(res, 201, doc);
		}
	})
}

module.exports.createReply = function(req, res) {
	console.log("API CREATE REPLY FUNCTION")
	ObjectID = require('mongodb').ObjectID
	forumcoll.update({
		"posts._id": ObjectID(req.body.id)
	},{
		$push: {
			"posts.$.replies": {
				"_id": new ObjectID(),
				"title": req.body.title,
				"content": req.body.content,
				"beginReply": req.body.beginReply,
				"sendReply": req.body.sendReply
			}
		}
	}).then(function(doc, err) {
		if(err) {
			res.send("Problem");
		} else {
			console.log("API UPDATE FORUM SUCCESS DOC", doc)
			sendJsonResponse(res, 201, doc);
		}
	})
}

module.exports.deleteReply = function(req, res) {
	console.log("API DELETE REPLY", req.body)
	ObjectID = require('mongodb').ObjectID
	forumcoll.update({
		"posts.replies._id": ObjectID(req.body.id)
	},{
		$pull : {"posts.$.replies": {"_id": ObjectID(req.body.id)}}
	}).then(function(doc, err) {
		console.log("DELETE THREAD RESPONSE", doc)
		if(err) {
			res.send("Problem");
		} else {
			sendJsonResponse(res, 201, doc);
		}
	})
	console.log("DELETE THREAD END")
}


/* DB SUM AGGREGATION

db.forumcollection.aggregate([{$project: {wordCount:{$sum: "$posts.wordCount"}}}])

db.forumcollection.aggregate([{$project: {wordCount:{$avg: "$posts.wordCount"}}}])

*/

/*
db.collection.update({
	d : 2014001 , m :123456789
}, {
	$pull : { "topups.data" : {"val":NumberLong(200)} } 
})

"topups" : {
    "data" : [
            {
                    "val" : NumberLong(200),
                    "chId" : 2,
                    "reqSys" : "222220005031",
                    "old" : NumberLong(223),
                    "isRb" : false
            },

*/



/*
---------------
{
	settings: {
		name: "Forum Title",
		directions: "Forum Directions",
		dateRestrictions: {
			dateOpen: "2017-03-01",
			dateClosed: "2017-03-07"
		},
		points: 10,
		gradingMethod: "Sum",
		tutorial: "on",
		reflection: "on"
	},
	posts: [
		{
			title: "Test Post 1",
			poster: "User1",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus luctus ligula, in mattis lorem pulvinar sit amet. Suspendisse potenti. Suspendisse potenti. Nam a nisi sit amet augue interdum feugiat. Ut sodales at arcu in efficitur. Aenean mattis auctor dictum. Fusce nec lorem eget diam ultrices hendrerit. Mauris dignissim metus eget felis tincidunt, non faucibus nisl consectetur. Duis porttitor interdum nunc ac laoreet. Ut aliquet leo eget ligula tempor, in accumsan libero sodales. Nullam sit amet pretium ex, vel ornare purus. Mauris ut molestie erat. Vestibulum eleifend dui eu enim dignissim, et interdum nibh dignissim. Nulla blandit lectus ac est rutrum cursus. Donec posuere risus at fringilla aliquam. Praesent et mi sit amet sem consectetur viverra. ",
			replies: [
				{
					title: "Test Reply Title 1",
					name: "Test Reply Name 1",
					reply: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus luctus ligula, in mattis lorem pulvinar sit amet. Suspendisse potenti. Suspendisse potenti. Nam a nisi sit amet augue interdum feugiat. Ut sodales at arcu in efficitur. Aenean mattis auctor dictum. Fusce nec lorem eget diam ultrices hendrerit. Mauris dignissim metus eget felis tincidunt, non faucibus nisl consectetur. Duis porttitor interdum nunc ac laoreet. Ut aliquet leo eget ligula tempor, in accumsan libero sodales. Nullam sit amet pretium ex, vel ornare purus. Mauris ut molestie erat. Vestibulum eleifend dui eu enim dignissim, et interdum nibh dignissim. Nulla blandit lectus ac est rutrum cursus. Donec posuere risus at fringilla aliquam. Praesent et mi sit amet sem consectetur viverra. ",
					date: "2017-03-02"
				}, 
				{
					title: "Test Reply Title 2",
					name: "Test Reply Name 2",
					reply: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus luctus ligula, in mattis lorem pulvinar sit amet. Suspendisse potenti. Suspendisse potenti. Nam a nisi sit amet augue interdum feugiat. Ut sodales at arcu in efficitur. Aenean mattis auctor dictum. Fusce nec lorem eget diam ultrices hendrerit. Mauris dignissim metus eget felis tincidunt, non faucibus nisl consectetur. Duis porttitor interdum nunc ac laoreet. Ut aliquet leo eget ligula tempor, in accumsan libero sodales. Nullam sit amet pretium ex, vel ornare purus. Mauris ut molestie erat. Vestibulum eleifend dui eu enim dignissim, et interdum nibh dignissim. Nulla blandit lectus ac est rutrum cursus. Donec posuere risus at fringilla aliquam. Praesent et mi sit amet sem consectetur viverra. ",
					date: "2017-03-03"
				}
			],
			reflection: {
				checklist: ["Topic Sentence Present", true, "3 Support Sentences", true, "1 Conclusion Sentence", true],
				studentSummary: "Aenean ut dui nec quam congue luctus. Vestibulum velit velit, cursus vel nulla non, fermentum sagittis arcu. Etiam lacus eros, rhoncus id facilisis ut, feugiat ut enim. Integer quis venenatis quam. Praesent blandit sodales mi et consectetur. Vivamus et scelerisque nunc, vitae ultricies ex. Morbi ac porttitor est, in auctor urna. Proin mattis, eros non tempor consectetur, purus orci efficitur leo, vel viverra ante orci et velit. Vivamus consequat libero eu tortor lobortis fringilla.",
				teacherFeedback: "Aenean ut dui nec quam congue luctus. Vestibulum velit velit, cursus vel nulla non, fermentum sagittis arcu. Etiam lacus eros, rhoncus id facilisis ut, feugiat ut enim. Integer quis venenatis quam. Praesent blandit sodales mi et consectetur. Vivamus et scelerisque nunc, vitae ultricies ex. Morbi ac porttitor est, in auctor urna. Proin mattis, eros non tempor consectetur, purus orci efficitur leo, vel viverra ante orci et velit. Vivamus consequat libero eu tortor lobortis fringilla."
			},
			feedback: "This is the space where teacher feedback will go."
		}, 
		{
			title: "Test Post 2",
			poster: "User2",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus luctus ligula, in mattis lorem pulvinar sit amet. Suspendisse potenti. Suspendisse potenti. Nam a nisi sit amet augue interdum feugiat. Ut sodales at arcu in efficitur. Aenean mattis auctor dictum. Fusce nec lorem eget diam ultrices hendrerit. Mauris dignissim metus eget felis tincidunt, non faucibus nisl consectetur. Duis porttitor interdum nunc ac laoreet. Ut aliquet leo eget ligula tempor, in accumsan libero sodales. Nullam sit amet pretium ex, vel ornare purus. Mauris ut molestie erat. Vestibulum eleifend dui eu enim dignissim, et interdum nibh dignissim. Nulla blandit lectus ac est rutrum cursus. Donec posuere risus at fringilla aliquam. Praesent et mi sit amet sem consectetur viverra. ",
			replies: [
				{
					title: "Test Reply Title 3",
					name: "Test Reply Name 3",
					reply: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus luctus ligula, in mattis lorem pulvinar sit amet. Suspendisse potenti. Suspendisse potenti. Nam a nisi sit amet augue interdum feugiat. Ut sodales at arcu in efficitur. Aenean mattis auctor dictum. Fusce nec lorem eget diam ultrices hendrerit. Mauris dignissim metus eget felis tincidunt, non faucibus nisl consectetur. Duis porttitor interdum nunc ac laoreet. Ut aliquet leo eget ligula tempor, in accumsan libero sodales. Nullam sit amet pretium ex, vel ornare purus. Mauris ut molestie erat. Vestibulum eleifend dui eu enim dignissim, et interdum nibh dignissim. Nulla blandit lectus ac est rutrum cursus. Donec posuere risus at fringilla aliquam. Praesent et mi sit amet sem consectetur viverra. ",
					date: "2017-03-03"
				}, 
				{
					title: "Test Reply Title 4",
					name: "Test Reply Name 4",
					reply: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus luctus ligula, in mattis lorem pulvinar sit amet. Suspendisse potenti. Suspendisse potenti. Nam a nisi sit amet augue interdum feugiat. Ut sodales at arcu in efficitur. Aenean mattis auctor dictum. Fusce nec lorem eget diam ultrices hendrerit. Mauris dignissim metus eget felis tincidunt, non faucibus nisl consectetur. Duis porttitor interdum nunc ac laoreet. Ut aliquet leo eget ligula tempor, in accumsan libero sodales. Nullam sit amet pretium ex, vel ornare purus. Mauris ut molestie erat. Vestibulum eleifend dui eu enim dignissim, et interdum nibh dignissim. Nulla blandit lectus ac est rutrum cursus. Donec posuere risus at fringilla aliquam. Praesent et mi sit amet sem consectetur viverra. ",
					date: "2017-03-04"
				}
			]	
		}
	]
}
*/