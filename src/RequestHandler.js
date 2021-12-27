const axios = require("axios")
const { RatelimitError, APIError } = require("./errors")
class RequestHandler {
    constructor(client) {
        this._client = client
    }

    async request(endpoint, query = {}, method, body, version = this._client.version) {
        return new Promise((resolve, reject) => {
            const options = {
                validateStatus: null,
                headers: {
                    "authorization": `${this._client.token}`,
                    "Content-Type": "application/json",
                },
                baseURL: this._client.baseURL,
                url: `/${version}/${endpoint}`,
                method: method,
                data: body,
                params: query,
                timeout: 15000,
            }

            if (this._client.debug) console.debug(`Sending request to ${options.url}\nMethod:\n  ${options.method}\nParams:\n  ${query}`)
                axios.request(options).then((res) => {
                    //  Increase the number of attempts

                    if (res.status >= 200 && res.status < 300) {
                        resolve(res.data)
                        if (this._client.debug) console.debug("Success: \n", res.data)
                    } else if (res.status === 429) {
                        if (this._client.debug) console.debug("Ratelimited: \n", res)
                        reject(new RatelimitError(res))
                    } else {
                        if (this._client.debug) console.debug("API Error: \n", res)
                        reject(new APIError(res))
                    }
                })
        })
    }
}

module.exports = RequestHandler
