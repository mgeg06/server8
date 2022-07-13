import { Usuario } from './usuario';



export class UsuariosListas
{
    private lista:Usuario[]=[];

    constructor(){}

    public agregar(usuario: Usuario){
        this.lista.push(usuario);
        console.log(this.lista);

    return usuario
    }
    public actualizaNombre(id: string, nombre: string ){
        for (let usuario of this.lista){
            if(usuario.id==id){
                usuario.nombre= nombre;
                break
            }
        }
        console.log ('==== Actualizando usuario====');
        console.log(this.lista)
    }

    public getLista(){
        return this.lista;
    }

    public getUsuario(id:string){
        return this.lista.find (usuario=>usuario.id===id);

    }

    public getUsuariosEnSala(sala: string){
        return this.lista.filter (usuario=>usuario.sala=== sala);
    }
        //borrar usuarios
    public borrarUsuario ( id: string){
            const temp_Usuario = this.getUsuario(id);
            this.lista=this.lista.filter ( usuario => { usuario.id !== id})
            console.log(this.lista);
            return temp_Usuario;
        }


}