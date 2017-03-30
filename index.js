var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
module.exports.connect = function connect(callback) {
    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        insertDocuments(db, function () {
            // findDocuments(db, function () {
            module.exports.db = db;
            db.close();
            // });
        });
    });
}


var insertDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('addAPerson');
    // db.dropDatabase();
    collection.count(function (err, count) {
        if (!err && count === 0) {
            // Insert some documents
            const firstNames = ['John', 'Sophia', 'Emma', 'Jackson', 'Aiden', 'Lucas', 'Olivia', 'Noah', 'Ethan', 'Ava', 'Riley', 'Mason', 'Zoe', 'Oliver', 'Lily', 'Jacob', 'Michael', 'Carter', 'Chloe', 'Harper', 'Daniel', 'Evelyn', 'William', 'Jack', 'Owen', 'Matthew', 'Isaac', 'Dylan', 'Elizabeth', 'David', 'Connor', 'Landon', 'Victoria', 'Anna', 'Christian', 'Maria', 'Sarah', 'Addison', 'Henry', 'Emily', 'James', 'Alexander', 'Evelyn', 'Gabriel', 'Luke', 'Madison', 'Benjamin', 'Sebastian', 'Abigail', 'Nathan', 'Elena'];
            const lastNames = ['Smith', 'Johnson', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Anderson', 'Thomas', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Nelson', 'Turner', 'Phillips', 'Roberts', 'Campbell', 'Sanchez', 'Morgan', 'Murphy', 'Bailey', 'Cooper', 'Howard', 'Gray', 'Brooks', 'Price', 'Woods', 'Barnes', 'Henderson', 'Perry', 'Jenkins', 'Patterson', 'Hughes'];
            //Render new UserList
            let newUserLists = [];

            for (let i = 0; i < 2; i++) {
                newUserLists.push({
                    name: firstNames[Math.floor(Math.random() * 50)] + " " + lastNames[Math.floor(Math.random() * 50)],
                    gender: Math.round(Math.random()) ? 'Male' : 'Female',
                    age: Math.floor(Math.random() * 70) + 15,
                })
            }

            // insert the users into the database
            // in the `users` collection
            collection.insert(newUserLists, function (err, result) {
                console.log("Insert 2 users");
                callback(result);
            });
        } else {
            collection.find().toArray(function (err, docs) {
                assert.equal(err, null);
                console.log("Database is ready");
                callback(docs);
            });
        }
    });

}
var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('addAPerson');
    // Find some documents
    collection.find().toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}