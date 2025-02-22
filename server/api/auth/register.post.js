import { defineEventHandler, readBody } from 'h3';
import {createUser} from "~/server/api/db/users.js";
import {userTransformer} from "~/server/api/transformers/user.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {username, email, password, repeatPassword, name} = body;

    if (!username || !email || !password || !repeatPassword || !name) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    if (password !== repeatPassword) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Passwords do not match' }))
    }

    const userData = {
        username,
        email,
        password,
        name,
        profileImage: 'https://picsum.photos/200/200'
    }

    const user = await createUser(userData);

    return {
        body: userTransformer(user)
    }
});
