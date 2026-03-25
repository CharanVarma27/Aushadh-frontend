import puppeteer from 'puppeteer';

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let hasError = false;

    page.on('pageerror', err => {
        console.log('PAGE ERROR:', err.toString());
        hasError = true;
    });
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('CONSOLE ERROR:', msg.text());
            hasError = true;
        }
    });

    console.log("Navigating to dashboard...");
    await page.goto('http://localhost:5173/admin', { waitUntil: 'networkidle2' });
    
    if (!hasError) console.log("NO ERRORS FOUND. Page loaded cleanly!");

    await browser.close();
})();
