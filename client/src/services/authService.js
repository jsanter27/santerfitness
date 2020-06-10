export default {
    login : user => {
        return fetch('/users/login', {
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if (res.status !== 401){
                return res.json().then(data => {
                    return data;
                });
            }
            else{
                return { isAuthenticated : false, user : { username : "" } };
            }
        });
    },
    register : user => {
        return fetch('/users/register', {
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if (res.status !== 401){
                return res.json().then(data => {
                    return data;
                });
            }
            else{
                return { isAuthenticated : false, user : { username : "" } };
            }
        });
    },
    forgotPassword : user => {
        return fetch('/users/forgot', {
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if (res.status !== 401){
                return res.json().then(data => {
                    return data;
                });
            }
            else{
                return { isAuthenticated : false, user : { username : "" } };
            }
        });
    },
    logout : () => {
        return fetch('/users/logout').then(res => res.json()).then(data => data);
    },
    isAuthenticated : () => {
        return fetch('/users/authenticated')
                .then(res => {
                    if (res.status !== 401){
                        return res.json().then(data => {
                            return data;
                        });
                    }
                    else{
                        return { isAuthenticated : false, user : { username : "" } };
                    }
                });
    }
}