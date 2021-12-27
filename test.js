require("dotenv").config()
const { Rubrik } = require("./src")

const rubrik = new Rubrik({ token: process.env.TOKEN, ip: process.env.CLUSTER_IP })

rubrik.getCluster().then((x) => console.log(x))
