const RequestHandler = require("./RequestHandler")

class Rubrik {

    /**
     *
     * @constructs Rubrik
     * @description The Rubrik API client
     */
    constructor(options) {
        if (!options.token) throw new Error("Support for user/pass combinations is currently not available, this will be released in a future version")
        this.token = options.token
        this.cluster_ip = options.cluster_ip
        if (!this.cluster_ip) throw new Error("A cluster IP must be provided!")
        this.version = options.version ?? "v1"
        this.baseURL = options.baseURL ?? `https://${this.cluster_ip}/api/`
        this.requestHandler = new RequestHandler(this)
    }

    /**
     * Get the cluster's information from the API
     *
     * @public
     * @param {string} [clusterId="me"] - The cluster's ID
     * @returns {Promise<Cluster>} A Cluster object on Rubrik
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
