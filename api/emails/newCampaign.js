'use strict';

module.exports = (contribution_name) => {
  return {
    to: 'hack@loic.io',
    from: 'hack@loic.io',
    subject: 'New campaign',
    html: `Hi there,
      <br><br>

      Our new campaign has just been launched, and I am writing to receive your
      <strong>monthly contribution</strong> on <strong>${contribution_name}</strong>.
      To complete our reporting and ensure the viability of information, please send us
      your contribution <strong>as soon as possible</strong>.
      <br><br>

      You can now send us your contribution thanks to the following link: ...
      <br><br>

      Looking forward to your contribution, please accept, Madam, Sir, my sincere greetings.
      <br><br>

      Yours faithfully.
      <br><br>

      Fabrice Cairon,<br>
      Responsable du reporting risque de crédit Direction des Risques`
  }
};
