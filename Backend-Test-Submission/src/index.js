
import { Log } from '../../logging-middleware/logging.js';
import { app } from './app.js';

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
    await Log("backend", "info", "service", `Backend is running on port ${PORT}`);
    console.log(`Server is running on port ${PORT}`);
})