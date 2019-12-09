import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import { csv } from "csvtojson";

const read = createReadStream("./assets/node_mentoring_t1_2_input_example.csv");
const write = createWriteStream("./assets/example.txt");

const errLogger = err => err && console.log(err);

pipeline(read, csv(), write, errLogger);
