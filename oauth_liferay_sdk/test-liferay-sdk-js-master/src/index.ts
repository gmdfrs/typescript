import { Order } from './order';
import { Payment } from './payment';
import { Product } from './product';
import { Catalog } from './catalog';
import { Sku } from './sku';
import { Cart } from './cart';
import { StructuredContent } from "./headlessDelivery/structuredContent";
import { applyMixins } from './utils';
import { Base } from './base';

class LiferayOauth2SDK extends Base {}
interface LiferayOauth2SDK extends Order, Payment, Product, Catalog, Sku, Cart, StructuredContent{}
applyMixins(LiferayOauth2SDK, [Order, Payment, Product, Catalog, Sku, Cart, StructuredContent]);

export default LiferayOauth2SDK
