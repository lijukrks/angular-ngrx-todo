import { v4 as uuidv4 } from "uuid";

export const TodoList = {
    TODO : [
        {
         id: uuidv4(),
         name: 'study',
         completed: false
        },
        {
        id: uuidv4(),
        name: 'play',
        completed: false
    }
]
};
