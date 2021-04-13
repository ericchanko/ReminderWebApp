let database = require("../database").database;
const fetch = require("node-fetch")

let remindersController = {
    list: async(req, res) => {
        let response = await fetch("http://api.weatherapi.com/v1/current.json?key=e2bce0dc69574483965184342210204&q=Vancouver&aqi=no")
        let data = await response.json();

        let allReminders = req.user.reminders;
        // get user friends remidners
        for (let friend of req.user.friends) {
            for (let data of database) {
                if (data.name === friend) {
                    allReminders = allReminders.concat(data.reminders);
                    break;
                }
            }
        }


        res.render("reminder/index", { reminders: allReminders, data: data });
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
        listTags = req.body.tag.split(', ')
        if (listTags == '') {
            //Kind of scuffed way to fix this. Will think of better implementation later.
            listTags = []
        }

        let reminder = {
            id: id,
            title: req.body.title,
            description: req.body.description,
            completed: false,
            datetime: req.body.datetime,
            tags: listTags,
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
        let reminderToUpdate = req.params.id;

        let checkIfSR = req.query.singleReminder;
        if (checkIfSR) {
            // check if update req is sent from single reminders page
            let { subtasks } = req.body;
            for (var r in req.user.reminders) {
                if (req.user.reminders[r].id.toString() === reminderToUpdate) {
                    req.user.reminders[r].subtasks = subtasks;
                    break;
                }
            }
            res.status(204).send();
        }
        else {

            // let tag = req.user.reminders[0].tags
            // //Looks at all the tags stored in database and adds user input

            // splitItems = req.body.tag.split(', ')
            // if (splitItems.length !== 0 && splitItems[0] !== '') {
            //     for (items of splitItems) {
            //         tag.push(items)
            //     }
            // }
            let { title, description, completed, datetime, subtasks, tags } = req.body;


            for (var r in req.user.reminders) {
                if (req.user.reminders[r].id.toString() === reminderToUpdate) {
                    req.user.reminders[r].title = title;
                    req.user.reminders[r].description = description;
                    req.user.reminders[r].tags = tag;
                    req.user.reminders[r].completed = JSON.parse(completed);
                    req.user.reminders[r].datetime = datetime;
                    req.user.reminders[r].subtasks = subtasks;
                    req.user.reminders[r].tags = tags;
                    break;
                }
            }

            res.redirect("/reminders");
        }
    },

    delete: (req, res) => {
        let findId = req.params.id
        let indexNum = req.user.reminders.findIndex(i => i.id == findId)
        req.user.reminders.splice(indexNum, 1);
        res.redirect("/reminders")
    },

    addfriend: (req, res) => {
        let friendId = req.params.id;
        for (let data of database) {
            if (data.id === Number(friendId)) {
                req.user.friends.push(data.name);
                break;
            }
        }
        res.redirect("/reminders")
    }
};

module.exports = remindersController;
