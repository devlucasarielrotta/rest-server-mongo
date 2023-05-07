import { v4 } from "uuid";
import path from 'path';
import { __dirname } from '../utils.js';
import { existsSync, mkdirSync } from 'fs';

const subirArchivo = (files, extensionesValidas = ['png','jpg','jpeg','gif'],carpeta ='') => {
    return new Promise ((resolve,reject) => {
          try {

            const {archivo} = files;
          
            const nombreCortado = archivo.name.split('.');
            const extension = nombreCortado[ nombreCortado.length - 1 ].toLowerCase();
          
            //Extensiones validas
            
            if(!extensionesValidas.includes( extension )){
              return reject(  {
              msg:`La extension ${extension}, no esta permitida.\nExtensiones validas: ${extensionesValidas}`
              }
          )
            }

            const nombreTemp = v4() + '.' + extension;
            const pathLocal = path.join(__dirname,'/uploads/',`${carpeta}`) 
  
            if(!existsSync(pathLocal)){
              
              mkdirSync(pathLocal);
              
            }
          
            const uploadPath = path.join(pathLocal ,nombreTemp);
          
            archivo.mv(uploadPath,(err) => {
              if(err){
                  
                  reject(err)
              }
              resolve( nombreTemp )
            })
          }catch(error){
            console.log('error',error)
          }
         

    })
}

export {
    subirArchivo
}