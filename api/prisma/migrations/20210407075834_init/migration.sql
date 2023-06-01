-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "mobile" TEXT,
    "age" INTEGER,
    "address" TEXT,
    "bio" TEXT,
    "avatar" TEXT,
    "uid" INTEGER NOT NULL,
    FOREIGN KEY ("uid") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuestionsOptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" INTEGER NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "questionsOptionsId" INTEGER NOT NULL,
    FOREIGN KEY ("questionsOptionsId") REFERENCES "QuestionsOptions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QA" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mobile" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile.uid_unique" ON "Profile"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "QA.mobile_unique" ON "QA"("mobile");
