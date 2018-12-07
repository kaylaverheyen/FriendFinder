// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
// * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.


let friendData = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });


    app.post("/api/friends", (req, res) => {
        let surveyScore = req.body.scores;
        const scoresArr = [];
        const friendCount = 0;
        let match = 0;

        for (var i = 0; i < friendData.length; i++) {
            var scoreDifference = 0;

            for (var j = 0; j < surveyScore.length; j++) {
                scoreDifference += (Math.abs(parseInt(friendData[i].scores[j]) - parseInt(surveyScore[j])))
            }
            scoresArr.push(scoreDifference);
        }
        for (var i = 0; i < scoresArr.length; i++) {
            if (scoresArr[i] <= scoresArr[match]) {
                match = i;
            }
        }

        //return most compatible person
        let perfectMatch = friendData[match];
        res.json(perfectMatch);

        console.log(req.body);
        friendData.push(req.body)

    });

    //clear data
    app.post("/api/clear", (req, res) => {
        friendData.length = [];
        res.json({
            ok: true
        });
    });
};