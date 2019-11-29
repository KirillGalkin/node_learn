import { createReadStream, createWriteStream } from "fs";
import { Transform, pipeline } from "stream";
import { csv } from "csvtojson";

const read = createReadStream("./assets/node_mentoring_t1_2_input_example.csv");
const write = createWriteStream("./assets/example.txt");

const csvToJson = new Transform({
  transform(chunk, encoding, cb) {
    // TODO: may not be a complete csv format, use encoding
    // TODO: how to handle if writing is slower then reading
    csv()
      .fromString(chunk.toString())
      .preFileLine(line => line)
      .subscribe(jsonObj => {
        this.push(JSON.stringify(jsonObj) + "\n");
      });
    cb();
  }
});

pipeline(read, csvToJson, write);
