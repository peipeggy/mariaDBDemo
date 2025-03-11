import { Route } from "../abstract/Route";
import { PageController } from "../controller/pageController";

export class PageRoute extends Route {
  protected url: string;
  protected Contorller = new PageController();

  constructor() {
    super();
    this.url = '/';
    this.setRoutes();
  }

  protected setRoutes(): void {
    // 設置首頁路由，當訪問根路徑時，調用 PageController 的 sendPage 方法
    this.router.get(`${this.url}`, (req, res) => {
      this.Contorller.sendPage(req, res);
    });
  }
}
