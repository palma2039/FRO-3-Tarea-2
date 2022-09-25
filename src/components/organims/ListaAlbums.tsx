import React from 'react';
import { IAlbum } from '../../models/IAlbum';
import { IUsuario } from '../../models/IUsuario';
import { IFoto } from '../../models/IFoto';
import { ItemAlbum } from '../molecules/ItemAlbum';

export const ListaAlbums = () => {
    const [cargando, setCargando] = React.useState(true);
    const [albums, setAlbums] = React.useState<IAlbum[] | undefined>(undefined);
    const [usuarios, setUsuarios] = React.useState<IUsuario[] | undefined>(undefined);
    const [fotos, setFotos] = React.useState<IFoto[] | undefined>(undefined);

    async function getData() {
        try {
          const [respuestaAlbums, respuestaUsuarios, respuestaFotos] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/albums"),
            fetch("https://jsonplaceholder.typicode.com/users"),
            fetch("https://jsonplaceholder.typicode.com/photos"),
          ]);
    
          const [datosAlbums, datosUsuarios, datosFotos] = await Promise.all([
            respuestaAlbums.json(),
            respuestaUsuarios.json(),
            respuestaFotos.json(),
          ]);
    
          setAlbums(datosAlbums);
          setUsuarios(datosUsuarios);
          setFotos(datosFotos);
          
          setCargando(false);
        } catch (error) {
          console.log(error);
        }
      }

    React.useEffect(() => {
        getData();
    }, []);

    const getUsuarioPorId = (id: number) => {
        return usuarios?.find((usuario) => usuario.id === id);
      };

    const getFotosPorIdAlbum = (idAlbum: number) => {
        return fotos?.filter((foto) => foto.albumId === idAlbum);
    };

  return (
    <div>
        {cargando ? (<p>Estoy cargando espere un momento...</p>) : (
            <ol>
            {albums &&
              albums.map((album, index) => (
                <ItemAlbum
                  key={album.id}
                  album={album}
                  usuario={getUsuarioPorId(album.userId)}     
                  fotos={getFotosPorIdAlbum(album.id)}             
                />
              ))}
          </ol>
        )}
    </div>
  )
}
