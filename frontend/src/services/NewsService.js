// Newspost service

const newsPosts = [
  {
    postId: 1,
    author: { id: 1, name: "user1" },
    title: "Welcome to our site",
    message: "Welcome to the new clubhouse management website.",
    date: new Date(2018, 1, 1, 12, 55)
  },
  {
    postId: 2,
    author: { id: 1, name: "user1" },
    title: "Welcome to our site 2",
    message: "Welcome to the new clubhouse management website.",
    date: new Date(2018, 1, 1, 12, 55)
  },
  {
    postId: 3,
    author: { id: 1, name: "user1" },
    title: "Welcome to our site 3",
    message: "Welcome to the new clubhouse management website.",
    date: new Date(2018, 1, 1, 12, 55)
  }
];

const getNewsposts = async token => Promise.resolve(newsPosts);

const addNewspost = async (token, title, text) =>
  Promise.resolve({ title, text });

const deleteNewspost = async (token, id) => Promise.resolve(true);

export default { getNewsposts, addNewspost, deleteNewspost };
