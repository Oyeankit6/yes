import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server as SocketIOServer } from "socket.io";
import { connect } from "./src/dbconfig/db.js"; // Adjust this path based on your structure
import Results from "./src/models/publicSchema.js"; // Your schema (publicSchema.js)
import os from "os";
import cors from "cors";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

let period = 2024202501; // Default period

// Function to fetch the latest period from the database
const fetchLatestPeriod = async () => {
  try {
    const latestResult = await Results.findOne().sort({ _id: -1 });
    if (latestResult) {
      period = latestResult.period + 1; // Increment period from the last saved one
    }
  } catch (err) {
    console.error("Error fetching latest period:", err);
  }
};

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new SocketIOServer(server);

  // Timer state
  let startTime = Date.now();
  const timerDuration = 120 * 1000;

  // Function to generate random number and color
  const generateRandomNumberAndColor = () => {
    const number = Math.floor(Math.random() * 10);
    let color;

    // Determine color based on number
    if ([1, 3, 7, 9].includes(number)) {
      color = "green";
    } else if (number === 0) {
      color = "violet-red";
    } else if (number === 5) {
      color = "green-violet";
    } else {
      color = "red";
    }

    return { number, color };
  };

  const emitTimer = async () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const remainingTime = timerDuration - (elapsedTime % timerDuration);

    if (remainingTime <= 1000) {
      startTime = Date.now();

      // Declare and initialize variables inside the scope before usage
      const parity = generateRandomNumberAndColor();
      const sapre = generateRandomNumberAndColor();
      const bcone = generateRandomNumberAndColor();
      const emerd = generateRandomNumberAndColor();

      try {
        const parityResult = {
          period,
          results: {
            Parity: parity,
            Sapre: sapre,
            Bcone: bcone,
            Emerd: emerd,
          },
        };

        const existingResult = await Results.findOne({ period });
        if (!existingResult) {
          const newResult = new Results(parityResult);
          await newResult.save();

          const count = await Results.countDocuments();

          // If there are more than 150 results, delete the oldest one
          if (count > 150) {
            const oldestResult = await Results.findOne().sort({ createdAt: 1 });
            if (oldestResult) {
              await Results.deleteOne({ _id: oldestResult._id });
            }
          }

          console.log("Result saved:", parityResult);

          period++; // Increment period after saving result
        } else {
          console.log("Duplicate period found. Skipping save.");
        }
      } catch (err) {
        console.error("Error checking/saving result to database:", err);
      }
    }

    // Emit timer event to connected clients with valid variables
    io.emit("timer", {
      remainingTime: Math.floor(remainingTime / 1000),
      period,
      // parity: parity.number, // emit number and color separately
      // parityColor: parity.color,
      // sapre: sapre.number,
      // sapreColor: sapre.color,
      // bcone: bcone.number,
      // bconeColor: bcone.color,
      // emerd: emerd.number,
      // emerdColor: emerd.color,
    });
  };

  setInterval(emitTimer, 1000);

  io.on("connection", (socket) => {
    console.log("A user connected");
    emitTimer(); // Emit timer information on connection

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  connect().then(async () => {
    await fetchLatestPeriod();
    const port = process.env.PORT || 3000;

    server.listen(port, "0.0.0.0", (err) => {
      if (err) throw err;

      // Fetch the local IP address to display in the console
      const networkInterfaces = os.networkInterfaces();
      const localIP = Object.values(networkInterfaces)
        .flat()
        .find((iface) => iface.family === "IPv4" && !iface.internal).address;

      console.log(`Server running on http://${localIP}:${port}`);
    });
  });
});
