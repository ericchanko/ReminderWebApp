let database = [

    {
        reminders: [{ id: 1, title: "Cindy's Reminder", description: "description", completed: false, subtasks: { a: '0', b: '0', c: '1' }, tags: ["epic", "test tag"] },],
        id: 2,
        name: "Cindy Doe",
        email: "cindy@gmail.com",
        password: "c",
        friends: ["Jimmy Smith"],
    },

    {
        reminders: [{ id: 1, title: "Jimmy's reminder", description: "description2", completed: false, tags: [] }],
        id: 1,
        name: "Jimmy Smith",
        email: "jimmy123@gmail.com",
        password: "j",
        friends: [],
    }
];


const userModel = {
    findOne: (email) => {
        for (const person of database) {
            if (person.email === email) {
                return person
            }
        }
        //TODO: redirect user to registration if user not found
        throw new Error(`Couldn't find user with email: ${email}`)
    },
    findById: (id) => {
        for (const person of database) {
            if (person.id === id) {
                return person
            }
        }
        if (user) {
            return user;
        }
        //TODO: same thing as findOne
        throw new Error(`Couldn't find user with id: ${id}`);
    },
};

module.exports = { database, userModel };
