import React, { useState, useEffect, createContext } from 'react';
import auth from '../services/authService';

import SFLoading from '../components/SFLoading';

export const AuthContext = createContext();

export default ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        auth.isAuthenticated().then( (result) => {
            setUser(result.user);
            setIsAuthenticated(result.isAuthenticated);
            setIsLoaded(true);
        });
    }, []);

    if (!isLoaded){
        return <SFLoading />
    }
    
    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            { children }
        </AuthContext.Provider>
    );
}