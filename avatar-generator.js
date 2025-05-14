import { avataaars } from "@dicebear/collection";
import { toWebp } from "@dicebear/converter";
import { createAvatar } from "@dicebear/core";
import { writeFileSync } from "fs";
for (let index = 0; index < 1024; index++) {
  const avatar = createAvatar(avataaars, { seed: new Date().toISOString() });
  const content = avatar.toString();
  writeFileSync(`./public/images/avatars/avatar${index + 1}.svg`, content, {
    flag: "w",
  });
}
