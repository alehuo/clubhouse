// Key service

const keyHolders = [
  {
    id: 1,
    name: "John Doe",
    date: new Date(2018, 3, 7),
    studentUnion: "Student union",
    keyDesc: "24 hr"
  },
  {
    id: 2,
    name: "Test User",
    date: new Date(2014, 3, 7),
    studentUnion: "Student union",
    keyDesc: "24 hr"
  }
];

const getKeys = async => Promise.resolve(keyHolders);

export default { getKeys };
