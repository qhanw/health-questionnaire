import { RG } from "../typings";

async function users(parent: any, args: any, context: RG.Content, info: any) {
  const users = await context.prisma.user.findMany();

  return users;
}

async function profile(parent: any, args: any, context: RG.Content, info: any) {
  const { uid, prisma } = context;
  const profile = await prisma.profile.findUnique({
    where: { uid },
  });

  return profile;
}

export default { users, profile };
