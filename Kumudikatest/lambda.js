let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	console.log("Received request with payload", event);
	let operation = event.Operation;
	let result = null;
	switch (operation) {
		case "Add":
			result = event.LeftParameter + event.RightParameter;
			break;
		case "Subtract":
			result = event.LeftParameter - event.RightParameter;
			break;
		case "Multiply":
			result = event.LeftParameter + event.RightParameter;
			break;
		case "Devide":
			result = event.LeftParameter / event.RightParameter;
			break;
		case "Mod":
			result = event.LeftParameter % event.RightParameter;
			break;
		default:
			result = "Operation Not Permitted";
			break;
	}
	event.Result = result;

	ddb.put({
		TableName: 'kumudikatest',
		Item: { 'ID': event.ID, 'result': result }
	}, function (err, data) {
		if (err) {
			console.log('fail');
		} else {
			console.log('success');
			
		}
	});


	callback(null, event);

}