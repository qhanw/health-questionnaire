import { RG } from "../typings";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils";

async function login(parent: any, args: any, context: RG.Content, info: any) {
  const user = await context.prisma.user.findUnique({
    where: { username: args.username },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ uid: user.id }, APP_SECRET);

  return { token, user };
}

async function profile(parent: any, args: any, context: RG.Content, info: any) {
  const { uid, prisma } = context;

  const nextProfile = await prisma.profile.upsert({
    where: { uid },
    update: { ...args },
    create: { ...args, uid },
  });

  // if (id) {
  //   nextProfile = await prisma.profile.update({
  //     where: { uid },
  //     data: { ...rest },
  //   });
  // } else {
  //   nextProfile = await prisma.profile.create({
  //     data: { ...args, uid },
  //   });
  // }

  if (nextProfile) {
    return {
      success: true,
      message: `执行成功`,
      id: nextProfile.id,
    };
  }

  return { success: false, message: `数据库写入错误` };
}

export default { login, profile };
