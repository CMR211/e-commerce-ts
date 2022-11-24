const { randomBytes, pbkdf2Sync } = require("node:crypto")

/**
 * @param {string} password
 * @param {string?} salt - optional, if not defined new salt will be generated 128 bytes long in hex
 * @returns {string} - returns a string containing hash method, salt and hash
 */
function hash256(password, salt) {
    if (typeof salt === "undefined") salt = randomBytes(128).toString("hex")
    const iterations = 100
    const hash = pbkdf2Sync(password, salt, iterations, 128, "sha256").toString("hex")
    const output = `{method:pbkdf2}{salt:${salt}}{hash:${hash}}`
    return output
}

module.exports = { hash256 }
