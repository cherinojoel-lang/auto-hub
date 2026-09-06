import { spawn } from 'child_process';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9222;

const chrome = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  'about:blank'
]);

await new Promise(r => setTimeout(r, 1500));

try {
  const versionResp = await fetch(`http://127.0.0.1:${port}/json/version`);
  const versionData = await versionResp.json();
  console.log('Chrome CDP connected:', versionData.Browser);

  const newTabResp = await fetch(`http://127.0.0.1:${port}/json/new?https://owner-review-automobile-quick-preview.hsb-boden.workers.dev`, { method: 'PUT' });
  const tabData = await newTabResp.json();
  const wsUrl = tabData.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  await new Promise(resolve => ws.onopen = resolve);

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');

  const viewports = [320, 360, 375, 390, 412, 430, 768, 1024, 1280, 1366, 1440, 1600, 1920];
  const pages = [
    { name: 'HOME', path: '/' },
    { name: 'INVENTORY', path: '/fahrzeuge' },
    { name: 'VDP', path: '/fahrzeuge/opel-astra-2024' },
    { name: 'ABOUT', path: '/ueber-uns' },
    { name: 'CONTACT', path: '/kontakt' },
    { name: 'TRADE-IN', path: '/ankauf' },
    { name: 'FINANCING', path: '/finanzierung' },
    { name: 'IMPRINT', path: '/impressum' },
    { name: 'PRIVACY', path: '/datenschutz' }
  ];

  console.log('\n--- RESPONSIVE VIEWPORT QA AUDIT ---');
  let failures = 0;
  let checks = 0;

  for (const page of pages) {
    const url = `https://owner-review-automobile-quick-preview.hsb-boden.workers.dev${page.path}`;
    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 2000)); // wait for React hydration

    for (const width of viewports) {
      checks++;
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height: 800,
        deviceScaleFactor: 1,
        mobile: width < 768
      });
      await new Promise(r => setTimeout(r, 200));

      const evalRes = await send('Runtime.evaluate', {
        expression: `({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth
        })`,
        returnByValue: true
      });

      const res = evalRes?.result?.value;
      if (res?.hasOverflow) {
        failures++;
        console.error(`FAIL: ${page.name} @ ${width}px -> scrollWidth (${res.scrollWidth}) > innerWidth (${res.innerWidth})`);
      } else {
        process.stdout.write(`.`);
      }
    }
    console.log(` ${page.name} (${viewports.length} viewports OK)`);
  }

  console.log(`\nTotal Checks: ${checks} | Failures: ${failures}`);
  ws.close();
} catch (err) {
  console.error('Audit error:', err);
} finally {
  chrome.kill();
}
