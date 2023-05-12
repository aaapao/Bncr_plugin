/**
 * @name wx_active_tool
 * @version v1.0.3
 * @author Doraemon
 * @origin 红灯区
 * @description 无线城活动api工具类
 * @public false
 
  说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件
       在自用插件下创建一个文件夹  mod
        wx_active_tool.js 放到mod下
    2、请先设置代理地址 set Doraemon jdWxProxy xxx
        我目前使用的巨量 每日免费1000个ip https://www.juliangip.com/user/reg?inviteCode=1006398
    3、使用的bncr内置sign
    4、支持全局黑名单 set Doraemon jd_wx_back_list xxx，多个使用&连接
  ----------------------

  注意：
   1、简单测试可用
   2、无界超授可用
   3、自用插件
   4、代码垃圾，测试阶段，还在完善。
  ----------------------

  更新日志：
      v1.0.0 插件上线
      2023.5.10 v1.0.1 代理地址数据库更改，现为 ，set Doraemon jdWxProxy xxx
      2023.5.10 v1.0.2 支持全局黑名单
      2023.5.12 v1.0.3 新增公共方法 
        addCronCommon(activityUrl, time, message) 添加定时处理公共方法
        getSingleActivityBaseValue(activityUrl) 获取单个无线活动时的基本参数
 */

const request = require('request');
const axios = require('axios').default;
const QlMod = require("../../红灯区/mod/AmQlMod")
const Doraemon_tool = require('./Doraemon_tool');


module.exports = {
	getActivityId:getActivityId,
	getActivity:getActivity,
	getSimpleActInfoVo:getSimpleActInfoVo,
  getQlEnvs:getQlEnvs,
  getHost:getHost,
  getProxy:getProxy,
  getSign:getSign,
  getMyPinFromCk:getMyPinFromCk,
  activityContent:activityContent,
  initActInfo:initActInfo,
  getLzkjLuckToken:getLzkjLuckToken,
  getBackList:getBackList,
  lzkjLuckCronMain:lzkjLuckCronMain,
  followDrawCronMain:followDrawCronMain,
  addCronCommon:addCronCommon,
  getSingleActivityBaseValue:getSingleActivityBaseValue,
}

