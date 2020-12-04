
let APIURL = '';

switch (window.location.hostname){
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000';
        break;
    case 'micampfire.herokuapp.com' :
        APIURL = 'https://micampfire.herokuapp.com'
}

export default APIURL;