import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosListas } from '../classes/usuarios-listas';
import { Usuario } from '../classes/usuario';


export const usuariosConectados= new UsuariosListas();
export const conectarCliente=(cliente: Socket)=>{
    const usuario= new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket) =>{
    cliente.on('disconnect', ()=>{
        console.log('Cliente Desconectado');
        usuariosConectados.borrarUsuario(cliente.id)
    });
}

export const mensaje = (cliente: Socket, io: socketIO.Server) =>
{
    cliente.on('mensaje', (payload: { de: string, cuerpo: string}) => {
        console.log('Mensaje recibido', payload);
        
        io.emit('mensaje-nuevo', payload);
    })
}


//configurando al usuario que se esta reistrando 
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) =>
{
    cliente.on('configurar-usuario', (payload: { nombre: string, cuerpo: string},callback:Function) => {
        usuariosConectados.actualizaNombre(cliente.id, payload.nombre  )
        
        
        
        console.log('Bienvenido Usuario', payload);
        callback({
            ok:true,
            mensaje:  `usuario ${payload.nombre} configurado`
        });
       // io.emit('mensaje-nuevo', payload);
    })
}