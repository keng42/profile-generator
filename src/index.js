const fs = require('fs');
const path = require('path');

const { genProfile } = require('./gen-profile');

const profileName = process.argv[2];

if (profileName) {
  genProfile(profileName).then(console.log).catch(console.error);
} else {
  const profileNames = fs
    .readdirSync(path.resolve(__dirname, `../data`))
    .filter((item) => item.endsWith('.json'))
    .map((item) => item.replace('.json', ''));

  Promise.all(profileNames.map(genProfile))
    .then(console.log)
    .catch(console.error);
}
