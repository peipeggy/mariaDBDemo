import { Route } from "../abstract/Route";
import { ReservationsController } from "../controller/ReservationsController";

export class ReservationsRoute extends Route {
    protected url: string;
    protected Contorller = new ReservationsController();

    constructor() {
        super();
        this.url = '/reservations/';  // 更新路徑
        this.setRoutes();
    }

    protected setRoutes(): void {
        // 篩選預約的 API 路由
        this.router.get(`${this.url}list`, (req, res) => {
            this.Contorller.getReservations(req, res);
        });
    }
}