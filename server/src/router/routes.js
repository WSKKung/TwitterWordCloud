import { Router } from "express";
import multer from "multer";
import { getKeywordFromTweets } from "../controller/controller.js"

const router = Router()
const upload = multer()

router.post('/api/word_cloud', upload.none(), getKeywordFromTweets)

export default router