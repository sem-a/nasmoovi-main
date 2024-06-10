const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", require("./routes/users"));
app.use("/api/wedding", require("./routes/wedding"));
app.use("/api/portfolio", require("./routes/portfolio"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/video", require("./routes/video"));

// Обработка запросов от поисковых ботов
app.use((req, res, next) => {
    if (req.headers['user-agent'].includes('bot')) {
        // Отдавать статические страницы для поисковых ботов
        const staticPagePath = path.join(__dirname, 'path/to/static/page.html');
        fs.readFile(staticPagePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.send(data);
        });
    } else {
        next();
    }
});

module.exports = app;