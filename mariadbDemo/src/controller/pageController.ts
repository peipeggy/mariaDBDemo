import { Contorller } from "../abstract/Contorller";
import { Request, Response } from "express";
import { logger } from "../middlewares/log";
import { Service } from "../abstract/Service";
import { PageService } from "../Service/PageService";
import { DB } from "../app";  // 引入 DB 來執行查詢

require('dotenv').config();

export class PageController extends Contorller {
  protected service: Service;

  constructor(){
    super();
    this.service = new PageService();
  }

  // 新的 sendPage 函數，查詢 Reservations 並顯示結果
  public async sendPage(Request: Request, Response: Response) {
    try {
      // 查詢 Reservations 表
      await DB.connection?.query("USE lab_b310;");
      const reservations = await DB.connection?.query("SELECT * FROM Reservations;");
      
      // 將查詢結果傳遞到前端頁面
      Response.render("index", { reservations });
    } catch (error) {
      logger.error("Error fetching reservations: ", error);
      Response.status(500).send("Server Error");
    }
  }
}
