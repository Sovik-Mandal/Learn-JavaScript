let payload = {
    name: 'The Coding Rider',
    obj2: {
        langauge: 'js',
        obj3: {
            framework: 'react'
        }
    }
}

function getKeys(obj) {
    for(let key in obj) {
        if(typeof obj[key] == 'object') {
            getKeys(obj[key]);
        } else {
            console.log(key)
        }
    }
}

getKeys(payload);