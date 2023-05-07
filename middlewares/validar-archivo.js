import { response } from "express";

const validarArchivoSubir = (req,res=response,next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({msg: 'No files were uploaded.'});
        return;
      }

    next();
      
}

export {
    validarArchivoSubir
}