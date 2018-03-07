module.exports = require("./makewebpackconfig")({
  prod: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  }
});

externals : {
  Config : JSON.stringify({
    drupalURL: 'https://eas-grist06.aston.ac.uk',
    loginPATH: '/user/login?_format=json'
  })
}
