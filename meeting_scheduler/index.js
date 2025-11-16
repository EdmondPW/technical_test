const meeting = [
  { id: 1, start: "09:00", end: "10:30" },
  { id: 2, start: "09:45", end: "11:00" },
  { id: 3, start: "10:40", end: "12:00" },
  { id: 4, start: "13:00", end: "14:00" },
];

function countMaxMeet() {
  const sortedMeet = meeting.toSorted((a, b) => {
    new Date(`2025-11-17T15:${a.end}`);
    const timeA = new Date(`2025-11-16T15:${a.end}`);
    const timeB = new Date(`2025-11-16T15:${b.end}`);

    return timeA.getTime() - timeB.getTime();
  });
  console.log(sortedMeet);

  let maxMeet = [];
  let result = {
    scheduled: [],
    count: 0,
  };
  maxMeet.push(sortedMeet.shift());
  result.scheduled.push(maxMeet[0].id);
  result.count++;
  let maxMeetIndex = 0;
  sortedMeet.forEach((meet) => {
    if (meet.start >= maxMeet[maxMeetIndex].end) {
      maxMeet.push(meet);
      maxMeetIndex++;
      result.count++;
      result.scheduled.push(meet.id);
    }
  });
  console.log(`scheduled: ${result.scheduled}`);
  console.log(`count: ${result.count}`);
}

countMaxMeet();
