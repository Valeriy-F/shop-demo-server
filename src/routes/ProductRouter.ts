import ARouter from './ARouter';
import ProductController from '../controller/ProductController';

class ProductRouter extends ARouter {
    protected initRoutes(): void {
        this.router.get("", ProductController.getAll)
        this.router.get("/:name", ProductController.getByName)
        this.router.post("", ProductController.post)
        this.router.put("/:name", ProductController.put)
        this.router.patch("/:name/image", ProductController.patchImage)
        this.router.delete("/:name", ProductController.delete)
    }
}

export default new ProductRouter().getRouter()
