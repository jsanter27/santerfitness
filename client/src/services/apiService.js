import axios from 'axios';

export default {
    addSlide : (data) => {
        return axios.post('/api/add/slide', data)
                .then( (res) => {
                    if (res.status !== 401){
                        return res.json().then(data => {
                            return data;
                        });
                    }
                    else{
                        return { message : { msgBody : "Your session has expired. Please re-login.", msgError: true } };
                    }
                });
    },
    addSchedule : (data) => {
        return axios.post('/api/add/slide', data)
                .then( (res) => {
                    if (res.status !== 401){
                        return res.json().then(data => {
                            return data;
                        });
                    }
                    else{
                        return { message : { msgBody : "Your session has expired. Please re-login.", msgError: true } };
                    }
                });
    },
    addAlert : (data) => {
        return axios.post('/api/add/alert', data)
                .then( (res) => {
                    if (res.status !== 401){
                        return res.json().then(data => {
                            return data;
                        });
                    }
                    else{
                        return { message : { msgBody : "Your session has expired. Please re-login.", msgError: true } };
                    }
                });
    },
    addEvent : (data) => {
        return axios.post('/api/add/event', data)
                .then( (res) => {
                    if (res.status !== 401){
                        return res.json().then(data => {
                            return data;
                        });
                    }
                    else{
                        return { message : { msgBody : "Your session has expired. Please re-login.", msgError: true } };
                    }
                });
    },
    removeSlide : (key) => {
        return axios.get('/api/remove/slide/' + key)
                .then( (res) => {
                    if (res.status !== 401){
                        return res.json().then(data => {
                            return data;
                        });
                    }
                    else{
                        return { message : { msgBody : "Your session has expired. Please re-login.", msgError: true } };
                    }
                });
    },
    removeSchedule : () => {
        return axios.get('/api/remove/schedule')
            .then( (res) => {
                if (res.status !== 401){
                    return res.json().then(data => {
                        return data;
                    });
                }
                else{
                    return { message : { msgBody : "Your session has expired. Please re-login.", msgError: true } };
                }
            });
    },
    removeAlert : (id) => {
        return axios.get('/api/remove/alert/' + id)
                .then( (res) => {
                    if (res.status !== 401){
                        return res.json().then(data => {
                            return data;
                        });
                    }
                    else{
                        return { message : { msgBody : "Your session has expired. Please re-login.", msgError: true } };
                    }
                });
    },
    removeEvent : (id) => {
        return axios.get('/api/remove/event/' + id)
                .then( (res) => {
                    if (res.status !== 401){
                        return res.json().then(data => {
                            return data;
                        });
                    }
                    else{
                        return { message : { msgBody : "Your session has expired. Please re-login.", msgError: true } };
                    }
                });
    },
    updateAlert : (id, data) => {
        return axios.post('/api/update/alert/' + id, data)
                .then( (res) => {
                    if (res.status !== 401){
                        return res.json().then(data => {
                            return data;
                        });
                    }
                    else{
                        return { message : { msgBody : "Your session has expired. Please re-login.", msgError: true } };
                    }
                });
    },
    updateEvent : (id, data) => {
        return axios.post('/api/update/event/' + id, data)
                .then( (res) => {
                    if (res.status !== 401){
                        return res.json().then(data => {
                            return data;
                        });
                    }
                    else{
                        return { message : { msgBody : "Your session has expired. Please re-login.", msgError: true } };
                    }
                });
    },
    requestTrial : (data) => {
        return axios.post('/api/trial', data)
                .then( (res) => {
                    if (res.status !== 401){
                        return res.json().then(data => {
                            return data;
                        });
                    }
                    else{
                        return { message : { msgBody : "Your session has expired. Please re-login.", msgError: true } };
                    }
                });
    }
}