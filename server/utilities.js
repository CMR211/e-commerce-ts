const { createHash } = require("node:crypto")

function hash256(string) {
    return createHash("sha256").update(string, "utf-8").digest("hex")
}

module.exports = { hash256 }
