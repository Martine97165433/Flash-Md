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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUlCOGFyaDZqaWFQaTB1YVpZblQrVlo5a2RJSWtuNHlNU3EzR25UdHpVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRjRvTVBtM2d3anVPczVzQU5EaCt4eWZCTHJhN3d4a1dsdjNTUStGRytUbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvSDVPd1BmTTNPMDlXVTJLWFo2TFhVeWpneFdxQTdSa1VIeW5xdTR5S0Z3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVNzZybCs4TWZaMW9vb0wwajlEakZueUVRNDh5S3hGTk45N0lZYkU2Nlc4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdManY1ZVd4Q3M1MkV3OGRRNTdKaXBTOHFvT2NWUmNzV1JpZEh4K1pzVVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNvV2ovTk5ZOWNobUZtZkxXR004bkZQb1QxYm1ycWp2UzV0OHBVRmlkbGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0drVlkzM2ZGN0JoMWVRUnJHTjFuemZYenhFR3RtYlFpM3l3N1NqUittMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicnRGT1FWRnJScFJjekkyczJ0T2tPVUIrbHNERFc0bkUydkxBbUFNQVEyVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iit2WlpkdWhzQVFxMTVaRWRIaDB4UWZUSENkQ2VpUUJ6Q1NQWHU4dHNPUjRNTGhWbFg1emxxM29LTzVmbU1CNUFiblkxbzhjNGlTTGpSOFFwR2l3b0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA2LCJhZHZTZWNyZXRLZXkiOiIxS1I1YnNjRGhNOStUSlVkUG9lUkRLZzlhNFNYOU5vRVlIUmVWL1Q4TFRrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI2Z0NGRnJnLVNwQ0hkaFVtOW9KUDBRIiwicGhvbmVJZCI6ImQwODA0MTI0LTE1ZGYtNDE5NC1hNzM2LTgwMDdmZDFiNWVmZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhODZYVDViN01OWDVzWkVZN1B5VGFEUFRRTGs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUmt5cDNudkFRMHY5dGs5UzJGVkJESDk5a2hBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IldKTjRDTURRIiwibWUiOnsiaWQiOiI1MDkzMTczODM1MTo1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMVE82bEFRMnJIM3VnWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJITWRRWXhWeHV5NVJQN1BSTzVsYmVpSU1sSW41TDBVaGMybDYwMk9qQlRJPSIsImFjY291bnRTaWduYXR1cmUiOiJiOWVMeThJaGh6ZUhIeGhHREttQUZReWJLQVlCTGdqdmtQTitZVmgrR3FoaHFadFBlTFFYei9PQU1HSzhTdjBEanN2VWwyWnVUNXVWOE9kZE43UlpDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoicE1wU3hXTGgvajdOVzZ2NW9YclUwZFFlRmpMVTQ4QlJFN1NYUmxTWVZxek50d1VWbWFQQTlFK0s4TmxZU0p3MTZLMHpoYWtYOFU3UFdyZmNFbXZDRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDkzMTczODM1MTo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJ6SFVHTVZjYnN1VVQrejBUdVpXM29pREpTSitTOUZJWE5wZXROam93VXkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzQyMDM2MjMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSjNsIn0=',
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
