let database = require("../database");

let remindersController = {
    list: (req, res) => {
        res.render("reminder/index", { reminders: database.cindy.reminders });
    },

    new: (req, res) => {
        res.render("reminder/create");
    },

    listOne: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = database.cindy.reminders.find(function(reminder) {
            return reminder.id == reminderToFind;
        });
        if (searchResult != undefined) {
            res.render("reminder/single-reminder", { reminderItem: searchResult });
        } else {
            res.render("reminder/index", { reminders: database.cindy.reminders });
        }
    },

    create: (req, res) => {
        let nextId = database.cindy.reminders[database.cindy.reminders.length - 1].id
        let reminder = {
            id: nextId + 1,
            title: req.body.title,
            description: req.body.description,
            completed: false,
        };
        database.cindy.reminders.push(reminder);
        res.redirect("/reminders");
    },

    edit: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = database.cindy.reminders.find(function(reminder) {
            return reminder.id == reminderToFind;
        });
        res.render("reminder/edit", { reminderItem: searchResult });
    },

    update: (req, res) => {
        // implement this code
        let reminderToUpdate = req.params.id;

        let title = req.body.title
        let desc = req.body.description
        let status = req.body.completed

        for (var r in database.cindy.reminders) {
            if (database.cindy.reminders[r].id.toString() === reminderToUpdate) {
            database.cindy.reminders[r].title = title;
            database.cindy.reminders[r].description = desc;
            database.cindy.reminders[r].completed = JSON.parse(status);
            break;
            }
        }

        res.redirect("/reminders");
    },

    delete: (req, res) => {
        let findId = req.params.id
        let indexNum = database.cindy.reminders.findIndex(i => i.id == findId)
        database.cindy.reminders.splice(indexNum, 1)
        res.redirect("/reminders")
    },
};

module.exports = remindersController;
