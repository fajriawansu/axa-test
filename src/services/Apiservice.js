import axios from "axios";

const invokeGet = async (url) => {
    return axios.get(url, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res;
    }).catch((err) => {
        console.log(err)

        return err.response;
    });
}

const invokeDelete = async (url) => {
    return axios.delete(url, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res;
    }).catch((err) => {
        console.log(err)

        return err.response;
    });
}

const invokePost = (url, body) => {
    return axios.post(url, JSON.stringify(body), {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res;
    }).catch((err) => {
        console.log(err)
    })
}

const invokePut = (url, body) => {
    return axios.put(url, JSON.stringify(body), {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res;
    }).catch((err) => {
        console.log(err)
    })
}

const ApiService = {
    invokeGet,
    invokeDelete,
    invokePost,
    invokePut
}

export default ApiService