import control from "./control"
import test from "./test"
import user from "./user"
import message from "./message"
import addPaper from "./addPaper"
import home from "./home"
import wrongBook from "./wrongBook"
const configRouter = [...control, ...test, ...user, ...message, ...addPaper, ...home, ...wrongBook]
export default configRouter