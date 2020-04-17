import { Permission } from "./../src/entity/Group";

const permissions: Permission[] = [
  "READ",
  "WRITE",
  "DELETE",
  "SHARE",
  "UPLOAD_FILES",
];

export const groups = Array(5)
  .fill(1)
  .map((_, i) => ({
    name: `testName${i}`,
    permissions: [permissions[i]],
  }));
