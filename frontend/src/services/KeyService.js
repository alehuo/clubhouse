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

const keyTypes = [
  {
    id: 1,
    title: "24h"
  },
  {
    id: 2,
    title: "Day"
  }
];

const getKeys = async => Promise.resolve(keyHolders);

const getKeyTypes = async => Promise.resolve(keyTypes);

export default { getKeys, getKeyTypes };
