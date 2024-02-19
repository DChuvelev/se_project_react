export default class ClothesApi {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        // console.log(this._baseUrl, this._headers);
    }

    _request(url, reqObj, errMsg) {
        return fetch(url, reqObj).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((err) => {
                    console.log(err);
                    return Promise.reject(`${errMsg} ${err.message}`);
                })                
            }    
        })
    }

    //------------- Auth - Users part --------------

    _auth(userInfo, path) {
        return this._request(`${this._baseUrl}/${path}`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(userInfo)
        }, 'Server returned error:');
    }

    registerUser = (userInfo) => {
        return this._auth(userInfo, 'signup');
    }
    
    authorizeUser = (userInfo) => {
        return this._auth(userInfo, 'signin');
    }

    checkToken = (token) => {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: {...this._headers, authorization: `Bearer ${token}`},
            method: "GET",
        }, 'Server returned error:');    
    }

    updateUserInfo = ({ userInfo, token }) => {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: {...this._headers, authorization: `Bearer ${token}`},
            body: JSON.stringify(userInfo),
            method: "PATCH",
        }, 'Server returned error:');        
    }

    //------------- Clothes part -------------------

    requestClothes() {
        return this._request(`${this._baseUrl}/items`, {
            headers: this._headers,
            method: "GET"
        }, 'Error loading clothes from server.');
    }

    deleteItem(itemId, token) {
        return this._request(`${this._baseUrl}/items/${itemId}`, {
            headers: {...this._headers, authorization: `Bearer ${token}`},
            method: "DELETE"
        }, 'Error deleteng item from server. Try again later.');
    }

    addItem(itemInfo, token) {
        return this._request(`${this._baseUrl}/items`, {
            headers: {...this._headers, authorization: `Bearer ${token}`},
            method: "POST",
            body: JSON.stringify(itemInfo)
        }, 'Error posting item to server.  Try again later.');
    }

    likeItem(itemId, token) {
        return this._request(`${this._baseUrl}/items/${itemId}/likes`, {
            headers: {...this._headers, authorization: `Bearer ${token}`},
            method: "PUT"
        }, 'Error liking item. Try again later.');
    }
    dislikeItem(itemId, token) {
        return this._request(`${this._baseUrl}/items/${itemId}/likes`, {
            headers: {...this._headers, authorization: `Bearer ${token}`},
            method: "DELETE"
        }, 'Error liking item. Try again later.');
    }
}