import { Request, Response, NextFunction } from 'express';
import {v4 as uuidv4} from 'uuid';
import { Telegram } from 'telegraf';
const bot: any = new Telegram(process.env.BOT_TOKEN as string);

export interface Image {
    Domain: string;
    First_Name: string;
    Last_Name: string;
    Agency_Name: string;
    Suburb: string;
    Mobile: string;
    Search_Term: string;
  } 
  const delay = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

const sendPhoto = async (req: Request, res: Response, next: NextFunction) => {
    console.log(process.env.CHAT_ID);
    const Image: Image = req.body.Image;
    const imgSrc: string = req.body.imgSrc;
    let longUuid = uuidv4();
    const img_url = req.body.host+'/api/image/'+longUuid; 
    try {
          var base64Data = imgSrc.replace(/^data:image\/png;base64,/, "");
          await require("fs").writeFile("data/"+longUuid+".png", base64Data, 'base64', function(err: any) {
            console.log(err);
          });
          await delay(1000);
          // await bot.sendPhoto(process.env.CHAT_ID, { source: "data/"+longUuid+".png"}, {
          //   caption: Image.First_Name + " " + Image.Last_Name + " - " + Image.Agency_Name + '\n #url '+img_url,
          // });
          await bot.sendMessage(process.env.CHAT_ID, Image.First_Name + " " + Image.Last_Name + " - " + Image.Agency_Name + '\n' + '#url '+img_url, { parse_mode: "html" });
          console.log(img_url);
          return res.status(200).json({
              img_url: req.body.protocol + '//' + img_url
          });
        } catch(err) {
          console.log(err);
          return res.status(200).json({
              result: false
          });
        }

};
const getPhoto = async (req: Request, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  var base64Img = require('base64-img');
  try {
    var imgData = base64Img.base64Sync("data/"+uuid+".png");
    var base64Data = imgData.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    var img = Buffer.from(base64Data, 'base64');
    res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
    });
    res.end(img);
  } catch(err) {
    console.log(err);
    return res.status(200).json({
        result: false
    });
  }
};

export default { sendPhoto, getPhoto };