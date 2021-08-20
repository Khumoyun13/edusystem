import JWT from "../modules/jwt.js";

export default async (req, res, next) => {
  try {
    const token = await req.headers["authorization"];

    if (!token) throw "Missing validation token!";

    const data = JWT.verifyToken(token);

    if (!data) throw "Invalid token!";

    const session = await req.postgres.sessions.findOne({
      where: {
        session_id: data.id,
      },
    });

    if (!session) throw "Session not found or expired!";

    if (req.headers["user-agent"] != session.user_agent)
      throw "Invalid user agent!";

    if (session.session_number === 3)
      throw "The number of logged devices cannot be more than 3!";

    req.user = session.user_id;

    next();
  } catch (e) {
    res.status(401).json({
      ok: false,
      message: e + "",
    });
  }
};
