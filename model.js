const fsp = require('fs').promises;
const path = require('path');

class Model {
  static async getTopics() {
    const files = await fsp.readdir('./topics');
    return files.map((file) => ({
      name: path.basename(file, '_flashcard_data.txt'),
      value: file,
    }));
  }

  static async loadQestions(themFile) {
    const content = await fsp.readFile(`./topics/${themFile}`, 'utf-8');
    const subArr = content
      .match(/([^\r\n]+)[\r\n]+([^\r\n]+)/gm)
      .map((el) => el.trim().split('\r\n'));
    const arrContent = subArr.map((el) => ({ question: el[0], correct: el[1] }));
    return arrContent;
  }
}
// getTopics возвращает массив объектов [{name: сокращённое_имя_файла, value: полное_имя_файла}, ...]
// loadQestions возвращает массив объектов [{question: текст_вопроса, correct: правильный_ответ}, ...]

module.exports = Model;
