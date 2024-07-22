import bcrypt from "bcrypt"
import { sendError } from "h3"
import {getUserByUsername} from "~/server/api/db/users.js";
import {userTransformer} from "~/server/api/transformers/user.js";
import { defineEventHandler, readBody } from 'h3';
import {generateTokens, sendRefreshToken} from "~/server/utils/jwt.js";
import {createRefreshToken} from "~/server/api/db/refreshTokens.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { username, password } = body

    if (!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }))
    }

    const user = await getUserByUsername(username)

    if (!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }

    const doesThePasswordMatch = await bcrypt.compare(password, user.password)

    if (!doesThePasswordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }

    const { accessToken, refreshToken } = generateTokens(user)

    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    sendRefreshToken(event, refreshToken)

    return {
        access_token: accessToken, user: userTransformer(user)
    }

})