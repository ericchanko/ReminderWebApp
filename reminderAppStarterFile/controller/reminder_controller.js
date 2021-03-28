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

        // find lowest available positive integer id
        let id_list = [];
        for (item of database.cindy.reminders) {
            id_list.push(item.id)
        }
        const set = new Set(id_list);
        let id = 1;
        while (set.has(id)) {
            id++
        }

        let reminder = {
            id: id,
            title: req.body.title,
            description: req.body.description,
            completed: false,
            datetime: req.body.datetime
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
        let datetime = req.body.datetime

        for (var r in database.cindy.reminders) {
            if (database.cindy.reminders[r].id.toString() === reminderToUpdate) {
            database.cindy.reminders[r].title = title;
            database.cindy.reminders[r].description = desc;
            database.cindy.reminders[r].completed = JSON.parse(status);
            database.cindy.reminders[r].datetime = datetime
            break;
            }
        }

        res.redirect("/reminders");
    },

    delete: (req, res) => {
        let findId = req.params.id
        let indexNum = database.cindy.reminders.findIndex(i => i.id == findId)
        database.cindy.reminders.splice(indexNum, 1);
        res.redirect("/reminders")
    },
};

module.exports = remindersController;
