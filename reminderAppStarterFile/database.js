let database = {
    cindy: {
        reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}],
        login: {}
    },
    jimmy: {
        reminders: [],
        login:
            {id: 1,
            name: "Jimmy Smith",
            email: "jimmy123@gmail.com",
            password: "j",}
    }
};

const userModel = {
    //TODO
    // Make it so that you can find users and their login info according to database
};
module.exports = database;
