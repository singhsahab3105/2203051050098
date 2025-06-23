import axios from 'axios';
const LOGGING_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";
const ALLOWED_STACK = ["backend", "frontend"];
const ALLOWED_LEVEL = ["debug", "info", "warn", "error", "fatal"];
const ALLOWED_PACKAGE_BACKEND = ["cache","controller","cron_job","db","domain","handler","repository","route","service","auth","config","middleware","utils"];
const ALLOWED_PACKAGE_FRONTEND = ["api","component","hook","page","state","style","auth","config","middleware","utils"];
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjAzMDUxMDUwMDk4QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsImV4cCI6MTc1MDY3MjIxOCwiaWF0IjoxNzUwNjcxMzE4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTQ1OTkxZmEtYjcxNC00NjQ0LWJhMGMtYmUwMDExZWNiNzU3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicmFtIGtyaXNobmEiLCJzdWIiOiIzNzAxN2JhMS00ZWM4LTRhOWMtYjQxNC1hZWVmZjkxNGM0MmEifSwiZW1haWwiOiIyMjAzMDUxMDUwMDk4QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsIm5hbWUiOiJyYW0ga3Jpc2huYSIsInJvbGxObyI6IjIyMDMwNTEwNTAwOTgiLCJhY2Nlc3NDb2RlIjoiVFJ6Z1dNIiwiY2xpZW50SUQiOiIzNzAxN2JhMS00ZWM4LTRhOWMtYjQxNC1hZWVmZjkxNGM0MmEiLCJjbGllbnRTZWNyZXQiOiJuSFZnQURSY0VyZUZhR1dWIn0.oU455oSdfC2lFIOO8GB8XUQQ0OHqz5v_DZlPkEqoUf8eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjAzMDUxMDUwMDk4QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsImV4cCI6MTc1MDY3MDc1MCwiaWF0IjoxNzUwNjY5ODUwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZDdhZjViZWQtYmFlOS00ZWQ1LTg3MjktMmRmMmVkZDI5NGVhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicmFtIGtyaXNobmEiLCJzdWIiOiIzNzAxN2JhMS00ZWM4LTRhOWMtYjQxNC1hZWVmZjkxNGM0MmEifSwiZW1haWwiOiIyMjAzMDUxMDUwMDk4QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsIm5hbWUiOiJyYW0ga3Jpc2huYSIsInJvbGxObyI6IjIyMDMwNTEwNTAwOTgiLCJhY2Nlc3NDb2RlIjoiVFJ6Z1dNIiwiY2xpZW50SUQiOiIzNzAxN2JhMS00ZWM4LTRhOWMtYjQxNC1hZWVmZjkxNGM0MmEiLCJjbGllbnRTZWNyZXQiOiJuSFZnQURSY0VyZUZhR1dWIn0.y8gvoCcm8fwbJneyrGdOOEh2eg_Yakes6_GTcpp6bPY";
export async function Log(stack, level, packageName, message) {
    try {
        if (!ALLOWED_STACK.includes(stack)) {
            throw new Error(`Invalid stack: ${stack}.`);
        }
        if (!ALLOWED_LEVEL.includes(level)) {
            throw new Error(`Invalid level: ${level}.`);
        }
        const allowedPackages = stack === "backend" ? ALLOWED_PACKAGE_BACKEND : ALLOWED_PACKAGE_FRONTEND;
        if (!allowedPackages.includes(packageName)) {
            throw new Error(`Invalid package: ${packageName}.`);
        }
        const data = { stack, level, package: packageName, message };
        const headers = { Authorization: `Bearer ${ACCESS_TOKEN}` };

        const response = await axios.post(LOGGING_ENDPOINT, data, { headers });

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Failed to log message, status code: ${response.status}`);
        }
        console.log(`Logged message: ${message}`);
    } catch (error) {
        if (error.response) {
            console.error("Logging error: ", error.response.status, error.response.data);
        } else {
            console.error("Logging error:", error.message);
        }
    }
}
