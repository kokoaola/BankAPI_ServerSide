// Node.jsサーバースクリプトのメインファイル
const path = require("path");

// fastifyフレームワークのインポートとインスタンス化
const fastify = require("fastify")({
  logger: false,
});

// 静的ファイルの設定
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

// フォームデータのパースに必要
fastify.register(require("@fastify/formbody"));

// テンプレートエンジンとしてhandlebarsを使用する設定
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

// SEOデータの読み込みとパース
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

// ホームページのルート定義
fastify.get("/", function (request, reply) {
  let params = { seo: seo };

  if (request.query.randomize) {
    const colors = require("./src/colors.json");
    const allColors = Object.keys(colors);
    let currentColor = allColors[(allColors.length * Math.random()) << 0];

    params = {
      color: colors[currentColor],
      colorError: null,
      seo: seo,
    };
  }

  return reply.view("/src/pages/index.hbs", params);
});

// POSTリクエストを処理するルート定義
fastify.post("/", function (request, reply) {
  let params = { seo: seo };
  let color = request.body.color;

  if (color) {
    const colors = require("./src/colors.json");
    color = color.toLowerCase().replace(/\s/g, "");

    if (colors[color]) {
      params = {
        color: colors[color],
        colorError: null,
        seo: seo,
      };
    } else {
      params = {
        colorError: request.body.color,
        seo: seo,
      };
    }
  }

  return reply.view("/src/pages/index.hbs", params);
});

// サーバーの起動とエラーログの出力
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
