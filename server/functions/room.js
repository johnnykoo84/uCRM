const Room = require('../db/room');

module.exports = {
  checkIfRoomExistByRoomName: (spaceId, roomName) => {
    return new Promise((resolve, reject) => {
      Room
      .where({
        space_id: spaceId,
        name: roomName,
      })
      .fetch()
      .then((result) => {
        console.log('result', result)
        if (result) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      })
      .catch(err => (resolve(false)));
    });
  },

  getRoomListBySpaceId: (spaceid) => {
    return new Promise((resolve, reject) => {
      Room.where({ space_id: spaceid })
      .fetchAll()
      .then(result => (resolve(result.toJSON())))
      .catch(err => (reject(err)));
    });
  },

  addNewRoom: (body) => {
    return new Promise((resolve, reject) => {
      new Room(body)
      .save()
      .then(result => (resolve(result)))
      .catch(err => (reject(err)));
    });
  },
};
