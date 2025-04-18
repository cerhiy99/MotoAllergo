const cron = require('node-cron');
const ParseController = require('./Parse');

class Scheduler {
  static scheduleGetAllProductLinks() {
    console.log(
      'Планувальник запущено. Завдання буде виконуватись кожні 3 дні.'
    );

    cron.schedule('0 0 */3 * *', async () => {
      try {
        console.log('🔄 Виконується автоматичне оновлення каталогу...');
        await ParseController.getAllProductLinks(
          { json: (data) => console.log('✅ Отримані посилання:', data) },
          null,
          () => {}
        );
        console.log('✅ Каталог оновлено успішно.');
      } catch (error) {
        console.error('❌ Помилка під час оновлення каталогу:', error);
      }
    });
  }
}

module.exports = Scheduler;
