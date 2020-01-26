import React , {Component } from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default class Booking extends Component {

    state = {
        product:[],
            Name:'',
            Email:'',
            Ammount:'',

    };
    async componentDidMount(){
        const { id } = this.props.match.params;
        const response = await api.get(`/product/${id}`); 

        this.setState({product:response.data}); 
    }
    handSave = async(e) =>{
        try{
        e.preventDefault();
            const {name,price } = this.state.product;  
            const {Name,Email,Ammount} = this.state;

            api.post('/sendMail',{
                name:Name,
                email:Email,
                ammount:Ammount,
                price:price,
                product:name
            }).then(function(params) {
                console.log(params.data);
            }).catch(function (error) {
                if(error){
                    console.log(error)
                }
            })
            this.setState({Name:''});
            this.setState({Email:''});
            this.setState({Ammount:''});
            this.setState({product:[]});

        }catch(err){
            console.log(err);
        }
    }
    render(){
        const { product } = this.state;
        return(
            <>
            <div className="list-product">
            <div className="product-image" style={{backgroundImage:`url(${product.thumbnail_url})`}}></div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <span>R$:{product.price}</span>
            </div>
            <form onSubmit={this.handSave}>
            <label htmlFor="ammount">Qtn*</label>
                <input
                 id="ammount"
                 value={this.state.Ammount}
                 onChange={e =>this.setState({Ammount:e.target.value})}
                 className="inputqtn"
                 required
                 />
                <label htmlFor="name">Nome *</label>
                <input
                 id="name"
                 className="input"
                 required
                 value={this.state.Name} 
                 onChange={e =>this.setState({Name:e.target.value})} 
                 placeholder="Digite seu nome *"
                 />
                <label htmlFor="email">Email *</label>
                <input
                 id="email" 
                 className="input" 
                 required
                 value={this.state.Email}
                 onChange={e =>this.setState({Email:e.target.value})}
                 placeholder="Digite seu email *"
                 />
                <div className="button">
                <button className="link" type="submit" >Reservar</button>
                <Link className="link"to={'/'}>Continuar</Link>
            </div>
            </form>
            </>
        )
    }
}

