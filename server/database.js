"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var hashPassword = require("./utilities").hashPassword;
require("dotenv").config();
//@ts-ignore
var client = new mongodb_1.MongoClient(process.env.MONGO_URI, { useNewUrlParser: true });
var DATABASE = "plants-e-commerce-ts";
var COLLECTION_PLANTS = "plants";
var COLLECTION_USERS = "users";
function loadPlants() {
    return __awaiter(this, void 0, void 0, function () {
        var plantsFromDB, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(DATABASE).collection(COLLECTION_PLANTS).find({}).toArray()];
                case 2:
                    plantsFromDB = _a.sent();
                    client.close();
                    return [2 /*return*/, plantsFromDB];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, error_1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function loadPlant(id) {
    return __awaiter(this, void 0, void 0, function () {
        var plantFromDB, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(DATABASE).collection(COLLECTION_PLANTS).findOne({ _id: id })];
                case 2:
                    plantFromDB = _a.sent();
                    client.close();
                    return [2 /*return*/, plantFromDB];
                case 3:
                    error_2 = _a.sent();
                    return [2 /*return*/, error_2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Queries the db to find plants at discounted price (price < old_price).
 * Returns an array of 4 or less plants randomly picked from all discounted plants
 */
function loadDiscountedPlants() {
    return __awaiter(this, void 0, void 0, function () {
        var discountedPlants, randomIndexes_1, randomIndex, randomDiscountedPlants, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client
                            .db(DATABASE)
                            .collection(COLLECTION_PLANTS)
                            .find({
                            $expr: {
                                $lt: ["$price", "$old_price"]
                            }
                        })
                            .toArray()];
                case 2:
                    discountedPlants = _a.sent();
                    client.close();
                    randomIndexes_1 = [];
                    while (true) {
                        if (randomIndexes_1.length >= 4 || randomIndexes_1.length === discountedPlants.length)
                            break;
                        randomIndex = Math.floor(Math.random() * discountedPlants.length);
                        if (randomIndexes_1.includes(randomIndex))
                            continue;
                        else
                            randomIndexes_1.push(randomIndex);
                    }
                    randomDiscountedPlants = discountedPlants.filter(function (plant, index) { return randomIndexes_1.includes(index); });
                    return [2 /*return*/, randomDiscountedPlants];
                case 3:
                    error_3 = _a.sent();
                    return [2 /*return*/, error_3];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function loadUserCredentials(email) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfoFromDB, userCredentials, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(DATABASE).collection(COLLECTION_USERS).findOne({ email: email.toLowerCase() })];
                case 2:
                    userInfoFromDB = _a.sent();
                    client.close();
                    if (!userInfoFromDB)
                        throw new Error("No matching user");
                    userCredentials = {
                        hash: userInfoFromDB.password.match(/\{hash:[a-z0-9]+?\}/)[0].slice(6, -1),
                        salt: userInfoFromDB.password.match(/\{salt:[a-z0-9]+?\}/)[0].slice(6, -1)
                    };
                    return [2 /*return*/, userCredentials];
                case 3:
                    error_4 = _a.sent();
                    return [2 /*return*/, error_4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function createUser(name, surname, email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var newUserData, usersFromDB, addedUser, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newUserData = {
                        name: name,
                        surname: surname,
                        email: email,
                        password: hashPassword(password)
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    usersFromDB = client.db(DATABASE).collection(COLLECTION_USERS);
                    return [4 /*yield*/, usersFromDB.insertOne(newUserData)];
                case 3:
                    addedUser = _a.sent();
                    client.close();
                    return [2 /*return*/, addedUser];
                case 4:
                    error_5 = _a.sent();
                    return [2 /*return*/, error_5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function deleteUser(email) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedUser, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(DATABASE).collection(COLLECTION_USERS).deleteOne({ email: email })];
                case 2:
                    deletedUser = _a.sent();
                    client.close();
                    return [2 /*return*/, deletedUser];
                case 3:
                    error_6 = _a.sent();
                    return [2 /*return*/, error_6];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function createPlant(document) {
    return __awaiter(this, void 0, void 0, function () {
        var collection, addedDocument, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    collection = client.db(DATABASE).collection(COLLECTION_PLANTS);
                    return [4 /*yield*/, collection.insertOne(document)];
                case 2:
                    addedDocument = _a.sent();
                    client.close();
                    return [2 /*return*/, addedDocument];
                case 3:
                    error_7 = _a.sent();
                    return [2 /*return*/, error_7];
                case 4: return [2 /*return*/];
            }
        });
    });
}
module.exports = { loadPlants: loadPlants, loadPlant: loadPlant, loadDiscountedPlants: loadDiscountedPlants, createPlant: createPlant, loadUserCredentials: loadUserCredentials, createUser: createUser, deleteUser: deleteUser };
