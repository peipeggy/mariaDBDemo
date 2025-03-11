import { Contorller } from "../abstract/Contorller";
import { Request, Response } from "express";
import { logger } from "../middlewares/log";
import { Service } from "../abstract/Service";
import { PageService } from "../Service/PageService";
import { DB } from "../app";
require('dotenv').config();

export class ReservationsController extends Contorller {
    protected service: Service;

    constructor() {
        super();
        this.service = new PageService();
    }

    // 取得預約資料
    public async getReservations(req: Request, res: Response) {
        const { student_id, seat_id, sort, order } = req.query;
    
        let query = `SELECT * FROM Reservations`;
        const queryParams: any[] = [];
        const conditions: string[] = [];
    
        if (student_id) {
            conditions.push(`student_id = ?`);
            queryParams.push(student_id);
        }
        if (seat_id) {
            conditions.push(`seat_id = ?`);
            queryParams.push(seat_id);
        }
    
        if (conditions.length > 0) {
            query += ` WHERE ` + conditions.join(" AND ");
        }
    
        const validSortFields = ["reservation_id", "student_id", "seat_id", "create_time"];
        const validOrderFields = ["ASC", "DESC"];
        const sortField = validSortFields.includes(sort as string) ? sort : "reservation_id";
        const sortOrder = validOrderFields.includes(order as string) ? order : "ASC";
    
        query += ` ORDER BY ${sortField} ${sortOrder}`;
    
        try {
            await DB.connection?.query("USE lab_b310;");
    
            console.log("執行的 SQL 查詢:", query);
            console.log("使用的參數:", queryParams);
    
            const result = await DB.connection?.query(query, queryParams);
            console.log("查詢結果:", result);
    
            const rows = Array.isArray(result) ? result : [];
    
            if (!rows || !Array.isArray(rows)) {
                return res.status(500).json({ error: "無效的查詢結果格式", details: rows || "查無資料" });
            }
    
            // 強制將 create_time 格式化為 ISO 字串
            const formattedRows = rows.map((row: any) => ({
                ...row,
                create_time: new Date(row.create_time).toISOString(),  // 確保日期格式正確
            }));
    
            res.json(formattedRows);
        } catch (error) {
            const err = error as Error;
            logger.error("資料查詢失敗:", err.message);
            res.status(500).json({ error: "資料查詢失敗", details: err.message });
        }
    }
    
    
    
    
    
}
