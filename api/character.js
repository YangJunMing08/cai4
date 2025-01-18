const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const CharacterAI = require('node_characterai');

module.exports = async (req, res) => {
    try {
        const { character, text } = req.query;

        if (!character || !text) {
            return res.status(400).json({
                error: "Parameter 'character' dan 'text' wajib diisi!",
            });
        }

        const characterAI = new CharacterAI();
        await characterAI.authenticateWithToken('3c70cb2af0a4925c9c0e6f98d40ae6a745398079'); // Ganti dengan token Anda

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Untuk server
        });

        const chat = await characterAI.createOrContinueChat(character);
        const response = await chat.sendAndAwaitResponse(text, true);

        await browser.close();

        res.status(200).json({ response: response.text });
    } catch (error) {
        res.status(500).json({
            error: "Terjadi kesalahan",
            details: error.message,
        });
    }
};
