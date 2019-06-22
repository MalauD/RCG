// app.post('/foods/vote/', (req, res) => {
// 	if (req.params.id != 'undefined') {
// 		//Verify if the user is allowed to perform this action
// 		if (!req.session.name) {
// 			res.json({ error: 'User not logged' }).sendStatus(500);
// 			return;
// 		}
// 		//TODO verif vote using YUP
// 		//verify if the vote already exist
// 		Authentification.CheckVoteExisting(
// 			req.session.hash,
// 			req.body.vote,
// 			Queries.connection,
// 			(err, IsExisting, VoteDB, votesarray) => {
// 				if (err) {
// 					console.log(err);
// 					res.sendStatus(500);
// 					return;
// 				}
// 				//if the vote exist send it to the client
// 				if (IsExisting) res.json({ error: VoteDB, IsExisting }).sendStatus(500);
// 				else {
// 					//if aray is empty create it
// 					if (!votesarray) votesarray = [];

// 					votesarray.push(req.body.vote);
// 					//Add element to array and the put it in DB
// 					Authentification.AddVotesToDB(votesarray, req.session.hash, Queries.connection, err => {
// 						if (err) {
// 							console.log(err);
// 							res.json({ error: 'Error when appending vote' }).sendStatus(500);
// 						}
// 						res.sendStatus(200);
// 						return;
// 					});
// 				}
// 			}
// 		);
// 	}
// });
