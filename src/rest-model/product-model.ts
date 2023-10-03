type TProductFiles = {
    image: string;
};

class Product {
    name!: string;
    displayName!: string;
    price!: number;
    description?: string;
}

class ProductResponse extends Product {
    files: TProductFiles = new ProductFiles();
}

class ProductFiles {
    image: string = '';
}

export {Product, ProductResponse}
