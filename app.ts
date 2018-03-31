import * as express from "express";
import * as bodyParser from "body-parser";
import * as five from "johnny-five";

class App {
  public app: express.Application;
  private bodyParser;
  public board: any;
  public led: any;
  public status: boolean = true;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.managerLed();
  }

  middleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  managerLed() {
    this.board = new five.Board();
    this.board.on("ready", function() {
      this.led = new five.Led(13);
    });
  }

  routes() {
    this.app.route("/led").get((req, res) => {
      let _model = req.query.turn;

      if (this.board.isReady) {
        if (_model == "on") {
          this.board.led.on();
        } else {
          this.board.led.off();
        }
      }
      res.send({ result: _model });
    });

    this.app.route("/").get((req, res) => {
      res.send({ result: this.status });
    });
  }
}

export default new App();
