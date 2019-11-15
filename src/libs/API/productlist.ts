export const Route = '/api/productlist'

export interface Response {
    code: number;
    data: Datum[];
}

export interface Datum {
    Flag:        boolean;
    factory:     string;
    product:     string;
    productID:   number;
    productType: ProductType;
}

export enum ProductType {
    抓拍机 = "抓拍机",
    结构化 = "结构化",
    识别机 = "识别机",
}
