const Model = require("./Model");
const View = require("./View");

class Controller {
  static async startGame() {
    View.greetings();

    const themes = await Model.getThemes();

    const userData = await View.getUserInfo(themes);

    View.greetUser(userData.userName);

    const questions = await Model.loadQuestions(userData.theme);

    let score = 0;
    for (const q of questions) {
      const userAnswer = await View.askQuestion(q);

      const isTrue = userAnswer === q.correct;

      if (isTrue) {
        score++;
      }
      View.showMiddleRes(isTrue, q);
    }

    View.showResult(score, questions.length);

    await Model.saveResult(userData.userName, {
      score,
      total: questions.length,
      theme: userData.theme,
      date: new Date().toISOString(),
    });
  }
}

module.exports = Controller;
