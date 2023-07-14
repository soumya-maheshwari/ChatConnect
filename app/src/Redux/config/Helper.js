export const getSenderUser = (loggedUser, users) => {
  return users[1]?._id === loggedUser?._id ? users[1].name : users[1].name;
};
