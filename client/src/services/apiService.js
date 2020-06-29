import axios from 'axios';

const getResponse = (res) => {
    return res.data;
}

const catchErrors = (err) => {
    if (err.response.status !== 401){
        return err.response.data;
    }
    else {
        return { message : { msgBody : "Your session has expired. Please re-login.", msgError: true } };
    }
}

export default {
    addSlide : (data) => {
        return axios.post('/api/add/slide', data).then(getResponse).catch(catchErrors);
    },
    addSchedule : (data) => {
        return axios.post('/api/add/schedule', data).then(getResponse).catch(catchErrors);
    },
    addAlert : (data) => {
        return axios.post('/api/add/alert', data).then(getResponse).catch(catchErrors);
    },
    addEvent : (data) => {
        return axios.post('/api/add/event', data).then(getResponse).catch(catchErrors);
    },
    removeSlide : (key) => {
        return axios.get('/api/remove/slide/' + key).then(getResponse).catch(catchErrors);
    },
    removeSchedule : () => {
        return axios.get('/api/remove/schedule').then(getResponse).catch(catchErrors);
    },
    removeAlert : (id) => {
        return axios.get('/api/remove/alert/' + id).then(getResponse).catch(catchErrors);
    },
    removeEvent : (id) => {
        return axios.get('/api/remove/event/' + id).then(getResponse).catch(catchErrors);
    },
    updateAlert : (id, data) => {
        return axios.post('/api/update/alert/' + id, data).then(getResponse).catch(catchErrors);
    },
    updateEvent : (id, data) => {
        return axios.post('/api/update/event/' + id, data).then(getResponse).catch(catchErrors);
    },
    requestTrial : (data) => {
        return axios.post('/api/trial', data).then(getResponse).catch(catchErrors);
    }
}