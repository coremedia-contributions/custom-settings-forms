import { lazyConst } from "@jangaroo/runtime";
import CSFServiceImpl from "./CSFServiceImpl";

const csfService: { _: CSFServiceImpl } = lazyConst(() => new CSFServiceImpl());

export default csfService;
