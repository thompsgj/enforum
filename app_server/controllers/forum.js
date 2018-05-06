module.exports.home = function(req, res) {
	res.render('home' , {
		title: "Home",
		content: "Home Content"
	});
}

var postData = {
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
		reflection: "on",
		reflectionTemplate: {
			checklist: ["Topic Sentence Present", "3 Support Sentences"]
		}
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


module.exports.list = function(req, res) {
	res.render('list' , {
		title: "List",
		content: postData
	});
}

module.exports.test = function(req, res) {
	res.render('test' , {
		title: "Test",
		content: postData
	});
}

module.exports.settings = function(req, res) {
	res.render('forumSettings' , {
		title: "Forum Settings",
		content: postData
	});
}
