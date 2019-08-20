// server import
const logger = require("koa-logger");
const bodyParser = require("koa-body");
const static = require("koa-static");

const path = require("path");
const mongoose = require("mongoose");

const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");

const server = new Koa();
const router = new Router();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

// controller
const userController = require("./controllers/user.controller");
// logger request
server.use(logger());
// body
server.use(bodyParser({ multipart: true }));
// set static folder
server.use(static("."));
const staticPath = "./static";
const uploads = "./uploads";
server.use(static(path.join(__dirname, staticPath)));
server.use(static(path.join(__dirname, uploads)));

(async () => {
  try {
    await app.prepare();

    // router.get("/test", async ctx => {
    //   await nextApp.render(ctx.req, ctx.res, "/test", ctx.query);
    //   ctx.respond = false;
    // });

    /**
     * @Route POST /add
     * @POST_content { name: String, avatar: file, age: String | number }
     */
    router.post("/add", userController.addUser);

    /**
     * @Route PUT /edit
     * @PUT_content { name: String, avatar: file, age: String | number }
     */
    router.put("/edit/:id", userController.editUser);
    router.get("/get", userController.getUser);
    router.get("/user/:id", userController.getUserById);
    router.delete("/user/:id", userController.deleteById);

    server.use(router.routes()).use(router.allowedMethods());

    /**
     * #####################################################
     */

    // custom 404
    server.use(async function(ctx, next) {
      await next();
      if (ctx.body || !ctx.idempotent) {
        ctx.body = { msg: "Page not found !" };
      }
    });

    router.get("*", async ctx => {
      await handler(ctx.req, ctx.res);
      ctx.respond = false;
    });

    mongoose
      .connect("mongodb://localhost:27017/managerUser", {
        useNewUrlParser: true
      })
      .then(() => console.log("connected mongoose"))
      .catch(err => console.error(err));

    server.use(router.routes());
    server.listen(port, () => console.log("App running on port 3000"));
  } catch (e) {
    console.error(e);
    process.exit();
  }
})();
