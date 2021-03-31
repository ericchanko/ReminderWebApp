let database = require("../database").database;

let remindersController = {
    list: (req, res) => {
        res.render("reminder/index", { reminders: req.user.reminders });
    },

    new: (req, res) => {
        res.render("reminder/create");
    },

    listOne: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = req.user.reminders.find(function(reminder) {
            return reminder.id == reminderToFind;
        });
        if (searchResult != undefined) {
            res.render("reminder/single-reminder", { reminderItem: searchResult });
        } else {
            res.render("reminder/index", { reminders: req.user.reminders });
        }
    },

    create: (req, res) => {

        // find lowest available positive integer id

        //TODO get correct user in session
        let id_list = [];
        for (item of req.user.reminders) {
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
            datetime: req.body.datetime,
            tags: req.body.tag.split(', '),
            subtasks: req.body.subtasks,
        };
        req.user.reminders.push(reminder);
        res.redirect("/reminders");
    },

    edit: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = req.user.reminders.find(function(reminder) {
            return reminder.id == reminderToFind;
        });
        res.render("reminder/edit", { reminderItem: searchResult });
    },

    update: (req, res) => {
        // implement this code
        let reminderToUpdate = req.params.id;

        let tag = req.user.reminders[0].tags
            //Looks at all the tags stored in database and adds user input

        splitItems = req.body.tag.split(', ')
        if (splitItems.length !== 0 && splitItems[0] !== '') {
            for (items of splitItems) {
                tag.push(items)
            }
        }
        let title = req.body.title
        let desc = req.body.description
        let status = req.body.completed
        let datetime = req.body.datetime
        let subtasks = req.body.subtasks


        for (var r in req.user.reminders) {
            if (req.user.reminders[r].id.toString() === reminderToUpdate) {
                req.user.reminders[r].title = title;
                req.user.reminders[r].description = desc;
                req.user.reminders[r].tags = tag;
                req.user.reminders[r].completed = JSON.parse(status);
                req.user.reminders[r].datetime = datetime;
                req.user.reminders[r].subtasks = subtasks;
                break;
            }
        }

        res.redirect("/reminders");
    },

    delete: (req, res) => {
        let findId = req.params.id
        let indexNum = req.user.reminders.findIndex(i => i.id == findId)
        req.user.reminders.splice(indexNum, 1);
        res.redirect("/reminders")
    },
};

module.exports = remindersController;