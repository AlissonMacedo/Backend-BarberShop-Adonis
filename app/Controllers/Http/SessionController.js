"use strict";

const User = use("App/Models/User");

class SessionController {
  async store({ request, reponse, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    if (token) {
      const user = await User.findByOrFail("email", email);

      user.token = token;

      await user.save();

      return { user: user, token: token };
    }

    return token;
  }
}

module.exports = SessionController;
