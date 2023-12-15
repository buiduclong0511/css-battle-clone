const puppeteer = require("puppeteer");
const Downloader = require("nodejs-file-downloader");
const path = require("path");
const fs = require("fs");
const dayjs = require("dayjs");

const Task = require("../models/task.model");

const sleep = async (delay) => {
    await new Promise((res) => {
        setTimeout(() => {
            res(true);
        }, delay);
    });
};

const CSS_BATTLE_ORIGIN = "https://cssbattle.dev";

const addTask = async (info) => {
    const [date, month, year] = info.time.split("/");

    const taskImagesFolder = path.resolve(
        __dirname,
        `../public/images/tasks/${info.id}`
    );
    if (!fs.existsSync(taskImagesFolder)) {
        await fs.mkdir(taskImagesFolder, () => {});
    }
    const fileName = "target.png";
    const downloader = new Downloader({
        url: info.imageSrc,
        directory: taskImagesFolder,
        fileName,
    });

    await downloader.download();

    const task = {
        id: info.id,
        image: `/images/tasks/${info.id}/${fileName}`,
        colors: JSON.stringify(info.colors),
        createdAt: dayjs(`${month}-${date}-${year}`).toISOString(),
        updatedAt: dayjs(`${month}-${date}-${year}`).toISOString(),
    };

    await Task.create(task);
};

const run = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://cssbattle.dev/daily");
    await page.waitForNetworkIdle();
    const links = await page.evaluate(async (CSS_BATTLE_ORIGIN) => {
        const links = Array.from(
            document.querySelectorAll(".target-tile--daily>.shadow-link")
        );
        return links.map(
            (link) => `${CSS_BATTLE_ORIGIN}${link.getAttribute("href")}`
        );
    }, CSS_BATTLE_ORIGIN);

    for (const [index, link] of links.entries()) {
        const { pathname } = new URL(link);
        const id = pathname.replace("/play/", "");
        const task = await Task.findOne({ where: { id } });

        if (task) {
            console.log(`${index + 1}/${links.length}`);
            continue;
        }

        await page.goto(link);
        await sleep(2000);
        await page.evaluate(() => {
            const button = document.querySelector(
                ".btn-group.btn-group--center button"
            );
            if (button) {
                button.click();
            }
        });
        const info = await page.evaluate(async () => {
            const time = document.querySelector("h2.level").textContent.trim();
            const imageSrc = document
                .querySelector(".item__content>img")
                .getAttribute("src");
            const colors = Array.from(
                document.querySelectorAll(".colors-list button")
            ).map((item) => item.textContent.trim());

            return { time, imageSrc, colors };
        });

        await addTask({ ...info, id });
        console.log(`${index + 1}/${links.length}`);
    }

    await page.close();
    await browser.close();
};

run();
