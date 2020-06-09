import test from "./test"
import user from "./user"
import message from "./message"
import addPaper from "./addPaper"
import home from "./home"
import wrongBook from "./wrongBook"
import examRecord from "./examRecord"
const configRouter = [...test, ...user, ...message, ...addPaper, ...home, ...wrongBook, ...examRecord]
export default configRouter