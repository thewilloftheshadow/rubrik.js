const RequestHandler = require("./RequestHandler")

class Rubrik {
    constructor(options) {
        // if((!options.user && !options.pass) && (!options.token)) throw new Error("Either a username and password combination or a token must be provided!")
        // if(options.user && options.pass) {
        //     this.user = options.user
        //     this.pass = options.pass
        //     this.auth = "user"
        // } else {
        if (!options.token) throw new Error("Support for user/pass combinations is currently not available, this will be released in a future version")
        this.token = options.token
        this.auth = "token"
        // }
        this.node_ip = options.node_ip
        if (!this.node_ip) throw new Error("A node IP must be provided!")
        this.version = options.version ?? "v1"
        this.baseURL = options.baseURL ?? `https://${this.cluster_ip}/api/`
        this.requestHandler = new RequestHandler(this)
    }

    /**
     * Get the cluster's information from the API
     *
     * @public
     * @param {string} [clusterId="me"] - The cluster's ID
     * @returns {Promise<any>} The raw request data
     */
    async getCluster(id = "me") {
        const data = await this._request(`/cluster/${id}`)
        return new Cluster(data)
    }


    /**
     * Internal method to hit the API
     *
     * @private
     * @param {string} endpoint - The API endpoint to request
     * @param {string} [method="GET"] - The HTTP method to use (GET, PUT, PATCH etc.)
     * @param {object} [query={}] - Query parameters
     * @throws {RatelimitError}
     * @returns {Promise<any>} The raw request data
     */
     _request(endpoint, query = {}, method = "GET", body = {}) {
        return this.requestHandler.request(endpoint, query, method, body)
    }
}


module.exports = Rubrik