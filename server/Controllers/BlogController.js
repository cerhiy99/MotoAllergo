const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const ErrorApi = require('../error/ErrorApi');
const { Blog, BlogImg } = require('../models/models');
const striptags = require('striptags');
const he = require('he');

class BlogController {
  static Add = async (req, resp, next) => {
    try {
      const { nameuk, nameru, descriptionuk, descriptionru } = req.body;
      const files = req.files;

      if (!files || Object.keys(files).length === 0) {
        return next(ErrorApi.badRequest('Зображення не завантажені'));
      }

      // Створюємо запис блогу
      const newBlog = await Blog.create({
        nameuk,
        nameru,
        descriptionuk,
        descriptionru,
      });

      const staticDir = path.resolve(__dirname, '../static/blog');
      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
      }

      // Перетворюємо об’єкт з файлами у масив
      const fileArray = Object.values(files);

      for (const file of fileArray) {
        const imageName = `${uuidv4()}.jpg`;
        const filePath = path.join(staticDir, imageName);

        // Записуємо файл на диск
        fs.writeFileSync(filePath, file.data);

        // Створюємо запис у таблиці зображень
        await BlogImg.create({
          src: `blog/${imageName}`,
          blogId: newBlog.id,
        });
      }

      return resp.json({ message: 'Блог створено успішно', blog: newBlog });
    } catch (err) {
      return next(
        ErrorApi.badRequest(err.message || 'Помилка при створенні блогу')
      );
    }
  };

  static GetList = async (req, resp, next) => {
    try {
      let { page, limit } = req.query;

      page = parseInt(page || '1');
      limit = parseInt(limit || '10');
      const offset = (page - 1) * limit;

      const blogs = await Blog.findAndCountAll({
        distinct: true, // Ось це головне
        limit,
        offset,
        include: [{ model: BlogImg }],
        order: [['createdAt', 'DESC']],
      });

      // Обробка опису
      const processedBlogs = blogs.rows.map((blog) => {
        const cleanUk = striptags(blog.descriptionuk || '');
        const cleanRu = striptags(blog.descriptionru || '');

        return {
          ...blog.toJSON(),
          descriptionuk:
            cleanUk.length > 300 ? cleanUk.slice(0, 300) + '...' : cleanUk,
          descriptionru:
            cleanRu.length > 300 ? cleanRu.slice(0, 300) + '...' : cleanRu,
        };
      });

      return resp.json({
        count: blogs.count,
        rows: processedBlogs,
      });
    } catch (err) {
      return next(
        ErrorApi.badRequest(err.message || 'Помилка при отриманні блогів')
      );
    }
  };

  static GetSelect = async (req, resp, next) => {
    try {
      let { id } = req.query;
      id = parseInt(id);
      if (isNaN(id)) {
        return next(ErrorApi.badRequest('Некоректний ID'));
      }

      const blog = await Blog.findOne({
        where: { id },
        include: [{ model: BlogImg }],
      });

      if (!blog) {
        return next(ErrorApi.badRequest('Блог не знайдено'));
      }

      return resp.json({ blog });
    } catch (err) {
      return next(
        ErrorApi.badRequest(err.message || 'Помилка при отриманні блогу')
      );
    }
  };

  static UpdateWithoutImg = async (req, resp, next) => {
    try {
      const { id, nameuk, nameru, descriptionuk, descriptionru } = req.body;

      if (!id) {
        return next(ErrorApi.badRequest('ID обовʼязковий'));
      }

      const blog = await Blog.findByPk(id);

      if (!blog) {
        return next(ErrorApi.badRequest('Блог з таким ID не знайдено'));
      }

      blog.nameuk = nameuk || blog.nameuk;
      blog.nameru = nameru || blog.nameru;
      blog.descriptionuk = descriptionuk || blog.descriptionuk;
      blog.descriptionru = descriptionru || blog.descriptionru;

      await blog.save();

      return resp.json({ message: 'Блог успішно оновлено', blog });
    } catch (err) {
      return next(
        ErrorApi.badRequest(err.message || 'Помилка при оновленні блогу')
      );
    }
  };

  static UpdateBlogImgs = async (req, resp, next) => {
    try {
      console.log(232);
      const { id } = req.body;
      console.log(2313);
      const files = req.files;
      console.log(2314);

      if (!id) {
        return next(ErrorApi.badRequest('ID обовʼязковий'));
      }
      console.log(233);
      if (!files || Object.keys(files).length === 0) {
        return next(
          ErrorApi.badRequest('Немає нових зображень для завантаження')
        );
      }
      console.log(234);

      const blog = await Blog.findByPk(parseInt(id), { include: BlogImg });

      if (!blog) {
        return next(ErrorApi.badRequest('Блог з таким ID не знайдено'));
      }
      const staticDir = path.resolve(__dirname, '../static/blog');

      // Видаляємо старі фото з файлової системи та бази
      for (const img of blog.blogImgs) {
        const filePath = path.join(staticDir, path.basename(img.src));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        await img.destroy();
      }

      // Додаємо нові фото
      const fileArray = Object.values(files);

      for (const file of fileArray) {
        const imageName = `${uuidv4()}.jpg`;
        const filePath = path.join(staticDir, imageName);

        fs.writeFileSync(filePath, file.data);

        await BlogImg.create({
          src: `blog/${imageName}`,
          blogId: blog.id,
        });
      }

      return resp.json({ message: 'Зображення успішно оновлено' });
    } catch (err) {
      return next(
        ErrorApi.badRequest(err.message || 'Помилка при оновленні зображень')
      );
    }
  };
}

module.exports = BlogController;
