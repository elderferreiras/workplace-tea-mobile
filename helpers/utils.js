import React from 'react';
import { Image } from "react-native";
import DefaultText from "../components/DefaultText";

export const getDate = (date, short) => {
    const objDate = new Date(date);
    const day = objDate.getDate();
    let month = getMonth(objDate.getMonth() + 1);

    if(short) {
        month = month.slice(0, 3);
    }
    const year = objDate.getFullYear();
    return `${month} ${day}, ${year}`
};

export const getContent = (content) => {
    if(/<[a-z][\s\S]*>/i.test(content)) {
        const res = getGIF(content);

        if(res) {
            return <Image source={{uri: res}} style={{height: 200}}/>;
        }
    } else {
        return <DefaultText>{content}</DefaultText>;
    }

    return '';
};

export const getGIF = (str) => {
    const regex = /<img.*?src=['"](.*)['"] .*\/>/;
    const result = regex.exec(str);

    if(result.hasOwnProperty(1)) {
        return result[1];
    }

    return false;
};

export const getMonth = (month) => {
  switch (month) {
      case 1: return "January";
      case 2: return "February";
      case 3: return "March";
      case 4: return "April";
      case 5: return "May";
      case 6: return "June";
      case 7: return "July";
      case 8: return "August";
      case 9: return "September";
      case 10: return "October";
      case 11: return "November";
      case 12: return "December";
      default: return "";
  }
};

export const getShortDate = (date, short) => {
    const objDate = new Date(date);
    let month = objDate.toLocaleString('default', { month: 'long' });

    return `${month.toString().slice(0,3)} ${objDate.getDate()}, ${objDate.getFullYear()}`
};

export const getWorkplaceId = () => {
    return 'e6f9c2dc-a191-44f2-8d33-5792d16224e7'; //'e6f9c2dc-a191-44f2-8d33-5792d16224e7'; //1da8f310-c096-4558-88d5-7c6f21344a00
};
