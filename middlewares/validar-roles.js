import { request, response } from 'express' 

const esAdminRole = (req,res = response, next) => {

    if( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere validar el role sin validar el token primero'
        } )
    }

    const { rol , nombre} = req.usuario;

    if ( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - no puede hacer la gestion`
        })
    }

    
    next();
}

const tieneRole = ( ...roles ) => {


    return (req,res = response, next ) => {
        if ( !req.usuario ){
            return res.status(500).json({
                msgn: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if( !roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            })
        }
    
        next();
    }
}

export { esAdminRole, tieneRole }