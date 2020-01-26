import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'

import Main from './pages/main';
import Product from './pages/NewProduct'
import Booking from './pages/booking'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/newproduct" component={Product}/>
                <Route path="/booking/:id" component={Booking}/>
            </Switch>
        </BrowserRouter>
    );
}