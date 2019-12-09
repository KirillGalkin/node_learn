import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on("line", function(line) {
  rl.output.write(
    line
      .split("")
      .reverse()
      .join("") + "\n"
  );
});
