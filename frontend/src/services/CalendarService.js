// Calendar events

const events = [
  {
    name: "Friday hangouts",
    description: "Friday hangouts at our clubhouse",
    restricted: false,
    startTime: new Date(2018, 3, 25, 18, 0, 0),
    endTime: new Date(2018, 3, 26, 2, 0, 0),
    addedBy: 1,
    unionId: 1,
    locationId: 2
  },
  {
    name: "Board meeting",
    description: "Board meeting 5/2018",
    restricted: true,
    startTime: new Date(2018, 3, 23, 18, 0, 0),
    endTime: new Date(2018, 3, 24, 2, 0, 0),
    addedBy: 1,
    unionId: 1,
    locationId: 1
  }
];

export const eventMapper = event => {
  return {
    id: event.id,
    title: event.name,
    desc: event.description,
    start: event.startTime,
    end: event.endTime
  };
};

const getEvents = async () =>
  new Promise(resolve => {
    setTimeout(() => resolve(events), 1000);
  });

export default { getEvents };
