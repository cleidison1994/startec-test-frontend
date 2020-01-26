import React ,{ useState,useMemo }from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css';

export default function NewProduct({history}) {
    const [thumbnail,setThumbnail] = useState(null);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('');
    const [price,setPrice] = useState('');


    const preview = useMemo(() =>{
    return thumbnail ? URL.createObjectURL(thumbnail):null;
    },[thumbnail]
    )
   async function handleSubmit(event) {
        event.preventDefault();     
                const data = new FormData();
                data.append('thumbnail',thumbnail);
                data.append('name',name);
                data.append('description',description);
                data.append('price',price);
                data.append('category',category);

                await api.post('/products',data,)
                history.push('/');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label 
            id="thumbnail" 
            style={{backgroundImage:`url(${preview})`}}
            className={thumbnail ? 'has-thumbnail':''}
            >
            <input type="file" onChange={event =>setThumbnail(event.target.files[0])}/>
            <img src={camera} alt="selecione uma imagem"/>
            </label>

            <label htmlFor="company">Nome * </label>
            <input
            id="company"
            placeholder="nome"
            value={name}
            onChange={event =>setName(event.target.value)}
            />
            <label htmlFor="techs">descrição</label>
            <input
            id="techs"
            placeholder="Breve descrição do Produto"
            value={description}
            onChange={event =>setDescription(event.target.value)}
            />

            <label htmlFor="price">Valor</label>
            <input
            id="price"
            placeholder="Valor do Produto"
            value={price}
            onChange={event =>setPrice(event.target.value)}
            />
            <label htmlFor="category">Categoria</label>
            <input
            id="category"
            placeholder="Categoria do Produto"
            value={category}
            onChange={event =>setCategory(event.target.value)}
            />
            <button type="submit" className="btn">Salvar</button>
        </form>
    )
}