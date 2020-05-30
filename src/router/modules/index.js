import control from "./control"
import test from "./test"
import user from "./user"
import message from "./message"
import addPaper from "./addPaper"
import home from "./home"
const configRouter = [...control, ...test, ...user, ...message, ...addPaper, ...home]
export default configRouter