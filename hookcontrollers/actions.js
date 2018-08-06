/*This is where to put the code for custom responses -- interacting with DB or any other extenal sources are to be initiated from here*/
var responseModels = require('../models/responses');
var mysql = require('mysql');


var con = mysql.createConnection({
    host: "TVMATP379588D",
    port: 3306,
    user: "crossopsuser",
    password: "ops@123" //TODO: handle hardcoding here
});

var getDBResult = function (con, query) {
    con.connect(function (err) {
        if (err) throw err;
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
}
//var res = getDBResult(con,"Select * from someTable");

module.exports = {

    call: function (functionName, req, res, next) //for a bit of readability and handling exception while calling
    {
        try {
            this[functionName](req, res, next);  //any function from this module is executed by functionName
        }
        catch (error) //handling if action is not defined within api
        {
            res.json({ fulfillmentText: "Error calling action : " + functionName + "" });
        }
    },

    // ACTIONS

    get_TextSingle: function (req, res, next) {

        return res.json({ fulfillmentText: "This is the default message - Single fulfillmentText" });
    },

    get_TextMultiple: function (req, res, next) {
        var stringList = responseModels.StringList
        stringList.text.text = ["Lin1", "[This is supposed show as link: http://www.google.com](http://www.google.com)"]
        return res.json({ fulfillmentMessages: [stringList] });
    },
    get_Buttons: function (req, res, next) {
        var array = ["Button1"];
        var fulfil = {fulfillmentMessages:[]};
        array.forEach(x =>{
            fulfil.fulfillmentMessages.push({text:x,postback:x});
        });
        return res.json(fulfil);
    }

    //{
    //    title: "QuickReply_Title",
    //    quickReplies: [
    //        "QuickReply1",
    //        "QuickReply2"
    //    ]
    //},
    //{
    //    imageUri: "string",
    //    accessibilityText: "string"
    //}
}