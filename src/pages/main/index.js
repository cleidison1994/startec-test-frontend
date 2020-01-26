import React , {Component} from 'react';
import {Link} from 'react-router-dom';


import Api from '../../services/api';

import './styles.css'

export default class Main extends Component{
    state = {
        products:[],
        productPaginate:{},
        page:1
    }
    componentDidMount() {
        this.loadproducts();
    }
     loadproducts = async(page = 1) => {
        const response = await Api.get(`/products?page=${page}`);

        const {docs, ...productPaginate} = response.data;

        this.setState({products:docs,productPaginate, page});
    }
    nextPage = () =>{
        const { page ,productPaginate } = this.state;

        if(page ===productPaginate.pages) return;

        const pageNumber = page + 1;

        this.loadproducts(pageNumber);

    }

    prevPage = () =>{
        const { page } = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadproducts(pageNumber);
        
    }


    render(){

        const { products, page, productPaginate} = this.state;
        return(
            <>
            <ul className="product-list">
                {products.map(product => (
                    <li key={product._id}>
                        <header style= {{backgroundImage:`url(${product.thumbnail_url})`}}/>
                        <strong>{product.name}</strong>
                        <p>{product.description}</p>
                        <span>R$:{product.price}</span>
                        <Link to={`/booking/${product._id}`} className="link">Selecionar</Link>
                    </li>     
                ))}
            </ul>
            <div className="buttons-action">
                <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
                <button  disabled={page === productPaginate.pages}onClick={this.nextPage}>Proximo</button>
            </div>
            </>
        )
    }
}
