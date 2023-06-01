async function user(parent: any, args: any, context: any, info: any) {
  return context.prisma.user.findMany();
}

export default { user };
