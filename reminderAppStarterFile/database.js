let database = [

    {
        reminders: [{ id: 1, title: "Title", description: "description", completed: false, subtasks: { a: '0', b: '0', c: '1' }, tags: [] }],
        id: 2,
        name: "cindy Doe",
        email: "cindy@gmail.com",
        password: "c",
    },

    {
        reminders: [{ id: 1, title: "Title2", description: "description2", completed: false, tags: [] }],
        id: 1,
        name: "Jimmy Smith",
        email: "jimmy123@gmail.com",
        password: "j",
    }
];


const userModel = {
    findOne: (email) => {
        for (const person of database) {
            if (person.email === email) {
                return person
            }
        }
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
        throw new Error(`Couldn't find user with id: ${id}`);
    },
};

module.exports = { database, userModel };