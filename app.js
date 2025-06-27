const express = require("express");
const app = express();
const morgan = require("morgan");
const rootRouter = require("./routes/rootRouter");
const globalMiddleware=require("./middleware/globalMiddleware")



app.use(express.json())

morgan.token("body", (req) => {
  const body = JSON.stringify(req.body);
  return body;
});

  app.use(
    morgan(
      `:method  :url :status :res[content-length]   - :response-time ms  `
    )
  );
app.get("/health-check",(req,res)=>{
  return res.status(200).json({message:"server is running"})
})


app.use("/api/v1",rootRouter);
app.use(globalMiddleware)

module.exports = app;