/** Code Encryption Block[419fd178b7a37c9eae7b7426c4a04203fa2fd0ced93de962459dd371aa5ad62ef8e594f3193678c2e04c20108c82830c977f3803ff78c2b6712ebfc58e46ecb79e548f55513875216caca62abdbc7ed9fba7ba1aff014072de60aa8629f86b0527166527d4ae37a95989ceb0d6d3bcb3f349b35343f6d2077efa195f30ac3e5c0d9d8404e78d29c6b8171e74274fcfb72aac2248ff84633ce38470b70832852659fca6acd394ebd37762f3c7cdc44fbf80d2af52e53d3980a70f91cdd26881c0073c50d8306ff60220451ce077303a037c240ce5f8c24b62bbc0a65c06b612d4bd73cb76a065c024a74592ff0c570459c058de853fe4dd09056987cef3ecd7bdfe247fd9d4ca0d747d1cd8307f143b84e78491040bf03dd9ad3a9dbfed9b542b3bdf7bcdc740a3ea48487d8a4cd41073e3f9e5698791d1dcd358f2437d030420748b0b8b4ded51eb4c012944aaa2afb7fb390335e0654fd7d4c8c536e01d4adb617be5944ca97cffd401ccb15e839a61d94e92fafd7b50135e0e4a12b3fedf3f0ab4ea1f9b0376f7e769d944e57a86cfdf3a88b40894b2af6cb33e19673b6359365691903b5d2f29e5c7cae74fbd8ccb98068121660c5bd311837b1c369a4954cb7390d278de409269ef2a81c7e881397dc2394db298ff85e7e0e50c038ccb77dd3a50488d9b4538200700c178d039c2d65b0571638dc4b8cb702dc68db521c485b5fa9879f3ac20c4d5931dc9649e6ac5b54c9eb1817cca99f1868726dcb82394814be050e55117b8e343729ad376babe97813132392cfa15173d96f73e4c6d0eb8bffb5fd185449a8335cac79cf5c4d24a1af72bf2dc97493922ff970f700a1490ceaaaff5e9abec16af41fed34f2e52cb1e54b1dcbee3fd3f9f7c471a2863e1065164d08fe0cc8b09da178df94d5977e5b4e79b8da24ca168707845798a534fc2b8157afce4708d8a1ff4172f6b8b0795f6bc64fe000dd1c341e48e3c93ec8ba843e598647f52f35bc2f3070b2e47cfa1199d81d02aba9504468c3a1df54da5335eee4e153bdd7910de18cbb642de01d9da8087b4f58e8d6dbe3f77e7e3037a0e0f0b882e41273475d3851bd0ac92bca3f646b044f0e562ca4c34eb4bd409ceb58d1f1a8e18f7476d45ee9731662afa6f94e57496acda4ebf63a86a9956865e9210ed06cb14759c0217fbba6ba968fd07f687950079406ed36f3bacb04d7f122af6f610b4bab136258c8bec4870b61d571da7a74fcb13e8361a4d05e78d8833e0061a39f95544b4c8ecc5a2a11f66c573929973824aab6d0439174ebc483c3c11d46664659566032e868a2c85273256fdbc4db215a1dfc77ece962e56803ba99944c45f26f9ef63e9f6094be5451d9dc0210ccff636d141d3b40a30b1230a65dc1deb0faba277681af410c9ccc0e1eb7f8e0c6ffff9da8215ef2802a1191749f90bf96fa35bcb93e7bbd578d3f36d323a5f87ceda1ab788399f4aa6a90ab8c92a079bb76d74458740c4ab804b3101fb67a57ff6d50d8930be99e6892abfa353d8dece7e9ce08b1f10b8ffd340fbf9cdbe12023c99feead6a96c2fc151627fdd5bf01831b729ded6727cb6d15dbfd53688f56065c05c0ac9cf098cf5253e218bd3dbec4dfc30fd8462157bafb7aed8ec99bfe17401d61344a7b35442ac6061251440994c47fc534a595457f1bcd2a8dd9548c664c5a9c23124040f287d9f3108ed09feafcb90664d14a2d12df4c2241364794bdc37d2a316674cef7d6e26585691beada3fe20843d9fc0d56a1620e6cc959844727bdfdb658a0dcf1a5920211ba3ce9172328940e48e640b7ef4bc1f4c5571511c21943a42cd027789d9a9862aa5b075543bfdd04b9015e13d3df23c56f3cfeb4ae606885e897a4d8ceea0ebcb8656accc584506db6422cace1a84294a1a1f6bf956356dcdb042e8a0bf0ac22bc8e2298129df4a7e1d4bc4c6f8f16d652f5d655885ca2ca07eff3425f0aa01f4d2d0dec05a21c63c4b76faab5523e0f480db600bf6b035d7f9907752ad7725c4dbab13a04fd6152d7b6552bf05f5041ed015c36c4b8d0b2ca3f7014544e645f6fb8c0ba85c7be9836163801a114710f8891ebdc41bc5d17f1a0771426591caeff2da1083aee64908c38d1e03f8f6922f2a2895be9c1e480614557367f7967aa2ded4f6f40784aa7c5814243fb5fe411154a97c851c91bec59c5b1e6e920e8c85ab02cab789ae4d24f54eb2ded66ce637f26754929032945ffd7b55f65522e980f515ca28a0386644dada2c4a384d844a616f1001ba9afb87ebaa8ba622bef003d8c7bf283467de2b23f12fc5128c867fa20bce87eee9e394c4d839ef5f488bcf67f10c22f22afd9ebbbc3a18b6020fd2a9e29d8aae75a7e6f3599779378e814e406d66dad1a414320c0c77ad2d83535a173e1157878f96e5cbeef5baa8942d2dc5ee874eacf106e6065952728647472cd9221e44aeb343f68280c462f993f046282b021a3210b0808e1372e20de1e7ecffa9a1155ffce8309caa26a380ada29a07c63cc112f20ca18ba58386886a442139b177ce02007523fbf8919d1a688e256e428ffde87b673f83ed10de671f4327e52e9e1697b4f15003c212bb5fb54da86ddb44f5709d1cdbc5cae4b6205f9978354e0b5c8762fdc9811074ed2fbb1ce0859f7c8da9b5e462fcaea1f932116b6ed40536ab52595bf174f1bee1e3d3b682119ae547f63f192ca8d940da24bcb6d7a2d12ae1edacd6317c77dc692e27347e4232faa33c9e1b071974fa7bc84618fb09696bc91036f9132c27a641b1281065b1442cd9f3879bf4987f68d1e68b18cfbbcfbde15e5f8bc5f239100c9c1ff86ae21fd83d7417df39ae9efbe2cde7b532168a005bee757f985c5f35d30c7189e3f18186ac9b881a4e72df6923b9f52a0db85c0b5badf4c0cb7a19cc94ef03732a85054725e9413d5ef7fadb210426730f587ec6fe910be4056f9cb4ce9ad13f784764b9aced47672fcfacd1aa96bb272e94c7ca672e0634e68ed85863f4e8afcf1ead694a9cda1772fb31645ab5f04e9c7ac6d0b083f11701d33cae57d943a60b904064d97ebdf17031a32ab4a7dd12652f626a32753c715a0ab6f52f3c0abcdbe3776c18efb492cf85edb7c4658edd2ebed3a05580e2312be427920bcfa0d722012568d443a5675e9f049b2c938f97c80c31ad38ca4793810973abe853cfe878e6c054c4e84bada808e3782a2bb6c8e5bff107cca19340021fc655d7dcf0b5784067774886fff28dbe2137f8d1c63c05b13689e2f4820bd1e4eb79a0c1394fc3c61c92cbf30f4ae3a21b11dd402206263a668d7d071b2e550d1195d132e464a51e28de7a7bb984127d242104dbe52ae7f2063a25d9e0253f993a45ee72883d02f8f091060440427017784313afc73841124e991944e3136061a7a23f42a1d2af3778119419c4260ac5031c29d7167a0b452890d2fd113530bc755c7a0cfd6e4ec2656ca3d526d3532ba067d1862991bf037ec3a8acf22facd466f8702623021046014a772c9e5309b124dc2cf2862c178b8ca2572dcb4e1445f7c0c489b04eb5f3b6de125bf32df92f5eab1d4fe4d5e5be735e3d2b5afb2cfacae5a066774cd7df1c8327fa997b2013f7f19b7c874bd9f849743f48a0b86085d31d0aa1ecb92e3895c88d61bce55c35cf7e805c84de9a33a7ab74aa4572dbcac521bedff30fba8acb7128e6262029adfa19550a8641228cbe1ee4235f1ab03caa20e4483cb78b68d4bc078170d097bfb458bc4dc27534d4eee429ace78610fde33055ac44e9c5e83494656b069d40e61588cd93f3fb490cac56e00415be8b0cb7e1686f717b93107ba780ad2ff78c723cbba8a7bef709fa5af2bec71716b919755f7b5d753e72578efd901c5d9deb4eaec2cf1c3347ca4addfbcc65a1931d4058938800ff921f799068ee8d5341a092faa044456a918eb073065381fa6b31345fdc48553711811e18bfaa2a37a82ff1890110bdf3d9dfc9eb543d3402b86f87e09ef3a3cdc82a06772c8c2131182081d4890355d3305e16daf9070f192180d00f5566456c188f439b90f10b7d3b996580c65935da96ab61c58aa8d46bf5dda3beb726cb8a40362893fb42883f9603fe9bd4b786c830b4c399d4761e043d878d258e3f74fb1450b8bf4a7c95833b40e45ecd0c81afa4f5eb03669e18933726e1563ddcaefd55ffd1cc75ce40b16fe39153094050e6b3acc4774615f2146130c2d638b826faf5f60c1dfc91a563b89572a9f3f81355e113128cdd2bddfd9c80b18a1534bb1afb384fc61052c226cb42b057e5ec1ef0d6f200b42e85fd9a9aeff6003fe6c50f7ac11b77b52c1e16b7e008e71fde20339a0f112827b39421a585970f6e58bbf03772a1bdf7811a8efe5644caf49650436f720db38b7247193e0036dff5bd51bfe64f89cef3fdd13e35b6fbf03140fb9e5cb9d0c0c21919a4140d0d7fa411f0fcf4e4ab693f9423cdd912c6753996d4a1d62ad0171dd5fb7f75ef5ce861453e16566b600f22a7e6c913f223a3c513b1c837b781ae59fbffe0f92577fd8844472f3d6e8da698224aad997301674571aaeba036bf131039ae61ab8ed9e3d6338713b4894763d05feb81d9d463b19edfc343349cf526fdd6f68805d3bf86ab1efd523a8344306920e5d1f7b36b5b9d1bb975fb430ffe3f975ab1d60df940e3f30a97ef3923518093c6c8dd0fb2f1d46c58cf21171c5e84d66d5d174d8c3bd4ebcc0b34b8bf359e1ead747416ab60d42801e4aef0cb767cc2717d6c9fcf6f1db2d4fcff8649e29c7801680053eab3d5121ffd1c5159c80379daf6e94bc5916e3601dd14a224563bf5252f8dc9ca1428443859a9d7dbe22c2ddae129b522f1a7ec06e78beb7838ffcc2f6f427bba0cf55e61737cf80c785b0404aae346b37c81aaa321dce574a87eb4103fcffb2b969df3967a31cb4b858ead92ec7b1c6ba6467e473d3456718f4454b6968c922f12dfdce26fa1b6b358d7c1143c564112eeb19e77d193da3cf68600533ab29cda75a678627b40b498b673ba8c76182ffe3b6597757418cb4fc195bec7fb2357766d3585c5c1ab1bf2f6442dc0be22cf1450120600a9f48070fd69a73dedf0889230859fc6596c5bbed700d29b1ee43f1bd0de3e62b58644bc5d99a69984af8c961ae749a7dcc3aac09af736da732bf81065b60e94095ad8f641a4288e5913dd1010ad8b17132ee624bcaf7f02e6a4f8e9054d27fb1be4ee1920dfdc3fce6bee06091bbb2ccfcfa78b26f2cbaf6eaaa83fbaf6e2f7e94ebccddd340e6d7ff13435080090db45f44c929a1c7853eb9fac3797c9c24277245fe51d11bae3da642b3e5494b934d67d771f95315e0e513cb8b312f5dbb63b86359d914e2791f627450f51f1f8bfeb2b0f65eba89a0b04fde0fdaa5e1c9d71f1091bc046863ee0d317e4e102b16eedb071898618fd67b1855b75ba9f2a990200333863220b47e0ce45c5d42626b36d3b3696a48a27905689693abce11a3d39a30acf9c9d7b475793c3a9baef473c4b8767f2644c811762c9fcf1b14248bf9372cc7cd3fe457624c32ca58775ecf110ab4772cf441523ac73b59552fea587630609625400688a6c140a0e7bd7436540b523970d9023ea7d71e905d8cdd4a59446fb4ac6eac822e25f80e3a806b2c18c7564e8bcad4e696e508cefb6085a3f993fc8b890403e74b7749736a5d260576645389f8b6d296c5501b21cfd5af6b739c6b66557c074460f22d678d43d9d9818d31d5cc6b2c778dc46491c6d22a8e04eec5f60c8a0dc581d7c4af89b87bcce2f207d877e3c80cfbcbc4b968d96be7e8e3e9aaed8bc6d1220b86ef5fe7bfc47a6a634b194409658bf28b8555b697ed5174e85116db3888ac7bfea4891dbde2262c5b5d3db27fb6bde00a48c0a41d2b75c92eaaca124e75f107d9315846d16f155f14ee838360f7a5aa8c82bfef9d3b87460fe2643d8dba004bfc88f421dd6c1db3d286cb8090f06bf97cdeee6ead45b62389157d81eb61de4a02c2405d2cced0d71af4fa6d483abd14813b5cca3f0d6bb40dce7eac1fa0e47b1403b73a6fdbd9bf1edd76d252d446bac08a8a0030f3d7f32d669a2c32c317bde8bb029aa4702e125b1aa917be48bad573b1cfdf777b936b167058d732ffc65148c1f538e141d7d556c423d41e1bf3407a388f6ab4e217c21b92028fdf79120c4574defae2897ff24d1503ab54f052426ef04273a069d58ec1d56c5354f4257a94907129198aa8c17ff1c2c4b5152c0c3e48280e537e40ae153c123084ef56ce900374174c61c9cc81c8f07f867a97c24bcf64e18af12596269b4dfb4d324fab0e2ecd335c6bc9d215ab9b712c981fbd12e9da3cf09e6a85b1d10735b950c0e267789fd479ac5d6ad4ad60f4872faf8778493111331c939911ceddf259daead53951aa6da727299bb11312c053b3220d381bce3a07c5be4db29fb9fbac1b493bde5b8d651bb7c2e49f24c2957e034c1be1fcd5a27f5cfba9bad10b5fe67ebf21b1b0521534da467c7f2bff23ae7342eb05bc10d13cebaec5f6ad2b5edf8a17a1cf162e28241a28fb8e5c9a7cb8f2ffc9b2b55f870006c08da8f0a160357327391216a7e394df185b98555b5b8157dc15d370868b10a989a3da3b5c949abfab449f1d862374883c12eb8b827239fd48b12a41b635761d6c256661f314f96c8edeb0efe3c2263455121026abbc9b6e9ee35393f9ae709613a13d0eb97181c547b77c37cb65a9e7abd1034b1a088459fff52b38e97a460dc96d4039caece214bb62e91d80299dac087c4d75d4e218ff0dff464cd39430bcd236b0b8166ba7e75aceae19e723daf3f3032450e916f5c53de0afa1ab9f6001ba32a9f1ac0a8746aebac7a7f2049b65b0fbcc5662b6758aeeed25b2d3545ea2280dabf13efbff78733e8098ef224de0baa7c8eebfb278cc692c2709810d77ffdb645b74bc8105cdb3d73021c1e9df6b3010530a4989d5a0dcc81d4b0e3cea9845ec76dea28f5c6cffeddd888f57fcbdd7b6a29ba376d9e3c874eb028d4b128b7b5d27ff82a2fac31cd6fe86cdf462a467df04f78ac7deb22e28f852a548107d9e14ede41df5c4adca961b4be94e27c260f16c537d70a85f564a23c3396af2f83a77c0895c51854457b5ca3472f35410d4fe6e5a5d4cc40848b83506450de9c35dcefdc807e4da703085f104d282c56bae1f35382db5b98358ff70b6dc3a7bcb83310895cbf539ba841658f126036a32c71fa098671d118247243831c57e6d6866546246f4d7f6db5f7ae4fc0790cc5d357bcb1878293ff3c033268f95c7b8b762529f7965ba54b2bcaab84778758f75840f06f4c14b090c2b49eb4689e134a456e7b6e8062bd5da4c2085261240753f0195f0101f28d621845cf779e77f69745ddf80a16bd06aaa3a22738504b516ea83441db292ba98e81d1c2a288231048fe49ac558990a01466557c546340dd8932c2b7b51eb57a97aa2edcec876ef99d40e647c65b362b13530e81db37b871130a096a8dbce10d219053efb5977b834e8dd54c55e60638e925ede23737a2723af906fce3e4fb1e920db6cbe222704b1b5f3c75c042b3e22c6aed0478d7fa513a8e684f628c5a6de2bf528082e68d65eb00e00ec316ae12855652e304debbe644c702301f7778d4bdaa20b9a23b0ae91a73571e659a5a90b22974db48ab0272f887ffe129c2d7e2946f37380e86017b7f661ec49e2d246ff0a62376301da94e9eb1c89f70ed6ae7fe4d52ce6a19613ee33c26ae70f7be7ad0cf9292f818350dad873431ef83acbad11d2002cb7aaeb3b856fc0b510de3b7232e4fb28d3ccc22b434c8975f383c89013b04c2a32fe1426cc3c16754e734ba831f9b581b7913d5e96a2bf7d675e964a1e5910eeeea695823c3408a908385c62b80f358cf5464f8783d82d095bb8bca304662b30e324eb069852a31a528296a87120e3cdb65746cc6717cc1ebd5cb54be24aef2da6ddc9beae202dfcb44bca806e4c1954966f71091ba3d12b1d6d7a4d384595c56d07a8b5a2c53df2c77616fcb8b3454ef028005f0e1507a2aaaa3b56a81cfeb56a0b9b5e58317710548b63046002083a2865ea1971cd1070800d8fa2c01f09e80bec661abd9adce79d519d3b719c3285507d895a5a6cf12e0ea8b041acafef2045bf6f2fb8c42a2a165231e07a6fe65d1670b94b4c380bceab7006b94d1afacdc92f3e9be351beb5a0cdfd90f24514d255784383352532d8753c5d51e0b9c49728025700be282fed259c5d699649a0ae2a82dd5739b2140659631cc13268dc22399cbbcc30a728773487ede28c16f326a240e41c115879170ca3f7a235ca601562cb6605b0514019335b004d2df93db5bb6ec315c5e03ba9e8a998321c3fe3dce759ad3b835b2d359ca0cd0014529f9309d33a04e87bc9696e41640157fda0d6b49c48555fe49b3d58f8ce7f65d79046586d28cf4d81ad61c11046b1ceb8ccf1663437c9355f429b59ddd575b8ccd940b9ee354db4c3528a381b03866ec99f299223b312bb036d7ab8905f35fc3f4378745ff469b9bc6c3d3837c5d5a8396d3470b7a5aaa67af01476a43f46767f9e739b9e6510f8c7aed9c0a2d58caa8b48679c57c2fb88b305a8694ff6b188adfbf1c27a65a5516a844a1838fe435d2a9d0d13443d24deb6a10295df3ef33f83dbe1ac2c77d2e816cc322114a8dbe323363dad9d211d0b050fb6ed9124606a92dfbe7877121344814038e85e93446058f1b9e10b2f69581e2c738bb9615c968d3401c974f7a8bb428e6e0141c792d801fba3cd55ca8f8c3e8c48b1980a74e2a2d9854d2a8df28aa6853b9fea80d082ea06b312582498d64d526d29bcbd18488d7a9f853702aab3b59f2cced624b639b29ec253c0d7f3686c425e325645afb827d494bbb39e363af1d7841ff556721edb9d1af9e4bb3f005a0d7f74a200594f8098c4f079dec5d88c36d349b0bce926505e2d72030c150aa449dddbbf76624de7454f8a9f9790d0d4e626d46b428c629dfd0689d3ff61371d728fd5a81aeec0bbe48cf9acb84a7f772c09f0e276bf9be4d23a79d6d4d76f0a78c4c26d724c86221783caf5b9af5c1803ba90d0234c69b6f37cfcbb5ecb59ef06707e168431e89fd3693ac5afa6ed32ec96c586b7d32b4858c0d5b2c57f0c458b80a387aaa08a2e1ca798132be58d94c1a5a18a9244f258824e4650f75da601d7284c0baab641c6bea8d8548381415d734512cf4fcc4f493dd3085d4de6738adfdf34ddd1229ed1d7556960ad8a287e4857d4279544d45c5cf4e0ee1c44ef9e62a16dccf03ae856f58fefb4452aa54f11e2c37487dae1a8a56c52ec1433441195ab75708774895932cc66820bc3064ea4ebf0d9d296a8a02dd8a4936d6932bb7a56b13fbe29b7735eb18e75c18d1badf822eab8e37ede38daf88df1e567efeb1b467aa934cea1faa3f77be41cc38222f203cd08dee590a8017116c7543fb8883aa3dea565998f53412f1f8f9824729027c2bcf0dd1db91490bf270dd2b33a8eaf9102629af7efb3720930dd0be1a843c7200e974256ff50369c5e64602dfca5df4bfd5a645cea598423eea3d79abe7f74d61b8372056152f04879607db838de0deef869540cba9fd37c4078193b0615cd5e2f10f778578d06140b92e1cea0e49643e1404e15fda3a8a84193f4841fa4e174bb04baa08ed40a26b247f3a2bd84297bf4d92e62ee2184de262f86bbc77dd824d937bb8bc9818369827799859f368c388abf9a784780599c3adf8279782f9eed02f6361accc1c56ee636592ca0a212ef4341f8d11fd78a7e20d07aa079ee8930f6779f2fbd9c6b4893f1b6388498d77e02b72ce4035f85e5262d8ec611e844ce9492da27687e36e033d994e2a57f1f2642016912efe927a87443f37615118208e9c55666d81da0d63ac93c169ae14dea7e4f9bfb947f1984b74c011de2583783b17f152bbe77318e68d7855b84db536dfeae9eb28ea7046c206ebd981d5e3692202f08727e8178cd70222995f40430dbcb31ca88ed46c7bb52dd17afec44c0bbe7d202f9f8183a2aa0b8bcf0f3938947ac641803ae073c64d16dd287c9a7e78d7a5caa86d718f10eb9b6c94114aa1b240b4ebcca6db2d1f1ebf95ae642192a44a4cb9bfde953e5cf0cdff1723fa4c058c9b1bd74fe5bc51175a529d551dfe65e905527b0b47e23e2f21cffb19c68c9a5a2f829925e28fac4b0995d5113a37b19ec580d868b586d60d81f9d4cc26f7066b885d0de6518329d2ff14ebd69bd9e3174a14987946b403888d22477252d8f7f8c80b70a6303f8349dfcc1ba18b53551666be505c7f29cc2400ce4481c6081932128b295908a0a327d0728a75936dc8b20ed89b44bb7658821ec46a054d3e96fd94e07a2017bb16151bbab60c8376be2ffe2c6fa70ea1e77c341c01485bab4c333096df1a084652fca8c758bcf5e48307f14b4e064335bbaa1c184f28b6d5f3d70b099cb9f9155a45b5b5d1645e6d06c5d69347a9669cb19683ddcfcf8e215322a1d54d82dc97520836c13cd5c8fb583ae8c33d1742643fad6fab8140373c8762bc06733fe43c08137bb7165d3854bf1569f6eef106b7bfc08a30fd8215fac8940c8c1690b455cf0f61b09588c9189ef5dd1a831d92b4813b6b52ad606df6eda98ce870fff710bad4134171cd6d6ba3eae6ba3c44285d23d22c3b88f9ea9caac0e053260f13daa8953d27ff6f083affd743d155a65dbc66e9602f3560392e7004f1f143972326de8f2915d6325ba71e7d9c172f0031ab4274d26942920e688056ac79cb87fb12693a33c65fff3e3d3c5189d23c384cf7393b165a4a00f9e4a62a55d9cb55ed3f7e87a9c3a9f2c8c55cccfc52fe7a5ffe25aef6b8dfb8ac36829ec1945bd6cf8ffb14fcb3cca9a66f14e2ea0e659b158e6739d8ca84437eb984263dfb8bfbb1e5c4caaffc5c319e27ae5718d268da4f09c5578e987ee2ff2b27c13055a5feb0823b8b3aae71d06c59fb5b6865bfca924634c61616389dc349f9023ebcfe9d13e46d77c2275d29fec214ef8e7bd8fdaa54065d8523408093aa541cfb621c7d8f39d5140b192df68c8b566adb23e5fe3c6d7bc73b93b738f292ecc56c3e193f1018120fe005aeb0d9a1f8b8d82cd7dc5336c9363f768c33dc0b277ea87df8958b5e92f92212722fa69e683799e0c6fd1afdee7ddf483a89bb92165384113d37cb76b517cc1c68c8551bd9c7d670d32e0440a3bdf1f5bb22d1302d766675836983d4bbc79b682515a6eb7878c0ff596babca9701ce092120d1061b37ab2445f366b152cf1f6695a4f2e9bf2def33465c32149a9d4353cb212edbec259f6ee91928c085dff3405d2b16e2c4a6fc7838ed09b1a91f028b9bf5a82a88c9534552cf6f0bf5795b5f8bfbd9fa0e84eb1882d3c057cb7e1f26d3de5746d18cb6b0420ebf17c706d642aea1f3e78a806dcc86b91d9ae1b4a5946bf02aca2e6b6de1521ca1440625b6fc3c16abe94f69d367e77e0f8fa793c40c9c23802451610ba23a5283d4fc88bc5fe88e05d08a9a65d905d1f29bf707174b56690b5d26fbed3239ab0e50938f64077eb08bd2b72d5eda36d4721d94cb01daa3a49022029e31ca3bf84fafb2025cf27aecf2f04a6c35fc41ac20c2a9082ff4265ab0b567f219ef341cf14761d1ad17f0f07e54600ab7b819f505f822ea5d496f0cb7b255aac0df20ee41662790355c484e45797e9f6582039e13976a3c4b0e36b75311f4e9c3dd9cce4e7b2120d926c4a1d1173f27feed31fc9dd0d5731dff6ae26d53935ad5fefeb194869ecd790df6f7defc2904561373f9a51f0c7e53957e3c0bbdf77430d049c751cbb5b953b849a9f9f8820edc0e4431e5e40565f4d52dc604b79650ae9709d6abdbf2b2cb7bb52619623979f7b07226800e850affd519582b77daed976167a59b149ec603e55c6e56f40d017070a73983c75ba82d299511339a04d8730e22cf113122afb4af7e18d253247f89bbf1fba5c4ced59f505ea6aa01b059f5c79a09b2e93b19b9488c5c616c4c2ca62085e20a5cf271f247b751709bf937555ed98bd711c1ceedc389abbe31a748bde75a5c2a5838b67c8b01f8b6470af71ff0f8836a0150f939f8cc54e1263800ee1f4cc0030fddd4f0ac73c6b0151b2b17cb832ca90f020d569d6bdb77c056d45f35d4b54132164b032eff657ebfe8d6842b8b21270a1edf42f12bf4fcd932ba668fdae6c629cc2650a81b7cb72feb5ae32802cf2cbfda2d597b9102a2ae5e64fbf8a14e7051a1da69b5c5cf3bd4562635c71adb3390c4b67f53b5670480edf2abb23fb2952dc1d45b95c74a655347a222bcad1de5c03ac9a43b000095a2449e9644b1820e6a83f400574554f178f4600a5b1333548c02ce47f3fa57672fd1efc9c57d8a2cd1633b689b8ad3a2ab84f7f4d3c8e7cc378efe1683be6019132a513ba3337e02ee3719a93ae51d3c94144100c83ba1a6346c335b08cb5f4bac578911b320a886f0fb68344a77d4b993ff006092808528f64f468e317c8fd62848a014e28418feed7b3ab8e6fab57a1224f34e5dc07b5f40cf0ad40de05edeb255276c26735ea05be3439ab20bff250d71a86b3e666d33542d9060b8fa4a59e35fccbebc089d2c39b1d24adee7ac4f59c37d8b102f2a09526ae5851d0301588cf39dace623e41038f626d525c107c75bb3c828d0001d615cddb81e05245e4724a97dd33daa2e7e032b6410f071d1d273738280cfc1b4452d865497623627b0dbf5877d372394ee6331adfa62152359d52dc86ef7df5d6c97ee3ae19be11bbdf9a2fad91c8c15e22f4897038197efd8feebe59a784430b64a42cfccb5bc6fa2f883ac6b137ff48944a006ca4230c5131bdb255b3dfb39d3c211da414c980c708727e937e606511eb7e029b7fa9ba454b30f011d63fae99a03b123cfda42352999cf9d0f02908e04aa3426a37f16a34a48cee1c59ad1619953f73902758a11bb2784d9a6338fbd02a7c3c8d19ca954e0f15bc9fab5c091abdca22eccd5c45053f537fe850793f2adf8cb6e808e52223e0351ae79718f197c2e60639fd878ba380a5a1db278efeaeb5ef92bde06e61019d741821f42776337a34eadd13a3b14e08f16964c8995b90f8b6475a05e6ad87f07236dc90103db97d9c582057ca3b24cde7c313a7e094e177df9ad3a9a168d19d0d2b474ae96b29d298ae7206dae49578ca93ec1677dbccba2a6dbb4639ca6efb63390e248fdb634f91f37c77bcc2c87edf1b1b916882fcc09d76808f567cfab19cb82619765bb3a4d5e509d4634cf960af5a6c96a633acf64091689e096cb511ef793cc47af496a2abdeee036a3869315a840a06fb65fb11505943d8d0a88002e0258425da23ec790eeb6cb21039ce4f499a6a70b8f90ffe5ce1449ab24d29caf362f6217812e282bf9b5df03c0dcfed31e1cf172fe31686c7be2ae8f69079f37b97393e63846f2f3e1c27fd801f8ee14a88abee2d754d3a7b23454892a5b40ac2c3b3dd2972b5de2effe2182b08373b1d68cd1d1640c04b61eb87bd739784fd616bed7d6b5c09e9a67bb6bc29827fca4cbc80907450db55de6a25c48cbdf23d1e7ef46fe82841016c05acc5328c725f5a2b5c0e1ba89bfe776b0475481df9f0c55f80228e2d4a9f33d779a566c487580499a9fa45abbe634376ca8eaac2c4e6e45f6eae483031b31a50d2d468d9555cd8139bb3897733f5ddc9de1c6747332f669bd419d647dc1e6139ded7e22dad870f83681344787ee9f9bafaf1da521fec25029296ff01bed3f2f76db106a9324db4de78fa602b211c5a788e0a4f919325ea4a38c397033be578d1efede909936b5dc68386f83101153bc804e83e32d21c7409c08a0a86dde4afb407e5ae7256e521517bd157254bc55e8615d39fd4a58e020b4e336810b33ec3f8d9be811338e11eca05e9c5019479946951a1ae9c2ab02b9ec74060456dfc1245e1d411dc21f9d96990b0369c2d1013624013210e8ae33f725ccc11f9f9c92dba167d17462b56f937749b51f47e866a710ffb5a8f8e0235b245651a08d9ede6739c2b6b07874f98085820bd92ebab0e61470beec92966310344476ea6f6242d19a8aacab2dd860587472b39c4188e1a18f0f8bca0b72ffde18cd8db960f3a9c333df6ddd68c84cbf8998f4a09ee47c6289ed134a3735e7900f7ca8eae68dcaab0091a9be34ad04a77bbe364c795e8097cefa72003d0f8135a966043752441551d309130024ac73725d5b19fd7724338b16d3ba32635d88e3b54784d562ae16706d0e1ddf7ba1c8df658d5bae139aec43c3d04beb8597959e6b062d4bfae5fe434913e4d6721bb7ff8402017cc0c3ba5c9e46e77f32caa0dbd8e9ee0d3470f043574be56c57dc44fbcbb81d56012c2795b45c6acd6bb184e081e99c5e8c92deb4b7a59e65ebc78d0630909ecf5b28a9e93fd5a713a8291c327397011bf3141444f6f67cdda954e41ddec9e946fe9c9337efc5ec0e84c369d944420c8d4bba6ebd65f56d054fe2cae8631c0c42c15abae87501c6bb887e57c654984da437ecae211952ab978f81857e0a2054f099eb8ee27df683aef31161f212a9ba9087969d6c468bc353f43f384690df9658aade0c1f26e10dcde3df4e47a6835139d9abaf0dc288c71ae714e3d78fa5d95af6bd314938f06afa7c2b0044696061bcda35a10a1a0764d88cbe43364e31625fce883c8d6f0ea64dbdc5d4bbeed720e3842f2ba41dbdabe8349fafbd73e9637a249d8fd5e3cc4b099d21fa1db706f01e02b297c0c8967e505838d8dc3b01d4d7be86f99784bdd75233f2ed2ff9e13c14438f2e889f3a03c5115b3f3d6aaee7ff64fcda274a5a112dafe6281362b3b36e85652e889dd0131d3bf52c59b56447cd4aca9b6f50b768115e0a30295025241335f280dee025dcf7ec066a565cf962a0f7df414f2137ce7e4681ba868d43767153da3d8a1a8a983e732f964b205cf8af00fa09422a8194be9fc92d9028c1cdbc62fb4a604494e5bc9e8bb6462104c3e5c5255c6a9786c677d06c001f582ace7716e0a92b458e1e055991b31100c6546142db30d82768bb29306f0414500f09b17c2348a24febbdfe9b7bf6e8e7c18475504ccb5594f9eff05d321bc11d49a09f987a8b22612071ec9ae0f37b2c10677228fad4cc9f01ac34b841a4c87ce951bbbb1432be7ae26105b21309ae57e2b7ddb3b03531255a7f428b0e758f2c2cfe8301aaf2375d4cc298296cee316ba7a2ec4746761c07342079d5d2a13b00ccc289dba98feba7f88f59c3318e38ab0a763a30099773b5db4ecaffcba9d22e69f1f7eed6a4c0a86ec3050d99357bd499583cc3489528ee0c0f28e8f23b9645088de86b6c03c6c99c11e367d103754f2107c1abd1fdd8ec0a46ff550500396186242e739895111f6c14284762955a4852b9c247349895523f79d0d194f1822c6c87cb8fdc41b016a2cafdc26ae5a813aa7dc73ea0cb56b4f3982d684704e2cb346c517e2fa5af8225fd49dbf3f41870b276caf899b4c70a51fa2051ade0f275e917b79e6e6616163bf6d3da4141a6ada8c9f9b55c98aa04c8105ff01f9a4fba1b7cf7a931d28423e2469cb8360b9b860ae8dd5d3124cff2413dad860248d6daa20bcb4d7724a61918cb30e40d6e4a6e8ed474d5f5b287431897207345737825842d1462836b633aaff67000c47fb659a18c05c36ee813fbbd2b67c0795bc388ff92bec3dc5ad0e2c2906bad9a5c3d7ba2c615ddce4dac5ba985172b007d94b0ce61903b5767bf650b1aa0e98867f38792c9258408d08d033bdca1962eaf6bfe9a76e5a14cca2af1c861989a23db754336d2a5bd70b75064dbef8d65589f6ea10dd20268e137caaa13f5e415a561dfe8ab50439ad6cad061093158a4e131d092c545e68fd8a90beaebc89a1092ef4e1a77b5f86814e6183c89b6241d8e06ba98c9bb4f065e321838a3f1c9f05636240b6f9dd71630f51fc9c0ff4b8bb49465cc09574a6c24b3041411626d2cf2522fd73b63da0ec5bc4026af352e8e7ae8ce30c14fbac0482e4cea9d7fbbbba8cdf0049bca1a1f8717a41eeda6a7a34877fde0a6cde34ac5a6e207ae1e00f26b14cb3307b2ec963ead5679b0ed4c8351e8a2052c5263148d97ed2060edf2df5bf5031b2b2cb6d5277b77f0e1204665228e4505531b54df4a3d2841b8bb08dfc9f924c2f9bb0e8a1c0f87a444ae3f9462c58a3961da75a4c8ed106bdc502c16be5da74a0c66d440ba00177f3c1b0c4f3cbc6c3ac5da3399a5c80c54d2e5f2f3914b480af2f6e8b0be9bd4e0e1e3547869becfee64413e08a86c25c8b687a460e70c0ab6853b7e612e73431018e21fcf7a04d004eefed2eee338c03e6cbeb3771f8bc75501fe2e8d57966b4abee2e1d8c6772190077d1e2b1b4804ad99070cd200692a36d45306246bc68d00efc5ee238e78eb4fb855ead786ea9b03de4e3852c707d34924958969f66fc59395c7d292cf768415896a9f7864ce4fae118c037a967d04cd39bda78d62846f680aa9cbd8d8f6852de4b66db89e0784e466e127b0802dd4c6e3dfc8799c119ba01d43782f7f7805a15992f9cc3d677e5f0021275f140bcefe541dfee69aec18d463f18219840c526d21da5fb89d06049ff382b803798696366bae84166856c87cfb2aae956b2f944a5fa9599ecbaefb26899324897d83177be1d402e38d043e0f6ef91e1ea97a91a794391df483d69fe00ff6838780d0d531c2901bcf37c1cf0173585aff836a6b4581e894d564ee5e48194173fd9e3c50566517c31c4674842a5dab609905cf45b905d9b2e467847a69cf679350b9e77ebdee4e54203d0e403c8e8148b3111a5088b8c7b6aa808e1d8141e46391d63caeb061df00317848ec1585c9e1aab1cfab44f5735b59c1821b7f23f322a05f73890780b6bd1f68f0968b2004230ef38b87be8b3671157b1f6ab879fe70eb1cb9f6ad6f207cf04a3da91fd89f604bc834a9d4764dbfebdc4ee200acd3ab5c533e17ca9f8d52c3a7f9c191b02173217fe4fd5132d1cb4f1f1a4418be6ccf00c2179bd62e11f79959fca798e8f6e4e2d0eefec250f9486339c055212765ddc927a502ca1387d81fbb71b33e6fc682dcaa6ccce1ff08bf4c23473ad6def62a878ecccbd9f727c22f47daf377e00c5e3c6e2b356168939c9a6cf10c5563c284912513667ae9ecd1ff0c56f0b91f0614140e44e73918c7144b45323a67f2536cad852d404a96d86d799ecbde0d658f15723740d7a3b2fe3734799e9a059261d8adb6ea2b4be9457850cd5d07a561fb0b51d6334b10c231ad491cc187ef4d4231c24131e517a3989db8e489076f3bbff0be239c99004d49cfd7b9d80ad0ad5388364fd8edbcc964060879fee3c9e959285be6846fe77f28ac2a2904f20bf5788b75025158429a25eb4842f6b6a0a0cd411305cfd6567f13fec14f0f85e9858b9371a1060ba6d99a655ddc81ca53ea39295c1e6da22be1b600b0e33c3cc3fbf63c3510a7cb808d258c702eac581f747ee5709807bbf7a4335dbfc4f7dfcdba8d9a8126c4d880cdf1565938a01353d62311f72dbe0d15869ec88577e579598df00b82a3db74e67a5b739c6c666709843e49594e7b17e1d38e9854f0b8d49236983c46e3a94b6eb396cab5e87b04192e93ad001d2897609d3027382aef48a942b62adcdbf48d469d66aaabfc62cc39cff26de7b17f000c308af70bc974f90f97fbcc22b6997c6a0fb7fe0278be7f22465ba63a72133f845aa0b33baa82a220432693193e40d82861da33a47d0f85b59b12c806c0703ab3f7ed7cf22dc1f7ec0569a9d12971701da85f01c7724aea313406877dbe92c5fdcf23ed7b056385202664960a7b29264649e9fa63f90bce688e5279603638d959343dca34b96d42f8d30b5a89d420b06484beec736bef1a668db76b155ef047b368107f48588caab136cf952f6ebdc6777da89766d531c6be92802beeacd4676807347622556a23179562231433e5b5b07104080527feb626c08d6ac31707a643c3c73110c4c6a3cefe1b0a86edfc400256abcbf51065d5748dd74c9cbbcb42efd56f5f440bc3d24ec396b73ddeb327378df21d3bc1c58580ab036954f1194979c9672ec32844db4e98bec97f533dcdafda1fc27011cbb2b6affb14ef44bb0f5524e31e6741c7425d721be47560dee6565dad37ab7b49aa5e9663959ba73dcf0c767561aefa5efc85fd9e5627af95200481f2f8d83343239cdbddc38349341c5604b949f2b1b037c389223b99fff60a2b658bd41cfb321865c47c8fb3f49ab034f66da1809994f47301a0a0ef3cf390dce3a7084a437c76ca99f7ba0a4020b1e31dd7bd22c3c17dde7c52e927e31c9d121164badccfe5ae3ee0fced28a6075039572eed72e465b40a4adf0bf18d29da63ac87d0a285fb3b72d1c615701ee81c80ba15f0c8385a8613ae12b77032e237f0e73aab9b2c6cdaa2a61b9a8af039232afe168d40a696a3fd590cdfcc9ce167eb9965f32d2c25e1d9cc05c7099daacd14292831e56a5fd718ed18ff246c2c8995d4e6597b550772af929216a772d209d985417c7948163d4f3cafb7d8b988733fa773f313be3dd891ce32c9342dfefe739f7c4828636f1b068e5a818e65b210d22bbb94a4e115687fb0595374fc9fc5d5ca1fe1ef2b69e57115aeb6fa6d64ca57f5ef6b740009dc39a5bf77a1cf8a4fab3c6ec321fe640f1dfc301c6a46cac9322c47d1dabe6303437da7c835a922244824941bb81a32b40ad5a4e6ab2f5465307f0c338410bc6ab820892b1c58e84c7ffc87edee72971383c7631c10da2837d5fc4e410ad0d54f9248d85109d344b7402be1448d22df0fcfb75052ffae4a81763a18a52c5cf0e28855fb47be62e0fdf691a3d55d7c7601b35b23d23cf76a5cef373685efb6387e8ab3001ea1ed8f4b52c16e5f474f4532cc4c62f9aa678bb980942537a4c3079284ee9cf025951452db44bdcd0db64be5b26c6a4b7590f03260ec5bfcef86ddf5244db9b979e61c4ad9fb2f9b9a0b2aee18915ca9a57584905c343f2ed6b5fe2e499d2b609b8f990fbe9e5631e310d52afcaa3cd981eee6975d7eb626d97d1fe2a6e49237ee0b38eea93bbe1660d77dc082a44c93295fa09c9a350a32b495ba08d2ddaff48e4d8ad219d4bebc8f48f752e28b420dfde07d4316b25ff87f1c35b3ac3822ecccfccec9121686429b4ef60dbe55af4af91b53d95b96d063d9144e29eea7ffad17617adff8cecc17d336ceebd83ca51bcb48c939c73833b8eeaaeab6331ed79e54c500795be54e9c5c87a06d4590642bf3b6708c081b7cb5274456474131471d45cc90e482621926137575f32c3aa1b4b5ae3c82170123f9c43a059081ad0c4de598c844a8ed55dc85fa0edbef6ba8baec95bf5cc12de571c2546734238f258cbca691bc46f0ed32ba1a745e3e6196d522f910eb6b6bed0ba2edcd1937024a431bc70b6a0a58ba549be8accf1989955ba9f517a4e28c19d505895c0fde49227d445d7bec1d242fe58fb5dc7d8e0c2ae68a806e60a6c8310102c51658570f9b8fb3b5f058f8ff3a17a2da4140007b151316439f1e83c2be22570f241f5b10e787e8270b97c5024f7b79f4d2bfc7e702a6bd4f40eb7d79758504ad7e3514b67ebc0b1059df43c035c710ccc333f473c7447ad1b6b71fc8481e7df3984fdf7608434632646aa0457bda19e13b38b08d552e0e9c55adfa05c5884fd3e9f6ce123868bdb51a4c0febb7ba737785bf048d6fc93e6e0c5e486800b78686ade88f3e3b266b4ce46f195faf70e896e70c3f589e47ba3f96231109ff8760586b1ca3e7071e60b819982e5384f4439730049036834b2ce8a95a14d997dfffa6059b697c1402f0b8b47ea596c5fde7ca3dc155e5beecccd398415211635bff75ed7e05b8b82b6928e40f5a6e5deab920f2aea896f1b7f6daa95358df031fe5093ccd7a3eaa6bbbc65f03c9d22a5435bd7ed8de42c4bbb70f5b2f8e1246228a81fb957d307333fcda412bcd3946e513fb58413e44786a28a07d5a844ac846cab288f8b5736221fce2992aad86c38a39b1d7278f82d47f30eb5a8d059d0cc0346dbb0945c1b2ea502a1037ba7e6db0071fc75ab7adac3d10eff6c43dfe55b41503d4dfc35cbbd610839eb4f3906241da414576545019617fcb8f7a7a33ff4064ebfdb1996d98d4410effc693df8b05dfd16ee34c6edee72b905e9ba3fff9645c52f03dceb4d2f8ed9f5df2914acc8e2895925e5431a4442f7cd92ffaa8e70db8171955808ab3e1277d6e5f6252cb1c0307440b6fa5c2c8d37e46eb93ba5c1e400a6a76980e700ae76c2604d1b53d35af773f6381c8870e0b5132016c2b045e3818dc2fa88c81654f86f3efba042f2a02699f252b09e82a61b51ab474fe916dd4275c67067b82f390d4488a861edd821e7b66c7b490e6d4c3bd8dc20f9352908359c7ad3846d3c420edf149240873da570660ac7fdde47347e44b0a5c120069eb77626132a5d3d416ca873181bd9ef49fad872f27936cb3dfe751ffb9351651e37d7b0cb5f6d392607a0e99e0d57498c195a62968cfc330831264fb9084d08dbcd519c96c1d9747f94176e1c297ce7af494d20d5d0a2733a5aacb17841914eb465c6d7d67b79e0db579901da3e2d694927d9648311408cee26e76a2f03fbffde25ed2d1de23d840eb0d15ac50cfad1ce6b72abcd6c1308ec2b082fb34a6e5efcb2cff560f63a19d7fb5f62da5abfeaf27df578a1b9282d722751bcca31761c8b523659dcc1b2a6d39d089adeb06c5e34b4e5e9056004249333159adb2ffd9a2cf553a8baad60723f9406c165698f74181f0566706c65aa69395a33a426f120cc04c28fa157fb2dd91976ebd8cdd3ff47d2de79e31c110a9b049138860a918d2da9c9a2d0355d3d11b14d39c01db4f16e25ef728d0362972203f5bd041d5d8f85c084d3eb1eef2bf3773c42915ea6ab021579f0bf2e85bf208e740adc56002efa53d60f2862ed04a0d342e6577b3fe341b78ff5f87c0baa7f0a534f7ae9f823c1bd2125d13dbecca542eb7dcd1d7d347ce07ba579e643537257e8d047951ac6f5e472ed5ef4d0dc6ce788b55ab1f1bdb867196ce2ed9c9a5550d1e355cc1934c188fb7e29003a363b62e964df454065ba2c22ae06c892b0d7f5a5ab850954c9ff8876632e7d8ac84a4a4c87dacb54475b494c66d1e4c09af28f2ec7b0cc66a6e9b6828cf06928968b0deac9c25381733bdd6cbf9031509b37395bbae9d8b98185e100345aa8c42c3c198f90032c9bbe960d2e40f7a5658cc1b7da5eed6478f663e39802bd816e952a10769a048fb15a5dd57a6853967a7a5b05180b943a5b432bb50972c7dbebb628a314bcacd03a750d5e31079b1c1f437f102cd270a222e17654fb3f53e7430c43bdccc0c50c338e1c1ef8f9e02054c252470576c36c0cc152d33ec2eafada6f60f1afee8d2f5ded3e7777756ed5640679b55a66b68a4d923bec99663d809efe53648c05a04d27f1dc8e7dd1dc2da33d9fac2359b6bdac9c40e28988e2e002b87af9bb6201398034e19bb1cb673fca494da9d4d772ae6ff72163f48115f555f67e0d777cef6798c94cc29b0b4fed2559f9f1d2fd74466545374ae0a7e0b73e74df07e608765ffe2f81a1a4455b601eb07a523027e1221719b6c37c809254eaf3ee7155ad99593c5ba408e64942f02c1aaaaf97fb7fbbbb54a3c7c434aac6cdd1e44824f6d57de629083c8e0a9a30e5137661960d9fd40ace1efe2551cbb8e0d66dade5b537c1cc22ffce92553667b01bead06acbc9cf148fb5dd9f73ada386df9e7bf8968cfd127f3f7aec9948408484a9fe141cea8e812bae99954851c6d527af32fa39b454e9dfc7a1f331324419b05e8336c9576b920ae2261460de59a057326446af9f9590b863fe5e913d15410745d1c6f624b9b5714f33853e0dc2e13982aab38f1fb34e7dd8d7799a9efd2c5279f136487fe1dd1d1ee1ce6031116805c68847549ea6c5cb242105ea0e9a67d3667a35998040489d8064984b134010f45fe722289d6e69417786552a036fb8ae367d0142dfd5913aee8410a2fcbff8d212f84bdec8844adc6a556e60f3a70caf8e41a6df22375543343abb2b28196d533e46aefec016e2973360ff7ca8a90ca43bffc71cf880a58fc3fb3e915dcff9a1423edfb2db870bcf31ea00fad48d1a6467cf8fb42e6da29472828e6acd7b47126e0e1b870945e23463bed91e7163be345b6d1659b22e6e367201bb3afe3dc43facd1b2c26] */