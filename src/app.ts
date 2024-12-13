import App from "./server";
import "dotenv/config";

const app = new App();
app.listen(process.env.PORT!);