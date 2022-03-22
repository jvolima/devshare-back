-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "id_post" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "comments_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "id_post" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "post_likes_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "post_likes_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
