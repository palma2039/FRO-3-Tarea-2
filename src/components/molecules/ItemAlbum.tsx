import React from 'react'
import { IAlbum } from '../../models/IAlbum';
import { IUsuario } from '../../models/IUsuario';
import { IFoto } from '../../models/IFoto';

export interface ItemAlbumProps {
    album: IAlbum;
    usuario?: IUsuario;
    fotos?: IFoto[];
  }
export const ItemAlbum:React.FC<ItemAlbumProps> = ({album,usuario,fotos}) => {
  return (
    <li>
        <div>{usuario && <h1>Usuario: {usuario.name}</h1>}</div>
        <div>
        <h3>Album Id: {album.id}</h3>
        <h2>Titulo: {album.title}</h2>
        {fotos && fotos.map((foto) => (
                <img src={foto?.url} alt="textoAlternativo"/>
              ))}
        
        </div>
    </li>
  )
}
