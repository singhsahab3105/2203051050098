import { Log } from "../../../logging-middleware/logging.js";
import { urlDb } from "../store.js";
function generateCode(length=6) {
    const characters = "abcdefghijklmnopqrstuvwxyz1234567890";
    const result = "";
    for(let i=0;i<length;i++) {
        result+=characters.charAt(Math.floor(Math.random*characters.length));
    }
    return result;
}
export const shortUrl = async(req, res) => {
    const {url,validity,shortCode} = req.body;
    if(!url) {
        await Log("backend", "error", "handler", "Url or Short code not present");
        return res.status(400).json({error: "Url or Short code not present"});
    }
    const code = "";
    if (shortCode) {
        if (!/^[a-zA-Z0-9]{4,16}$/.test(shortCode)) {
            await Log("backend", "warn", "handler", "Invalid shortcode format");
            return res.status(400).json({error: "Shortcode must be 4–16 alphanumeric characters"});
        }
        if (!urlDb.has(shortCode)) {
            code = shortCode;
        } else {
            const attempts = 0;
            do {
                code = generateCode();
                attempts++;
            } while (urlDb.has(code) && attempts < 10);
            if (urlDb.has(code)) {
                await Log("backend", "fatal", "handler", "Failed to generate unique shortcode");
                return res.status(500).json({error: "Could not generate unique shortcode"});
            }
        }
    } else {
        const attempts = 0;
        do {
            code = generateCode();
            attempts++;
        } while (urlDb.has(code) && attempts < 10);
        if (urlDb.has(code)) {
            await Log("backend", "fatal", "handler", "Failed to generate unique shortcode");
            return res.status(500).json({error: "Could not generate unique shortcode"});
        }
    }
    const now = Date.now();
    const expiry = now + ((validity ?? DEFAULT_VALIDITY_MINUTES) * 60 * 1000);
    urlDb.set(code, { originalUrl: url, expiry });
    const fullShortLink = `http://${req.hostname}:${PORT}/${code}`;
    await Log("backend", "info", "handler", "Shortcode created for URL");
    return res.status(201).json({
        shortLink: fullShortLink,
        expiry: new Date(expiry).toISOString(),
    });
}