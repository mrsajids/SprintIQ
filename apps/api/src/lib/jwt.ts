import jwt, { type SignOptions } from "jsonwebtoken";

const JWT_ACCESS_SECRET: string =
    process.env.JWT_ACCESS_SECRET ?? "";

const JWT_ACCESS_EXPIRES_IN =
    process.env.JWT_ACCESS_EXPIRES_IN ?? "15m";

if (!JWT_ACCESS_SECRET) {
    throw new Error(
        "JWT_ACCESS_SECRET is not configured"
    );
}

export interface AccessTokenPayload {
    userId: string;
}

export function generateAccessToken(
    userId: string
): string {
    const options: SignOptions = {
        expiresIn: JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
    };

    return jwt.sign(
        { userId },
        JWT_ACCESS_SECRET,
        options
    );
}

export function verifyAccessToken(
    token: string
): AccessTokenPayload {
    const payload = jwt.verify(
        token,
        JWT_ACCESS_SECRET
    );

    if (
        typeof payload !== "object" ||
        payload === null ||
        typeof payload.userId !== "string"
    ) {
        throw new Error(
            "Invalid access token payload"
        );
    }

    return {
        userId: payload.userId,
    };
}