"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Permissions_1 = __importDefault(require("./Permissions"));
exports.Permissions = Permissions_1.default;
const Validators_1 = require("./Validators");
exports.isBoolean = Validators_1.isBoolean;
exports.isDbUser = Validators_1.isDbUser;
exports.isLocation = Validators_1.isLocation;
exports.isMessage = Validators_1.isMessage;
exports.isNewspost = Validators_1.isNewspost;
exports.isNumber = Validators_1.isNumber;
exports.isObject = Validators_1.isObject;
exports.isPermission = Validators_1.isPermission;
exports.isSession = Validators_1.isSession;
exports.isStatistics = Validators_1.isStatistics;
exports.isString = Validators_1.isString;
exports.isStudentUnion = Validators_1.isStudentUnion;
exports.isUser = Validators_1.isUser;
//# sourceMappingURL=index.js.map