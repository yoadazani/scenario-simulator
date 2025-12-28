const getForces = async () => {
    const res = await fetch('https://apim.dev.orangepeak.net/mongodal-event-mgmt/gettnufaeventstoexternalmin?cityId="200"');

    const data = await res.json();
    return data;
}

// write data to json file 
const fs = require('fs');
getForces().then(data => {
    fs.writeFileSync('tnufa-events_200.json', JSON.stringify(data, null, 2));
});
