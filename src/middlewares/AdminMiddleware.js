export default async (req, res, next) => {
  try {
    const user = await req.postgres.users.findOne({
      where: {
        id: req.user,
      },
    });

    if (user.role != "admin" && user.role != "superadmin")
      throw "You do not have permission to promote!";

    // req.admin = user.role == "admin";
    req.super_admin = user.role == "superadmin";

    next();
  } catch (e) {
    res.status(401).json({
      ok: false,
      message: e + "",
    });
  }
};
