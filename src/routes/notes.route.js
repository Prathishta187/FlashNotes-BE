import { Router } from "express";
import {createNote,getNote,getNoteById,updateNote,deleteNote} from "../controllers/note.controller.js"
import  {authenticate}  from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/",authenticate,createNote)
router.get("/",authenticate,getNote)
router.get("/:id",authenticate,getNoteById)
router.put("/:id",authenticate,updateNote)
router.delete("/:id",authenticate,deleteNote)




export default router