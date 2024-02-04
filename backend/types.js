const zod = require("zod");

const createUser = zod.object({
    Firstname: zod.string(),
    Lastname: zod.string(),
    Username: zod.string().email(),
    Password: zod.string()
})

const SigninUser = zod.object({
    Username: zod.string().email(),
    Password: zod.string()
})

const updateUser = zod.object({
    Firstname: zod.string().optional(),
    Lastname: zod.string().optional(),
    Password: zod.string().optional(),
})

module.exports = {
    createUser,
    SigninUser,
    updateUser
}