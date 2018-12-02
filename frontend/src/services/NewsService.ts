// Newspost service
import customAxios from "./custom-axios";

const newsPosts = [
  {
    postId: 1,
    author: { id: 1, name: "user1" },
    title: "Welcome to our site",
    message: "Welcome to the new clubhouse management website.",
    date: new Date(2018, 1, 1, 12, 55),
  },
  {
    postId: 2,
    author: { id: 1, name: "user1" },
    title: "Welcome to our site 2",
    message: "Welcome to the new clubhouse management website.",
    date: new Date(2018, 1, 1, 12, 55),
  },
  {
    postId: 3,
    author: { id: 1, name: "user1" },
    title: "Welcome to our site 3",
    message: "Welcome to the new clubhouse management website.",
    date: new Date(2018, 1, 1, 12, 55),
  },
];

const getNewsposts = async (token: string) => {
  const response = await customAxios(token).get("api/v1/newspost");
  return response.data;
};

const addNewspost = async (token: string, title: string, message: string) => {
  const result = await customAxios(token).post(
    "api/v1/newspost",
    {
      title,
      message,
    },
    {
      baseURL: process.env.REACT_APP_BACKEND_URL,
    },
  );
  return result.data;
};

const editNewspost = async (
  token: string,
  id: number,
  title: string,
  text: string,
) => Promise.resolve({ id, title, text });

const deleteNewspost = async (token: string, id: number) =>
  Promise.resolve(true);

export default { getNewsposts, addNewspost, deleteNewspost, editNewspost };
