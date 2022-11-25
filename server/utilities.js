const { randomBytes, pbkdf2Sync } = require("node:crypto")

/**
 *
 * @param {string} password
 * @param {string?} salt - optional, if not defined new salt will be generated 128 bytes long in hex
 * @returns {string} - returns a string template: "{method:pbkdf2}{salt:${salt}}{hash:${hash}}"
 */
function hashPassword(password, salt) {
    const NUMBER_OF_HASING_ITERATIONS = 100
    const SALT_LENGTH = 128
    const HASHING_METHOD = "sha256"
    const OUTPUT_FORMAT = "hex"

    if (typeof salt === "undefined") salt = randomBytes(SALT_LENGTH).toString("hex")

    const hash = pbkdf2Sync(password, salt, NUMBER_OF_HASING_ITERATIONS, 128, HASHING_METHOD).toString(OUTPUT_FORMAT)
    const output = `{method:pbkdf2}{salt:${salt}}{hash:${hash}}`

    return output
}

module.exports = { hashPassword }
