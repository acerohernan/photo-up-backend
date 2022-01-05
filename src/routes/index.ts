import { Router } from "express";
const router = Router();

import {getAllPhotos,createPhoto, getPhotoById, updatePhoto, deletePhoto} from "../controllers/photo.controller";
import multer from "../libs/multer";

router.route("/photos")
    .get(getAllPhotos)
    .post(multer.single("image"), createPhoto);

router.route("/photos/:id")
    .get(getPhotoById)
    .put(updatePhoto)
    .delete(deletePhoto);

export default router;