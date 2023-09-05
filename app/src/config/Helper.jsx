export const getSenderUser = (loggedUser, users) => {
  // console.log(users[0].name, users[1].name);
  if (!Array.isArray(users) || users.length < 2) {
    return "Unknown User";
  }

  const [user1, user2] = users;

  if (!user1 || !user2 || !user1.name || !user2.name) {
    return "Unknown User";
  }
  return users[0]?._id === loggedUser.id ? users[1].name : users[0].name;
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i + 1].sender._id !== userId
  ) {
    return 33;
  } else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  ) {
    return 0;
  } else {
    return "auto";
  }
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const getFullSenderDetails = (loggedUser, users) => {
  if (!Array.isArray(users) || users.length < 2) {
    return "Unknown User";
  }

  const [user1, user2] = users;

  if (!user1 || !user2 || !user1.name || !user2.name) {
    return "Unknown User";
  }

  return users[0]._id === loggedUser.id ? users[1] : users[0];
};
