import { makeVar } from "@apollo/client";
import { NotifType,Token,User,Level,Question,Notification } from "./types";



export const userState = makeVar<User|null>(null);
export const tokenState = makeVar<Token|null>(null);

export const questionsState = makeVar<Question[]>([]);
export const levelsState = makeVar<Level[]>([])







export const notificationState = makeVar<Notification|null>(null);
export const setNotification = (type: NotifType, message: string):void=>{
    const notification = {
      type,
      message
    }
    console.log('notification received ',notification)
  notificationState(notification);
    setTimeout(() => {
      notificationState(null);
    },4000)
   
}

