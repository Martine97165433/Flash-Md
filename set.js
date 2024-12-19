const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0ZyM3JLOHRHS012UnpSRUEyUUdpZEhrbkowU1l5Z2FvM0o3SFM1T3NsOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUtrYjg2NjgzMTMwOUU4YVYycjkrNFloWlZIdzZwdjhObGtaVlhxbkFYOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvTEhJWW1qd0RZQktRQWhrdkY0cldtRW9oY3oxd3RTaEpxd0ZwQ2JWRkVVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxaTFQYnJJNW5reVN0UW5RZ3dhWS90WEkvZHYvT2QrT1huRFQrRlF2WGlZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVIbHRkcitjYWJGT1BaVjVKMjdHQ3UxMU5nUWNMVFVuYnc5c29xVHkzbUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlWWWhabm1zc2xOZ0pBS0NEZ3gwUURZc2VSYzhCeklpU0pVM3pYT0Q3alE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0xlYllnenlnbjBoblpBM3QxTnVyeVN3TFU4cWRrQXc1VStKOGZhcXpXOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0FPcjBDMHJZZ25JZ0svSWZoaEZVbGViZUtUT2RxelI4RlY5azRrVzRVVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inh5QmhnbWpxYmV3NVc2dHBLY3FPbTVTK3lzdnQyOExKTHhCN051RFY5dGs0cTFSQ3dDK3NlUU5lY0U1SVFFME5pMis2RGw0eE1STUlhUGF6VXM1aGpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDUsImFkdlNlY3JldEtleSI6Imh1M1lOM2huOHVvLzhoR3RVa0JoVFhPVzRpMVVXR0N6dG5vNXlHeXozMlE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImRieUFmY0NNUkdPb0RQRVlSNDhoTFEiLCJwaG9uZUlkIjoiYzkxZDQ1ZTYtNzk0ZC00MDk3LWI2MDUtN2Y2M2RlZmRlOGIyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlNOXJFblB4U1dSM3lIS0R2d1p4QjFVbzZZUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVdjdZa3JITEYxaE90ZGpVY2x3dWhFazJZaFU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSE1LQkxNTUQiLCJtZSI6eyJpZCI6IjUwOTMxNzM4MzUxOjhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xmTzZsQVE2c3lPdXdZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkhNZFFZeFZ4dXk1UlA3UFJPNWxiZWlJTWxJbjVMMFVoYzJsNjAyT2pCVEk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlVjUnZZNnI0WHArMnVyR3BhNUpmWE9PaWgzeFlQY2xtY1haYklNcnJ5QmtSMTlxNU9ZMWpBTU84T3RORHZMMEZEakRCYjhmM0NBWnJ5bWZIRC9UdUJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJiSnl1WGlBU0VXUDNWRHZTMjZ3UElxYW1ialFtSjBZM1I4UU1WTm1Sb0IzbWxZNUpleGpTVXlOa2xGNEJYYXpjZGNIMllxK1hCdFhvci9YM1RGaUJndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjUwOTMxNzM4MzUxOjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUnpIVUdNVmNic3VVVCt6MFR1Wlczb2lESlNKK1M5RklYTnBldE5qb3dVeSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNDU4MzkzOCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBOGoifQ==',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "kelly-tec",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "31738351",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
