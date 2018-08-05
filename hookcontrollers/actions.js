/*This is where to put the code for custom responses -- interacting with DB or any other extenal sources are to be initiated from here*/
var responseModels = require('../models/responses');

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


    get_TextSingle: function (req, res, next) {

        return res.json({ fulfillmentText: "This is the default message - Single fulfillmentText " });
    },

    get_TextMultiple: function (req, res, next) {
        var stringList =  responseModels.StringList
        stringList.text.text = ["Lin1","Lin2 : [Link](http://www.google.com)"]
        return res.json({fulfillmentMessages: [stringList]});
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