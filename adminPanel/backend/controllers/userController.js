module.exports.users_get = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json({users: [
        {
            userName: "Padde",
            admin: "no"
        },
        {
            userName: "Hårek",
            admin: "no"
        },
        {
            userName: "Arnold",
            admin: "yes"
        },
        {
            userName: "Loppe",
            admin: "no"
        },

    ]})
}

