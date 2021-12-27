/** A cluster on Rubrik
 * @property {string} id - The cluster's ID
 */
 class Cluster {
    /**
     *
     * @constructs Cluster
     * @description A cluster on Rubrik
     */
    constructor(inputData = {}) {

        this.id = inputData.id
        this.name = inputData.name
        this.apiVersion = inputData.apiVersion
        this.version = inputData.version
        this.timezone = inputData.timezone
        this.geolocation = inputData.geolocation
        this.acceptedEulaVersion = inputData.acceptedEulaVersion
        this.latestEulaVersion = inputData.latestEulaVersion

        /**
         * @private
         * @description Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: inputData })
    }
}
