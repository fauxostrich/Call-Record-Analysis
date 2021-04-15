let mongoClient = require("mongodb").MongoClient;
let readLine = require("readline-sync");
let fs = require("fs");
let jsonArray = new Array();
let data = fs.readFileSync("call_data.json");
jsonArray = JSON.parse(data);
let url = "mongodb://localhost:27017";
mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
    let db = client.db("meanstack");    // meanstack is the name of the database we created in class (database holds collections!
    if(!err){
         console.log("Connected");
         for(obj of jsonArray)
         {
            db.collection("CallData").insertOne({_id: obj._id, source: obj.source, destination: obj.destination, sourceLocation: obj.sourceLocation, destinationLocation: obj.destinationLocation, callDuration: obj.callDuration, roaming: obj.roaming, callCharge: obj.callCharge}, (err2, result) => {
            if(!err2){
                console.log(result)
            } 
            else console.log(err2);
            client.close();
        
         });
        }
    }
    else console.log("Error: " + err);
});