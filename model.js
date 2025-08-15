const fsp = require('fs').promises;
const path = require('path');
const { EOL } = require('os');

class Model {
  static async getThemes() {
    const files = await fsp.readdir('./topics');
    return files.map((file) => ({
      name: path.basename(file, '_flashcard_data.txt'),
      value: file,
    }));
  }

  static async loadQuestions(themFile) {
    const content = await fsp.readFile(`./topics/${themFile}`, 'utf-8');
    const subArr = content
      .match(/([^\r\n]+)[\r\n]+([^\r\n]+)/gm)
      .map((el) => el.trim().split(EOL));
    const arrContent = subArr.map((el) => ({ question: el[0], correct: el[1] }));
    return arrContent;
  }
}

module.exports = Model;
