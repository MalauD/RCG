var sql = require('mysql');

var connection;

Connect = () => {
	CreateConnection();
	ConnectToDB(error => {
		if (error) console.log(error);
		connection.on('error', err => HandleSQLError(err));
	});
};

CreateConnection = () => {
	connection = sql.createConnection({
		host: 'localhost',
		user: 'RCGClient',
		password: 'rcgclient',
		database: 'RCGDB'
	});
};

HandleSQLError = err => {
	console.log('[MySql - Error] Error catched in mysql !');
	console.log('[Mysql - Error] Error: ' + err.code);
	if (err.code == 'PROTOCOL_CONNECTION_LOST') {
		Connect();
	} else {
		console.log(err);
		connection.destroy();
		Connect();
	}
};

ConnectToDB = callback => {
	console.log('[MySql] Connecting to RCG database...');
	connection.connect(function(err) {
		if (err) {
			console.log(err);
			callback(true);
			return;
		}
		console.log('[MySql] Connected to RCG database');
		callback(false);
	});
};

Connect();

module.exports = connection;
