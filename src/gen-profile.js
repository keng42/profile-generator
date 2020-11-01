const assert = require('assert');
const fs = require('fs');
const path = require('path');

const tpl = require('./template');
const {
  loadFromAppStore,
  downloadImage,
  loadImageData,
} = require('./app-store');

async function genProfile(profileName) {
  const dataStr = await fs.promises.readFile(
    path.resolve(__dirname, `../data/${profileName}.json`),
    'utf8'
  );
  const profileData = JSON.parse(dataStr);

  const itemTexts = [];

  for (let i = 0; i < profileData.items.length; i++) {
    const item = profileData.items[i];

    if ((!item.bundle || !item.icon) && item.fromAppStore) {
      const info = await loadFromAppStore(item.fromAppStore);
      assert(info, `load from app store fail: ${item.fromAppStore}`);
      item.bundle = item.bundle || info.bundle;
      if (!item.icon) {
        item.icon = await downloadImage(info.icon, item.bundle);
        assert(
          item.icon,
          `download image for ${item.bundle} fail: ${info.icon}`
        );
      }
    }

    item.iconData = await loadImageData(item.icon);

    assert(
      item.bundle && item.label && item.iconData,
      `missing fields: ${JSON.stringify(item)}`
    );

    const itemText = tpl.genProfileItem({
      PH_ITEM_LABEL: item.label,
      PH_ITEM_BUNDLE: item.bundle,
      PH_ITEM_ICON: item.iconData,
      PH_ITEM_URL: item.url || ' ',
      PH_ITEM_INDEX: i + 1,
    });
    itemTexts.push(itemText);
  }

  const profileText = tpl.genProfile({
    PH_PROFILE_NAME: profileData.name,
    PH_PROFILE_ITEMS: itemTexts.join('\n'),
  });

  await fs.promises.writeFile(
    path.resolve(__dirname, `../data/${profileName}.mobileconfig`),
    profileText
  );

  return 'done';
}

module.exports = { genProfile };
