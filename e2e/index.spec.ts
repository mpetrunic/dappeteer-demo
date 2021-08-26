import { createServer, Server } from "http"
import path from "path";
import handler from 'serve-handler';
import puppeteer, { Browser } from 'puppeteer';
import {Dappeteer, launch, setupMetamask} from '@nodefactory/dappeteer';
import {expect} from "chai";

describe("Dappeteer test", function () {
    
    let server: Server;
    let browser: Browser;
    let metamask: Dappeteer;

    before(async function () {
        server = createServer((request, response) => {
            return handler(request, response, {
                public: path.join(__dirname, '..', 'build'),
                cleanUrls: true,
            });
        });
        await new Promise<void>((resolve) => {
            server.listen(3000, async () => {
                console.log('Running at http://localhost:3000');
                resolve();
            });
        });
        try {
            browser = await launch(puppeteer);
            metamask = await setupMetamask(browser, {password: "Test123456!"});
        } catch (error) {
            console.log(error);
            throw error;
        }

    });

    after(async function () {
        await browser.close()
        server.close();
    })

    it("metamask connect working", async function() {
        const page = await browser.newPage();
        //load dapp
        await page.goto("http://localhost:3000");
        //click metamask connect btn
        const connectBtn = await page.$(".connectBtn");
        if(!connectBtn) expect.fail("missing button");
        await connectBtn.click();
        //approve metamask connect prompt
        await metamask.approve();
        try {
            //wait for react to update dom
            await page.waitForSelector('.balance', {timeout: 3000, visible: true});
        } catch(e) {

        }
        //get balance
        const balance = await page.$eval('.balance', element => element.innerHTML);
        expect(balance).equal("0.000 ETH")
    })

})