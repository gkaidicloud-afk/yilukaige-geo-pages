import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const configPath = path.join(root, 'private', 'baidu-submit.json');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function normalizeUrls(values) {
  return values
    .flatMap((value) => String(value || '').split(/\r?\n/))
    .map((value) => value.trim())
    .filter(Boolean);
}

if (!fs.existsSync(configPath)) {
  console.error('Missing private/baidu-submit.json. Add endpoint from Baidu ordinary submit first.');
  process.exit(1);
}

const config = readJson(configPath);
const urls = normalizeUrls(process.argv.slice(2));

if (!config.endpoint || !/^https?:\/\/data\.zz\.baidu\.com\/urls\?/.test(config.endpoint)) {
  console.error('Invalid Baidu submit endpoint in private/baidu-submit.json.');
  process.exit(1);
}

if (!urls.length) {
  console.error('Usage: node tools/submit-baidu.mjs https://www.example.com/page.html');
  process.exit(1);
}

const response = await fetch(config.endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
  },
  body: `${urls.join('\n')}\n`,
});

const body = await response.text();
let parsed;

try {
  parsed = JSON.parse(body);
} catch {
  parsed = { raw: body };
}

console.log(JSON.stringify({
  status: response.status,
  submitted: urls.length,
  result: parsed,
}, null, 2));
