const fs = require('fs');
const path = require('path');
const axios = require('axios');

const iconsDir = path.resolve(__dirname, '../data/icons/');

async function loadFromAppStore(link) {
  const id = ((link.match(/id\d{1,9}/) || [])[0] || '').substr(2);
  if (!id) {
    return null;
  }

  const resp = await axios.get(`https://itunes.apple.com/cn/lookup?id=${id}`);
  const result = (resp.data.results || [])[0];
  if (!result) {
    return null;
  }

  return {
    bundle: result.bundleId,
    name: result.trackName,
    icon: result.artworkUrl100,
  };
}

async function downloadImage(link, bundle) {
  const filename = '_' + bundle + '.jpg';
  const filepath = path.resolve(iconsDir, filename);
  if (fs.existsSync(filepath)) {
  }

  const resp = await axios({
    method: 'get',
    url: link,
    responseType: 'stream',
  });

  await resp.data.pipe(fs.createWriteStream(filepath));

  return filename;
}

async function loadImageData(filename) {
  try {
    const buf = await fs.promises.readFile(path.resolve(iconsDir, filename));
    return buf.toString('base64');
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = {
  loadImageData,
  downloadImage,
  loadFromAppStore,
};
