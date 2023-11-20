
/**
 * @author Doraemon
 * @name Doraemon_青龙定时任务迁移
 * @origin 红灯区
 * @version 1.0.1
 * @description 青龙任务定时迁移
 * @rule ^(定时任务迁移)$
 * @admin true
 * @public true
 * @priority 1000
 * 
  说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件

      Doraemon_青龙定时任务迁移.js 放到自用插件下

  更新日志：
      v1.0.0 插件上线
      2023.11.20 v1.0.1 更新 插件更名
*/

const QlMod = require("../红灯区/mod/AmQlMod");
const ql = require('./mod/Doraemon_ql');

// 源
const qlNum = 3;
// 目标
const targetQlNum = 7;

/** Code Encryption Block[419fd178b7a37c9eae7b7426c4a04203d45e01cd4c8344ffddd8d874f1b64a310129e93a27f962be5676c0579b18b8527400eadbcb674d79e9bd41ee12c429c917a466b7b49f7e41423cf380526c3bb403830ae489be3d3b80ef89316ed3e942130ef110801aa5277b6b87ee785ce20a8d9aa105285ea5409b863ebe5dd21fc9b31674d2de89a7107cb096788b52c98d76efcc11bed7afc9c068d6c24d2baff6455496e7b02bbc4878447b0eb6c7ef611d2984f2ea793248971ab863161772a29874ee1875d45d329e9d757f04140edd8c33f26ad03859b7a3f8f8668fb3a2276aae132507f3cc3219eea5ffb230ac7dd4cbae4aac086eadd5400e0dd65a6cc684f52a7d3143901c3b50ff3a455aa4f5c5cce0165fe499710fc62951dae115f24ffd2d2fac7b3d299ab47d37328a40b2c7248d744e5c8b23ed1a6b1a490aae31533f89d3b4f511fa9a1b622356f148ad9ce12dee5a358a4efd29692c722ce4aa08c4f3fb4adf995f35a3d5e270601e509a719936fa0ef90c0a1cd562c67394dcd03d3ff02254a18e46af41e3851e8553076492043cb8c20531298863e6878cc40a8a59a630df6db15145b3cebedd9dd56b75396b9f69a8562dcc65d1afcbf7b346c2ce8d386a615f4af1be67ee13bce5813fce6196303660f7fd22149a8ed0060c3809a4a02f960713822dbbf7eeab635093f4e96f7d93cd6eebd5674678435dcb6de66020ccd16b009a01819ac990451dd942a1ac94a65df410633a8ee62d9cd7718cfa87750ebc6bbc7ca1141138a782aff8da8b37135b0d709577c0695f3e1af1577890e12dddd680fdf3d3bb050cc40a6e51d19baff748c886cdaa473e018c088ddd0daf3b0a1cc3ddfeeb24fb6ed1fbe4f1808f5850a5e65c7097e8ffa70222c0554ebde21a948c069909b14e2f2dd902f5b2c7d5ae79af3f342b3f771b70fc8747beb239bb9f14600408bc39c054246f3908caf14edf1b0fd48b184ef6da00dafb36eab330693c3569f0f66c414dd3378cd5e57d014207fecab03ce2a34be217890f30d78bcb58f9d30dd0fe0f1700888f2f57227d56f69634dee67d53c68a623c86fb731cc87262573950d402e1eb4d6714594b98a06a22f577919ea326e362865f0a1ab149bc1364c3004de5dcbcd0127107c8e352d8105b730cf278a6b6e116546a869f50af4fb8d11b88bf85e25c99ca46e3e733a7ae053ce6b7f13c476fa88f916752235b345aa3f4cfe94c4c9f4027bdbda7f23e08c35c2234fc49af8eb6c5ed7bea8ab42fa4cf9b6442ee78c6b685191640845955e1d93b2632742be85a2996ca98a3037b8278d6569fcff1d398a2ffd3531084c961da78e949e1cfba22e5bfee31b634b6b9247723064dfdafa7b0f983762485240c86c3438aa474dfbba87230087a868e616595fbfa9380dc3af99b097cb95c5ad58e771c86c130d6422a1de9cb24d786d89d2474dba189949304d77ea43b7e4e07d2c89d1cdf9b18163c343b085b9d5d6e2e39085f811d8c3b21834e6d916c3fdb62044070c5342501d7bfcef1bd0e448422a92ffce26bea6f5ad05d9ab3274be78603ee112119ee195cb9c7740aa6d39d77c0487a55cdee7b32245516b859fea302241ad99d5d86a54a2b3499eed9ad7f29ddef79b329f5a22171663e97054ce13211b5d0b70cede75a697fac8109e3398f191a76dbe3276722f457f20c04718e59d87f90ebc0c6429ec1898c610fc8352ff70873b83dd296f6c66e46dfe0bd646da862fa2ba5058a38b57e7d52acfdc3d11f36ea90edfc89d53af51a6c0a2527c55e82a5176a20c002edda2164ed0fdc4167119725e3071fa8f55207d85ece227c49c02bb650164033781c0d0ccbf320e113033ef476fbe10e2a7ea72a9a9a3ffdde22d7a116753cbc9505adf4ca3cebe1c20ea2a7694574cbe203336e345549c1659004c9995187fcc44d5e26aa3bebc02659f686e5b9d069471ba1da5f3d512da6395ffcd6b40e90fea1f6a2d2c53390f235fd551aedd0e5d8df7f4236d8b1cbc87ad9a6ef1c9d738409e96cf26f0c2fa9bf74279a1dcefac283bf4e83cb8f262e611ef4337a26f6e79b67fad42dcb5b48009d80adc26960cf39244aef03646bad7b471a9cfcd650cf392fba8ef72c23592ed9a45a884dc5780c5be4d0923d5999e325ad8ffe1bca6d0ef6d23a185e338316631543d6167a1dcdfcf882958094806c1a11fd356b97ec16b9397a8f8c1e95781c6e5792b3f25af805c24b6033e06b9adccf107014c53561a82f8655a40bbc00e8c93031930124f0bdb21e8841c0e5091adf75c4ec48858ff64c27585b0e009b23a8d276d5962abfe85281a989f56007d44aad0515c0021b2036cee2b91d45f9c21bffddd22a1e1295542b59e15f3c796dc9da0004cf1d9a5bd74a13d9159e71a6f8a408fb1ea3d85fe607df4474db4b3afbed6621540bf05bb8b490e6ec70b56816bff5258006baeff19301ebd9ec1305182a2788915dce2a8a9cbec6c57b592d4dee27c0e281ddb246b923642f58d74c740661bc9c0403fd31cfb562192f9fa51557452214d6e5a18ace4ead6ce8fd3b424f61547433d28cf8060dfa9621b63ed102c364de2b21800243038c8818d42bcfb7212d9c5a5d587880dccca8f33468076f91107215add180304f8b8c98fb0d63c5014e9204324645515d9620e08ff05a9458261d2e74ee266984000c13450d0e19cbf779e0b6318e72ee4dec85c2b93c718a9167979889335689b8c619613ca826df5f3f315e64ad749014ae96b8c79aeddf318e5500bde11bcde48ce506ffe7e858600a274a9f47568f5268782c0bf44228674a63c9565e86e26c4abe7e1ea81b9457b1f9bb1a6cab947afd46c164] */
