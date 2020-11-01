const uuid = require('uuid');

const profileTpl = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PayloadContent</key>
	<array>
		PH_PROFILE_ITEMS
	</array>
	<key>PayloadDescription</key>
	<string>Created by iOS Icon Themer Profile Generator 0.1.0 on Nov 1, 2020 at 12:06:04</string>
	<key>PayloadDisplayName</key>
	<string>PH_PROFILE_NAME</string>
	<key>PayloadIdentifier</key>
	<string>PH_PROFILE_DOMAIN.PH_PROFILE_UUID</string>
	<key>PayloadOrganization</key>
	<string>iOS Icon Themer</string>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>PH_PROFILE_UUID</string>
	<key>PayloadVersion</key>
	<real>1</real>
</dict>
</plist>
`;

const profileItemTpl = `
		<dict>
			<key>FullScreen</key>
			<true/>
			<key>Icon</key>
			<data>PH_ITEM_ICON</data>
			<key>Label</key>
			<string> PH_ITEM_LABEL </string>
			<key>PayloadDisplayName</key>
			<string>PH_ITEM_LABEL</string>
			<key>PayloadIdentifier</key>
			<string>PH_ITEM_DOMAIN.PH_ITEM_UUID.PH_ITEM_INDEX</string>
			<key>PayloadType</key>
			<string>com.apple.webClip.managed</string>
			<key>PayloadUUID</key>
			<string>PH_ITEM_UUID</string>
			<key>PayloadVersion</key>
			<real>1</real>
			<key>Precomposed</key>
			<true/>
			<key>TargetApplicationBundleIdentifier</key>
			<string>PH_ITEM_BUNDLE</string>
			<key>URL</key>
			<string>PH_ITEM_URL</string>
    </dict>
`;

function genProfileItem({
  PH_ITEM_LABEL,
  PH_ITEM_BUNDLE,
  PH_ITEM_ICON,
  PH_ITEM_URL = ' ',
  PH_ITEM_INDEX = 1,
  PH_ITEM_UUID = uuid.v4(),
  PH_ITEM_DOMAIN = 'com.keng42.iosprofile',
}) {
  return `${profileItemTpl}`
    .replace(/PH_ITEM_LABEL/g, PH_ITEM_LABEL)
    .replace(/PH_ITEM_BUNDLE/g, PH_ITEM_BUNDLE)
    .replace(/PH_ITEM_ICON/g, PH_ITEM_ICON)
    .replace(/PH_ITEM_URL/g, PH_ITEM_URL)
    .replace(/PH_ITEM_INDEX/g, PH_ITEM_INDEX)
    .replace(/PH_ITEM_UUID/g, PH_ITEM_UUID)
    .replace(/PH_ITEM_DOMAIN/g, PH_ITEM_DOMAIN);
}

function genProfile({
  PH_PROFILE_NAME,
  PH_PROFILE_ITEMS,
  PH_PROFILE_UUID = uuid.v4(),
  PH_PROFILE_DOMAIN = 'com.keng42.iosprofile',
}) {
  return `${profileTpl}`
    .replace(/PH_PROFILE_ITEMS/g, PH_PROFILE_ITEMS)
    .replace(/PH_PROFILE_NAME/g, PH_PROFILE_NAME)
    .replace(/PH_PROFILE_UUID/g, PH_PROFILE_UUID)
    .replace(/PH_PROFILE_DOMAIN/g, PH_PROFILE_DOMAIN);
}

module.exports = {
  genProfileItem,
  genProfile,
};
