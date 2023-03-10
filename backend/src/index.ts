import { PrismaClient } from "@prisma/client";
import express from "express";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";

const prisma = new PrismaClient();
const app = express();
const port: number = 8080;

const corsOptions: CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/lastUser", async (req, res) => {
  const lastUser = await prisma.users.findMany({
    select: {
      id: true,
    },
    orderBy: {
      id: "desc",
    },
    take: 1,
  });
  res.json(lastUser);
});

app
  .route("/users")
  .get(async (req, res) => {
    const users = await prisma.users.findMany();
    res.json(users);
  })
  .post(async (req, res) => {
    console.log(req.body);
    const user = await prisma.users.create({
      data: req.body,
    });
    res.json(user);
  });

app
  .route("/users/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    const user = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(user);
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    const user = await prisma.users.delete({
      where: {
        id: Number(id),
      },
    });
    console.log(user);
    console.log(`User ${id} has been deleted successfully.`);
  });

app
  .route("/posts")
  .get(async (req, res) => {
    const posts = await prisma.posts.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(posts);
  })
  .post(async (req, res) => {
    console.log(req.body);
    const post = await prisma.posts.create({
      data: req.body,
    });
    res.json(post);
  });

app
  .route("/posts/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    const post = await prisma.posts.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(post);
  })
  .delete(async (req, res) => {
    const postID = req.params.id;
    const post = await prisma.posts.delete({
      where: {
        id: Number(postID),
      },
    });
    console.log(post);
    console.log(`Post ${postID} has been deleted successfully.`);
  });

app
  .route("/comments")
  .get(async (req, res) => {
    const comments = await prisma.comments.findMany();
    res.json(comments);
  })
  .post(async (req, res) => {
    console.log(req.body);
    const comment = await prisma.comments.create({
      data: req.body,
    });
    res.json(comment);
  });

app
  .route("/comments/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    const comment = await prisma.comments.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(comment);
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    const comment = await prisma.comments.delete({
      where: {
        id: Number(id),
      },
    });
    console.log(comment);
    console.log(`Comment ${id} has been deleted successfully.`);
  });

app
  .route("/likes")
  .get(async (req, res) => {
    const likes = await prisma.likes.findMany();
    res.json(likes);
  })
  .post(async (req, res) => {
    console.log(req.body);
    const like = await prisma.likes.create({
      data: req.body,
    });
    res.json(like);
  });

app
  .route("/likes/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    const like = await prisma.likes.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(like);
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    const like = await prisma.likes.delete({
      where: {
        id: Number(id),
      },
    });
    console.log(like);
    console.log(`Like ${id} has been deleted successfully.`);
  });

app
  .route("/dislikes")
  .get(async (req, res) => {
    const dislikes = await prisma.dislikes.findMany();
    res.json(dislikes);
  })
  .post(async (req, res) => {
    console.log(req.body);
    const dislike = await prisma.dislikes.create({
      data: req.body,
    });
    res.json(dislike);
  });

app
  .route("/dislikes/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    const dislike = await prisma.dislikes.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(dislike);
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    const dislike = await prisma.dislikes.delete({
      where: {
        id: Number(id),
      },
    });
    console.log(dislike);
    console.log(`Dislike ${id} has been deleted successfully.`);
  });

app
  .route("/messages")
  .get(async (req, res) => {
    const messages = await prisma.messages.findMany();
    res.json(messages);
  })
  .post(async (req, res) => {
    console.log(req.body);
    const message = await prisma.messages.create({
      data: req.body,
    });
    res.json(message);
  });

app
  .route("/messages/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    const message = await prisma.messages.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(message);
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    const message = await prisma.messages.delete({
      where: {
        id: Number(id),
      },
    });
    console.log(message);
    console.log(`Message ${id} has been deleted successfully.`);
  });

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
