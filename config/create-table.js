const pool = require("./db");

const tables = [
  `
    CREATE TABLE IF NOT EXISTS languages(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(255)
    )
    `,
  `
    CREATE TABLE IF NOT EXISTS tags(
        id SERIAL PRIMARY KEY,
        tag_name VARCHAR(255) NOT NULL,
        description VARCHAR(255)
    )
    `,
  `
    CREATE TABLE IF NOT EXISTS news_tags(
        id SERIAL PRIMARY KEY,
        news_id BIGINT,
        tag_id BIGINT,
        CONSTRAINT fk_news_tags_news FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE,
        CONSTRAINT fk_news_tags_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    )
    `,
  `
    CREATE TABLE IF NOT EXISTS category(
        id SERIAL PRIMARY KEY,
        category_name VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        parent_id BIGINT,
        CONSTRAINT fk_category_parent FOREIGN KEY (parent_id) REFERENCES category(id) ON DELETE SET NULL
    )
    `,
  `
    CREATE TABLE IF NOT EXISTS news_with_lang(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content VARCHAR(255),
        summary_news VARCHAR(255),
        lang_id BIGINT,
        CONSTRAINT fk_news_with_lang FOREIGN KEY (lang_id) REFERENCES languages(id) ON DELETE CASCADE
    )
    `,
  `
    CREATE TABLE IF NOT EXISTS news(
        id SERIAL PRIMARY KEY,
        news_id BIGINT,
        category_id BIGINT,
        author_id BIGINT,
        status VARCHAR(50),
        published_at DATE,
        source VARCHAR(100),
        lang_id BIGINT,
        CONSTRAINT fk_news_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE,
        CONSTRAINT fk_news_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_news_lang FOREIGN KEY (lang_id) REFERENCES languages(id) ON DELETE CASCADE
    )
    `,
  `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(50),
        password VARCHAR(50),
        role VARCHAR(50),
        is_active BOOLEAN,
        created_at DATE,
        interests BIGINT, 
        bookmarks BIGINT
    )
    `,
  `
    CREATE TABLE IF NOT EXISTS authors(
        id SERIAL PRIMARY KEY,
        user_id BIGINT UNIQUE,
        is_approved BOOLEAN DEFAULT FALSE,
        is_editor BOOLEAN DEFAULT FALSE,
        CONSTRAINT fk_authors_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    `,
  `
    CREATE TABLE IF NOT EXISTS media(
        id SERIAL PRIMARY KEY,
        news_id BIGINT,
        media_type VARCHAR(50),
        media_url VARCHAR(255),
        uploaded_at DATE,
        CONSTRAINT fk_media_news FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
    )
    `,
  `
    CREATE TABLE IF NOT EXISTS comments(
        id SERIAL PRIMARY KEY,
        user_id BIGINT,
        news_id BIGINT,
        content VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reply_comment_id BIGINT,
        is_approved BOOLEAN DEFAULT FALSE,
        is_deleted BOOLEAN DEFAULT FALSE,
        views BIGINT DEFAULT 0,
        likes BIGINT DEFAULT 0,
        CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_comments_news FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE,
        CONSTRAINT fk_reply_comment FOREIGN KEY (reply_comment_id) REFERENCES comments(id) ON DELETE CASCADE
    )
    `,
  `
    CREATE TABLE IF NOT EXISTS reports(
        id SERIAL PRIMARY KEY,
        user_id BIGINT,
        news_id BIGINT,
        reason VARCHAR(255),
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_reports_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_reports_news FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
    )
    `,
  `
    CREATE TABLE IF NOT EXISTS likes(
        id SERIAL PRIMARY KEY,
        news_id BIGINT,
        user_id BIGINT,
        liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_likes_news FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE,
        CONSTRAINT fk_likes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    `,
  `
    CREATE TABLE IF NOT EXISTS views(
        id SERIAL PRIMARY KEY,
        news_id BIGINT,
        user_id BIGINT,
        viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_views_news FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE,
        CONSTRAINT fk_views_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
     `,
  `
    CREATE TABLE IF NOT EXISTS notifications(
        id SERIAL PRIMARY KEY,
        user_id BIGINT,
        news_id BIGINT,
        msg_type VARCHAR(50) NOT NULL,
        is_checked BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_notifications_news FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
    )
    `,
];

module.exports = async (req, res) => {
  for (const item of tables) {
    await pool.query(item);
  }
};
