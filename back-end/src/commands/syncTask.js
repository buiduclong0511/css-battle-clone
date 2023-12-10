const puppeteer = require("puppeteer");
const Downloader = require("nodejs-file-downloader");
const path = require("path");
const dayjs = require("dayjs");
const Task = require("../models/task.model");

const run = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://cssbattle.dev/daily");

    await page.waitForNetworkIdle();

    const links = await page.evaluate(async () => {
        const images = Array.from(
            document.querySelectorAll(".target-tile--daily>img")
        );
        return images.map((image) => image.getAttribute("src"));
    });

    const days = Array.from({ length: links.length }).map((item, index) =>
        dayjs().subtract(index, "days").format("DD-MM-YYYY")
    );

    const downloaders = links.map(
        (link, index) =>
            new Downloader({
                url: link,
                directory: path.resolve(__dirname, "../public/images"),
                fileName: `task_${days[index]}.png`,
            })
    );

    const tasks = downloaders.map((downloader) => downloader.download());
    await Promise.allSettled(tasks);

    const taskData = days.map((day, index) => ({
        image: `/images/task_${day}.png`,
        createdAt: dayjs().subtract(index, "days").toISOString(),
        updatedAt: dayjs().subtract(index, "days").toISOString(),
    }));
    await Task.bulkCreate(taskData);

    await page.close();
    await browser.close();
};

run();
