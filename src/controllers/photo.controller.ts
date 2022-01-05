import {Request, Response} from 'express';
import Photo from "../models/photo";

import path from "path";
import fs from "fs-extra";
import { setOriginalNode } from 'typescript';

export async function getAllPhotos (req: Request, res: Response) : Promise<Response> {
    try{
        const photos = await Photo.find()
        return res.status(200).json(photos);
    }catch (err:any){
        return res.status(400).send(err.message);
    }
}

export async function getPhotoById (req: Request, res: Response) : Promise<Response> {
    try{
        const {id} = req.params;
        const photo = await Photo.findById(id);
        return res.status(200).json(photo);
    } catch (err: any){
        return res.status(400).send(err.message);
    }
}

export async function createPhoto (req:Request, res: Response) : Promise<Response>{
    try{
        const {title, description} = req.body;
        const newPhoto = {
            title,
            description,
            imagePath: req.file?.path
        };
        const photo = new Photo(newPhoto);
        await photo.save();
        return res.status(200).json({
        message: "Photo upload successfully",
        photo
    });
    }catch(err:any){
        return res.status(400).send(err.message);
    }
}

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    try{
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedPhoto = await Photo.findByIdAndUpdate(id, {
            title,
            description
        }, {new:true});
        return res.status(200).json({
            message: 'Successfully updated',
            updatedPhoto
        });
    }catch(err:any){
        return res.status(400).send(err.message);
    }
}


export async function deletePhoto (req: Request, res: Response) : Promise<Response>{
    try{
        const {id} = req.params;
        const deletedPhoto = await Photo.findByIdAndRemove(id);
        //Delete from uploads
        if(deletedPhoto) await fs.unlink(path.resolve(deletedPhoto.imagePath));
        return res.status(200).json({
            message: "Photo deleted",
            deletedPhoto
        })
    }catch(err:any){
        return res.status(400).send(err.message);
    }
}