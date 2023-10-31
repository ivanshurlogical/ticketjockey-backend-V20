const userAgents = require('user-agents');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const { eventModel } = require('../models/eventModel');
const { serverTokenLogsModel } = require('./../models/serverTokenLogsModel');

// Use the Stealth plugin to prevent detection of headless browsing
puppeteer.use(StealthPlugin());

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function randomWait(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function simulateMouseMovements(page, element) {
  function randomPoint(center, radius) {
    return center + radius * (Math.random() - 0.5);
  }
  // Simulate human-like mouse movement
  const mouseMovements = 10;
  const box = await element.boundingBox();
  for (let i = 0; i < mouseMovements; i++) {
    await page.mouse.move(
      randomPoint(box.x, box.x + box.width),
      randomPoint(box.y, box.y + box.height)
    );
    await page.waitForTimeout(randomWait(100, 500));
  }
}

async function simulateMouseClick(page) {
  // Simulate human-like clicking behavior
  await page.mouse.move(100, 100);
  await sleep(randomWait(100, 500));
  await page.mouse.down();
  await sleep(randomWait(100, 500));
  await page.mouse.up();
}

async function simulateMouseScrolling(page) {
  await page.evaluate(() => {
    // Simulate human-like scrolling behavior
    const scrollAmount = Math.floor(Math.random() * 500) - 250;
    window.scrollBy(0, scrollAmount);
  });
}

async function simulatePage(page) {
  const bodyHandle = await page.$('body');
  await simulateMouseMovements(page, bodyHandle);
  await bodyHandle.dispose();
  await simulateMouseClick(page);
  await simulateMouseScrolling(page);
}

async function launchPuppeteer(url, debugMode = false) {
  const browser = await puppeteer.launch({
    headless: !debugMode ? 'new' : false,
    slowMo: 250,
    args: ['--no-sandbox', '--start-maximized'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  const userAgent = userAgents.random().toString();
  await page.setUserAgent(userAgent);
  return { browser, page };
}

function getCookieValue(cookieName, cookieString) {
  const cookieList = cookieString.split(';').map((cookie) => cookie.trim());
  for (let cookie of cookieList) {
    if (cookie.startsWith(cookieName + '=')) {
      return cookie.slice(cookieName.length + 1);
    }
  }
  return null;
}

exports.saveTmToken = async () => {
  try {
    let instanceIds = ['i-00806418be846ac87', 'i-079b55f0315ebe360'];
    let data = [];
    for (let index = 0; index < instanceIds.length; index++) {
      const instance = instanceIds[index];

      var random = Math.floor(Math.random() * 10000);
      let url = '';
      // fet TM URL Dynamic
      const eventObj = await eventModel
        .find({
          marketType: 'TM',
          is_deleted: false,
          is_cancel: false,
          is_postponed: false,
          is_match: true,
          eventDate: { $gte: new Date() },
        })
        .skip(random)
        .limit(1);

      if (eventObj.length > 0) {
        url = `https://www.ticketmaster.com/event/${eventObj[0].eventId}`;
        console.log('Browser launched...');
        const { browser, page } = await launchPuppeteer(url);
        try {
          await page.setDefaultNavigationTimeout(0);
          await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 0,
          });
          await Promise.race([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.waitForSelector('#edp-event-header'),
            sleep(5000),
          ]);
          await simulatePage(page);
          const cookies = await page.evaluate(() => {
            // Get cookies from the page
            return document.cookie;
          });
          let reese84Cookie = '';
          if (cookies) {
            reese84Cookie = getCookieValue('reese84', cookies);
            if (reese84Cookie) {
              console.log();
              console.log('reese84 fecthed!');
              console.log(reese84Cookie);
              console.log();
              const total_data = {
                aws_instanceId: instance,
                token: reese84Cookie,
                proxyPort: null,
                proxyType: '',
                platform: 'node',
              };
              await serverTokenLogsModel.create(total_data);
              data.push(total_data);
            } else {
              console.log('reese84 not found!');
            }
          } else {
            console.log('Cookies not found!');
          }
        } catch (error) {
          console.log(error);
        } finally {
          await browser.close();
          console.log('Browser closed...');
        }
        if (index !== instanceIds.length - 1)
          await sleep(randomWait(2000, 5000));
      }
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const eventUnlockOfferLogs = (events) => {
  let eventsAdded = events.map((e) => {
    e.presaleUnlockOffer = false;
    e.foundUnlockPromoNames = null;
    const startDateTime = new Date(new Date().setHours(0, 0, 0, 0));
    const endDateTime = new Date(new Date().setHours(23, 59, 59, 59));
    if (
      e.onSaleDate != undefined &&
      e.presales &&
      e.presales.length > 0 &&
      e.promos !== null &&
      e.promos !== undefined
    ) {
      // Check were less than onsale date
      if (new Date() < new Date(e.onSaleDate)) {
        // For each presale, check if were within the start and end dates
        e.presales.forEach((presale) => {
          if (
            (startDateTime < new Date(presale.startDateTime) &&
              endDateTime > new Date(presale.startDateTime)) ||
            (startDateTime < new Date(presale.endDateTime) &&
              endDateTime > new Date(presale.endDateTime)) ||
            (startDateTime > new Date(presale.startDateTime) &&
              endDateTime < new Date(presale.endDateTime))
          ) {
            const promoNamesArr = Object.keys(e.promos);
            promoNamesArr.forEach((promoName) => {
              if (
                e.promos[promoName] !== undefined &&
                e.promos[promoName] !== '' &&
                e.promos[promoName] !== null
              ) {
                e.foundUnlockPromoNames =
                  e.foundUnlockPromoNames !== null
                    ? {
                        ...e.foundUnlockPromoNames,
                        [promoName]: e.promos[promoName],
                      }
                    : {
                        [promoName]: e.promos[promoName],
                      };
                e.presaleUnlockOffer = true;
              }
            });
          }
        });
      }
    }
    return e;
  });
  eventsAdded = eventsAdded.filter(
    (e) => e.presaleUnlockOffer === true && e.foundUnlockPromoNames !== null
  );
  return eventsAdded;
};

exports.getEventUnlockOfferToken = async () => {
  try {
    let eventList = [];
    let successEventCount = 0;
    let failedEventCount = 0;
    let totalApiCount = 0;
    let successApiCount = 0;
    let failedApiCount = 0;
    let failedTokenCount = 0;
    let inValidCodeCount = 0;
    let alreadyUpdatedCount = 0;

    eventList = await eventModel.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $ne: ['$skyBoxEventId', null] },
              { $eq: ['$is_broadcast', true] },
              { $eq: ['$is_match', true] },
              { $eq: ['$is_monitor', true] },
              { $ne: ['$is_deleted', true] },
              { $ne: ['$is_cancel', true] },
              { $ne: ['$is_archived', true] },
              { $ne: ['$is_blacklist', true] },
              { $ne: ['$is_duplicate', true] },
              { $ne: ['$promos', null] },
              { $gte: ['$eventDate', new Date()] },
            ],
          },
        },
      },
      { $sort: { eventDate: -1 } },
    ]);

    var log = await eventUnlockOfferLogs(eventList);
    console.log('total events', log.length);

    if (log.length > 0) {
      for (const e of log) {
        let is_updated = false;
        let unlockOfferObj = null;
        var existingUnlockOfferKeys = [];

        if (e.unlockOffers !== null) {
          unlockOfferObj = e.unlockOffers;
          existingUnlockOfferKeys = Object.keys(e.unlockOffers);
        }
        for (let key of Object.keys(e.foundUnlockPromoNames)) {
          if (!existingUnlockOfferKeys.includes(key)) {
            try {
              totalApiCount++;

              const url = `https://www.ticketmaster.com/ipa/v2/offercode/validate?eventId=${e.eventId}&code=${e.foundUnlockPromoNames[key]}`;
              const { browser, page } = await launchPuppeteer(url);
              await page.goto(url, {
                waitUntil: 'load',
                timeout: 0,
              });
              await simulatePage(page);
              await page.content();
              const data = await page.evaluate(() => {
                try {
                  return JSON.parse(document.querySelector('body').innerText);
                } catch (error) {
                  return document.querySelector('body').innerText;
                }
              });
              await browser.close();

              if (data?.token) {
                successApiCount++;
                unlockOfferObj =
                  unlockOfferObj !== null
                    ? {
                        ...unlockOfferObj,
                        [key]: data.token,
                      }
                    : { [key]: data.token };
                is_updated = true;
                console.log('Token found...');
              } else {
                inValidCodeCount++;
                console.log('Token not found...');
                console.log(data);
              }
            } catch (error) {
              console.log(error);
              failedApiCount++;
            }
            await sleep(5000);
          }
        }
        if (is_updated) {
          await eventModel.findByIdAndUpdate(e._id, {
            unlockOffers: unlockOfferObj,
          });
          successEventCount++;
          console.log(`getEventUnlockOfferLogs API: ${totalApiCount}`);
          console.log(
            `getEventUnlockOfferLogs success API: ${successApiCount}`
          );
          console.log(`getEventUnlockOfferLogs failed API: ${failedApiCount}`);
          console.log(
            `getEventUnlockOfferLogs failed token: ${failedTokenCount}`
          );
          console.log(
            `getEventUnlockOfferLogs invalid code: ${inValidCodeCount}`
          );
        } else if (unlockOfferObj != null) {
          alreadyUpdatedCount++;
        } else {
          failedEventCount++;
        }
      }
    }
    console.log(
      `getEventUnlockOfferLogs success events: ${successEventCount} out of total events : ${log.length}`
    );
    console.log(
      `getEventUnlockOfferLogs already updated events: ${alreadyUpdatedCount} out of total events : ${log.length}`
    );
    console.log(
      `getEventUnlockOfferLogs failed events: ${failedEventCount} out of total events : ${log.length}`
    );
    console.log(`getEventUnlockOfferLogs API: ${totalApiCount}`);
    console.log(`getEventUnlockOfferLogs success API: ${successApiCount}`);
    console.log(`getEventUnlockOfferLogs failed API: ${failedApiCount}`);
    console.log(`getEventUnlockOfferLogs failed token: ${failedTokenCount}`);
    console.log(`getEventUnlockOfferLogs invalid code: ${inValidCodeCount}`);
  } catch (err) {
    console.log(err);
  }
};
