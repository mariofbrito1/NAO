import {getCustomDateObject} from "../../@jumbo/utils/dateHelper";

export const kanbanBoard = {
  boards: {
    lanes: [
      {
        currentPage: 1,
        id: "board-tasks",
        title: "Tasks",
        cards: [
          {
            id: 1,
            laneId: "board-tasks",
            title:
              "Reference site about Lorem Ipsum, giving information on its origins, as well as a random",
            description: "",
            memberIds: [ 1, 3 ],
            dueDate: new Date(2021, 6, 30),
            activities: [
              {
                id: 3,
                user: {
                  id: 1,
                  name: "Albert Hall",
                  profilePic: "https://via.placeholder.com/150x150",
                  email: "mario@example.com"
                },
                comment: "This is my first comment",
                type: "comment",
                isCover: true,
                createdAt: getCustomDateObject(-1, "day")
              }
            ]
          }
        ]
      },
      {
        currentPage: 1,
        id: "board-progress",
        title: "In Progress",
        cards: []
      },
      {
        currentPage: 1,
        id: "board-done",
        title: "Done",
        cards: []
      }
    ]
  },
  members: [
    {
      id: 1,
      name: "Mario Brito",
      profilePic: "https://via.placeholder.com/150",
      email: "mariofbrito@example.com"
    }
  ]
};
