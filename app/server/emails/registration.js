const keys = require('../../../config/keys');

module.exports = function(name, lastname, email) {
  return {
    from: `Konstantin Dergachev 👻 ${keys.emailFrom}`,
    to: `${name} ${lastname} ${email}`,
    subject: 'Account successful created',
    text: 'Welcome to our guitar shop',
    html: `
    <body style="margin: 0; padding: 0;">
      <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 600px;">
        <tr>
          <td style="background-color: #999592; margin: 0 auto;">
            <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Welcome to waves</h1>
          </td>
        </tr>
        <tr>
          <td style="margin: 0 auto;">
            <a href="/" style="box-sizing: border-box; color: #999592 !important; font-family: Arial, Helvetica, sans-serif; line-height: 1.4; margin: 0; text-decoration: none;"><img class="full-width" src="https://media.giphy.com/media/RIm19GefKk3kY/giphy.gif" style="vertical-align: sub; width: 100%;"></a>
          </td>
        </tr>
        <tr>
          <td style="background-color: #999592; margin: 0 auto;">
            <p style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;font-size:10px">
              Your account are successful created
            </p>
          </td>
        </tr>
      </table>
      <hr/>
      <span>Check our guitars: <a href="${keys.baseUrl}">Waves</a></span>
    </body>
    `,
  };
};