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
                return Promise.reject(`${errMsg} Error number: ${res.status}`);
            }    
        })
    }

    requestClothes() {
        return this._request(`${this._baseUrl}/items`, {
            headers: this._headers,
            method: "GET"
        }, 'Error loading clothes from server.');
    }

    deleteItem(itemId) {
        return this._request(`${this._baseUrl}/items/${itemId}`, {
            headers: this._headers,
            method: "DELETE"
        }, 'Error deleteng item from server. Try again later.');
    }

    addItem(itemInfo) {
        return this._request(`${this._baseUrl}/items`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(itemInfo)
        }, 'Error posting item to server.  Try again later.');
    }
}