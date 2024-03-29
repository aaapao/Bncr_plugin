/**
 * @author Doraemon
 * @name Doraemon_变量替换
 * @origin 红灯区
 * @version v1.0.2
 * @description Doraemon_变量替换
 * @rule ^(变量同步)$
 * @admin true
 * @public false
 * @priority 1000
 * @disable false
   说明：
      1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件
        Doraemon_变量替换.js 放到自用插件中

      2、设置一些变量
        （必填）执行面板 对应红灯区奶酪棒位置，从0开始  ---- 这个是设置存量数据的容器面板
        set Doraemon variableReplacement_index 0

  注意：
    1、无界超授可用
    2、自用插件
  ----------------------

  功能：
    1、从a面板复制 xxx变量 - 》 同步到b 变量，如复制主容器的无线签到id，cj分发到一个容器，lzkj分发到一个容器（已实现）
    2、目前签到类相关替换变量支持：（已实现）
        LZKJ_SEVENDAY
        CJHY_SEVENDAY
        LZKJ_SIGN
        CJHY_SIGN
        jd_wxSign_sign_lzkj_Ids
        jd_wxSign_sevenDay_lzkj_Ids
        jd_wxSign_sign_cjhy_Ids
        jd_wxSign_sevenDay_cjhy_Ids
        jd_lzkj_10023_rlqd_Ids
        jd_lzkj_10040_qrqd_Ids
        jd_wxFansInterActionActivity_activityId

    3、支持同步变量，主容器的变量 abcd，同步到分容器，实现同步效果 （已实现）
      代码示例：
        const data = await ql.getQlConfigCustomValue(Host, tokenObj, [  
          { name: 'M_WX_PROXY_URL'},
          { name: 'M_WX_STOP_KEYWORD'},
          { name: 'M_WX_NOT_LUCK_DRAW_LIST'},
          { name: 'M_WX_ADDRESS_STOP_KEYWORD'},
          { name: 'M_WX_ADDRESS_STOP_KEYWORD_RULE'},
          { name: 'M_WX_NOT_TEAM_LIST'},
          ...
        ]);

        await updateSignData(data, 1, '测试签到替换', {
          M_WX_PROXY_URL: 'M_WX_PROXY_URL',
          xxxx: 'xxxx',
          ...
        });
        
        await updateSignData(data, 2, '测试签到替换', {
          M_WX_PROXY_URL: 'M_WX_PROXY_URL',
          xxxx: 'xxxx',
          ...
        });
    4、cron 定时替换结果会推送到tgBot
  ----------------------

  更新日志：
      v1.0.0 插件上线
      2023.9.11 v1.0.1 支持替换指定变量
      2023.10.18 v1.0.2 bugfix
*/

const Doraemon_tool = require('./mod/Doraemon_tool');
const ql = require('./mod/Doraemon_ql');

//插件入口
module.exports = async s => {

  /**
   * 变量同步
   */
  async function autoReplaceId() {

    /** Code Encryption Block[419fd178b7a37c9eae7b7426c4a042037c5a778ee8d16395b1faadbf384d12e377bd465778c3595ebf3f64afec5fa9613dfb1d6dee6955cdd741d5473a91926f705e43ad4e097f771bbf49689803f4082cfa85fbd69096b51d956faa78ff3c2e5594636c97129499cdf11f94f2fa8cc95fd263120b66bd4d20b1b833070ee77a8eb2a5ff4614bb2ffa3fd7f033a21b400357dbab4508f06f94032a88c1e2885d42b7f2f38fa8f3123666f340198ab5b1a00ae385d652df59c6fb6368fbd9f8107713dacacbbe873f669f2a1c43f876c88edb70d27976a841ffb240571e8b84309c395b02f7cefb9ec2dfb299a99c53e82b9896b41927911e348bb3a5d6e237e0563c0983cab8200db9f55460cd64a7c7c6a45fee83fd820bea3942db07f88004818c53c8e56c63ed2c28360b1f9065f77ae1c2fa87563f6014d860686feb03867dd6407b3ce200a42f596c20ef4c6e11e7ae1cc026c43e8bfa7e4b89d1071897d9440ed954e5ec78b831da0361ee20c0ba86d75708da0bac4a2350c97d68d2ce69fd639275c68e3b08c3ab6579993fe611000259993549e4dabc7454be2f9c689cbeccdd447978b5a54fe060bb0802b322c6269b1ad38b9dacfba7744f8ff9cdaa0ebbceac980c6f7ee544d3294555dc5b0cb42aeaad04b3f23ff7cf06b499981f2f3f917c0c37f3e8b62fbbd8cdd2465cf16df2afa95178e191456954770377b33255224aaa57af49926b6544297a5e] */

    // 示例
    const exampleQlNum = 1;
    const exampleMappings = {
      // 这里填写你需要替换的id，如 aaa:aaa 两者需要对应
      aaa: 'aaaa'
    };
    // 替换数据
    await updateSignData(data, exampleQlNum, '示例', exampleMappings);
    // ....

    /** 变量同步 */
    const customData = await ql.getQlConfigCustomValue(stockDataHost, stockDataTokenObj, [
      { name: 'M_WX_BLOCK_PIN_REGX'},
      { name: 'jd_wxSign_lzkjFilter'},
      { name: 'jd_wxSign_cjhyFilter'},
      { name: 'jd_wxSign_cjhyInterval'},
      { name: 'jd_wxSign_lzkjInterval'},
      { name: 'QITOQITO'},
    ]);

    await updateSignData(customData, exampleQlNum, '变量同步', {
      M_WX_BLOCK_PIN_REGX: 'M_WX_BLOCK_PIN_REGX',
      jd_wxSign_lzkjFilter: 'jd_wxSign_lzkjFilter',
      jd_wxSign_cjhyFilter: 'jd_wxSign_cjhyFilter',
      jd_wxSign_cjhyInterval: 'jd_wxSign_cjhyInterval',
      jd_wxSign_lzkjInterval: 'jd_wxSign_lzkjInterval',
      QITOQITO: 'QITOQITO',
    });

    // ....

    if (replyMsg) {
      s.reply(msg += replyMsg);
    }
  }

  /** Code Encryption Block[419fd178b7a37c9eae7b7426c4a04203a0d819e33b5fd30cd3886b60c74fedb0797ef168937d95964412780450de031a9273995da106642b54dc2ee9d3849c470c2c216eaed889bb13dc0d143d04c9c5a63e611dbd3b7d1e53c2e2afaa30965c3bf92e82dac434c5a4749e6c4f744c3c9b59c07cc32e8988decfeea59f8432cbdee30fec801513ad423c2e912cac46b3142fffe8c78049d606a3f28d2ca303a3f6554d42fce0ab5084d85e6e56a415d11ecad7cedb6aeab85b46df29b3b4229c54a33107a4089294fa74cd3078633accb881186a4ed2e594e486c0b8ad6d21cbf6c92618cb668f71eed8cdcbfcbb7c18a030840c51da3721c7367707066c9971eb8e89e7da17af6a1c0df69a4157c94554423d8be81c216ad8fc6c4112d5ef0f7ba918c1813bd39c6683784fec4aab1af071255b73524854fe0c0e83b1f40b213ddc7735119a82b22589135691ab8125249611eef9cd007d5b6a0a15727c322da4b1643701c9a664cea61460343d75c412eb7e636efaa7a9af7612e1f9d24223c70113203daa764871efdb67d956a07578c5f5cf9a94b4c65ba6f2b6036e4898905bfc95c7cf38f39a9c60132f3e9acde6a9e73120b479fece5d2d36abc7a7e309ff3556e85889770921c5484940afe85564d4bb350f5d735d26f88eeca26f7e201eb481392262a89c01ad11e76e98c00ee52988825c55aca1b1af715b54d48f93e94386d9684c2e662068de800b55bbcb46ed145bd30683d5fa8154bdef03a510de0418e5b071725858b43c4bc6f436b1e52b83809d2977ad68cbde8d86351f86db13fabdcfdc30f67c6b86fa6b13827aebd340d322d9ec4e3d7fe5941ccc32f03835dfd0a303c2031ff63a75155c5d6c5e4dd14e2f2f3288c7a20645fb769556e210114fa5891bdaf3f9003c294ff5d4fb7e3e2f763bed40f8b7fa7cfc3aff961095c5147c35496a0386d2418e51a43e150ca515035f1a1f0c4a246bca2243f9f8c4f0acf5cde374432db1138ac3b8de3c36a4f802cd4399dcb0c785150ceac7b2d90c8663620d9fca4bf4422ae342e3599a79be0c96e773e20e070e42210ae0a0718380670ed43dc7c0cc896589a7182e7846a086d9942df51b6ca18e3fefd46bccf9025680e58a38d2bfa5372023c5efe1aa62702437903fa93176f949a012d117a511d6ff4e27808cd5ca8fd0a2fe38194d26d8cdd5e2b6d0c61b573f89d40f80c0feebe42c8f9816d625061095bc0a160acb3bd808096904d5cf21230877833f5c22f558cb2c7b6b856a22ef69941fcfb79d57ef7ac2f6fb81834a6ed156e500867b1f76b8dbb8afed383e79ad2c0d0e4f6722c8c6a787c0aed99061e1fd633d0fb0925b2028f357fe1a7e27d2454e6f6285e48a2d5aee0d4103fd509da6a709fb94c199488d241c839d760a0141c25e0ccb38a3f27925d361a7abdf39c0f8f772df7f2097aeb050feecea11bcfba48594fb60fe93c6bf2f1451339ed0b733cf6d01528f6e778529f08c6aff7b96b1871a08e5c096815f11d861e11ec2266cf5396a0314c1777f69cf909997d854eb7772cfd25dce110c35995b2869a7f0626eb562a32187f6d8b5bfa92402ce5dde84575bc7ad0fcba1658af034ab773c3a689b84dfa2a1f54c960e0ca4c176d7c69fbe0804e00fdc601b25cf4add0bf6b8ecaf0ac94aa13adc44c0ed8fb54c71dd1785072c5e8a5656cf25778d8a570583a5a16872e9f37367286cd4df99025228370c57b7495add4f718309d771e185143deaa3c28c7930d4c112a79d3fb66f262e42a1d739d6ea577829282d0cf1554f62b412c03c60ee2bc7cb0b95e9e94755aa7cde07c341ec98c879726bfc0b5f82bc43348afae4cb3609c6a365bcf45761677422fe5e36ca28dabf558290f43a4cf71dc5dfcab94df649554a73b1ad7467faff068cd91ae2901104f76938e95962ca0f59402a325a879783964937e633a43a7202a2ba64e69aff351949effd99d92d87cce52691903aff1986f634d13f288c94813152e9fe6c55115cbff2ae6eae9cbaeba0c49b5a389d0fe490b07859324cc18657f3173544e4a63aa34b4cdd1c569c511fae9a91024f8da9b743f68881df9d9b0f62b798cfbabf529da7f773c7daacecbe060a8604c9f605365de6ada7a68f7f51f0f9675b2243793ba9d5d716983f23bd0c20e731e1d4b2ef42ff913e91db3cc56a132e474c83843ccc96bede0dd92c34ec47bc69cadcf293f15352751dcd2a3f93ef832d699fbf521f17079d15bcc5945c2e2fe5f3e3f3584e092e349558474475a9f181f169dcb0ae3f4f4714f8968b6d3c06b04a8f0aeec3a90715abd1730064291feae0f99829f1f639160141f261c025924b101e34a7bd1df6feb92fd4869d9549cea1cffc98bdb93fab537fa16cfb546fb01d59023d53ab2acd7cbe0b9fab44205372c3cf3c39739a9f3abea24510fe5667dc261f18b7f5dc1678c6cef296d57bbdf501119fac6b2548e2abaf3b1b534b09a00e90a899bfff35694da90d3922f678effd7fb73cd54655c0a9b2321f1c89fcb11fd988f39e465999943749c84b733a6fd6fd835e757757461e56ddf628ce138a7809b79d534dd404ae938b842eb73825fff0609a91354c970c5c4a5e2078aad10f71c49756bed937ed6c8d2a345ccb83ebdbea536d3f887f58e896a48c380c9af3ad38831b3a089ff901b33032f642fdf45e7b7f91739c539c4c8937216fa7e12aa8c7a6465fb203538a6984ede955b638e8f425ae096abfde1214255a201ee61e8ba8474439fd3659d84b4f5fda350a488ef02641fa6009b8545c9b1604c764b24ad8a2ad725f94f23d5d27f329ca7908c70d19aaad8f95aa1683a70bf58ddf7071d3103487ef57cb5778d0cdff98662f9a9584f255b02691ab67b1392c55cb8913d26ef3815d69d48b76743ccafadc61d09183fa73e07d3633da29c6a9c8ab9aaf54b0e8afde9288b233da69670b2578d41541872432e93182a6d383fcbdb1a24b6e1e58383f67b3092d60dd0500fa188fe0059ecc53573ecaf72fafa589d158f15ce0bc66e87f65861dcbff898ae876930f13455492d5d2913d4d916146383a195106a1e2ae817576074ac94abb31e62d475d369fcb5d1a3a51e6039095c3f28bc3379bc0341587ec364a8efc3b62cfb09beb51278ccb8d78f4ff12975d2bd8a30ad0508699ca7f0809992a5cb6a70ca6feba8655cf7b92fb0082dc5246619a0b7478f37bcfa9b9f7ab64bfc44ec433a8ca5c5d339cb7403b01016cf72b263285495ae308218f1fa61c2d59c8cbc2cb9483f03ece50774c56a7e836d0eeb27698f9f477bdb007f1dcb5ae6a7053b6e8357ac1b1f9b9d68a06e2fcbc2064c496cff55c186c1cba3bdb3d1276b663b35bc5ae2ffc6a859fdcc6df6e475d0c67bd40fbb2a6c05075398124d107fb6b25adf5ee29a613ef0a249afba3d6240095d7fab2c71fb1252aed751d75bc8c130676f176cd15f0aa1efd44e32ee0d2ab27a40e629b8de80a4f6b18fa65bdaa706ed64a5f8ee81807a74b42c9affa5cf9b87baa7b72d8212f2cff94836798a40a19dbfc013f7fe7db2795ad29ef6766d8e047adfc47c69b59bec72edcc436f837339362b7f85d0c0252244af2331c02f1868546f2b24a90586fbf9d19fa42973670a9b9fa6a8df52dfe4be0b6fb1f55a99b066386890bdf07d63be1e02f18750b4b330993abafa60bdf9e48e9c0c07e3035f776b29187e2126a60a15621f21648d6587345bc0e57785714e0753947bb89a2e2e6d53b76f20af533348783a7df1b5ae801b32be76553d7b7b27e6a31777067716a718fc5fa4dcfdcf45d3bed89f2a611f6e65e49fe526c3433c86f64f325b04f0b9457a081fa2bfcf63fe9b51e22f8d35fbe031f2a153ba4af07363ae66e4815f0b0bb3851b7569e8c8b7a8f5aa98929f44fe3a116be2d4a7ac183236f499676289e2d03179dd5d7507f6c45ab0258af2cd9a3bb423223bb57b04b479dbe0acf9025f2fba8ce6bc4506d1991e3a150fbbeba3c38405eb6529edfd1c1e86222ed52ab0a3b4d780d21d02b4c2aeb7e1076968aa33beffa2ab6627cdc58d9cf2ef030b2e1fd86369f094d2c62c87a9674f25809a31091904fecb1cf4c4b5bbe252514293ecd7b5292a30e0c27b52e635c14f9f9bfda54b8d8caa18c8bdd5d26cb80841ec2a3e34f8b3ae1accdc3020b05e9c5d34071397e835eba10636db8c699e6b65dc1d88f24eb78046c41bcb294757c59d3cf8b38b90e26de8d5c96532a3c35d9cef25abbb63116d99140cd92378ea4ad3408ca0f309d14964958839e7293c0902dc1773f3a5c82ab520542fab6da58c1dc8a48da21f4f5740256cae56321ad1c594cfc00d7b7632c6e95f5f0176937a6dd278d4468425e79ac1700c36828dac9418d94ba7b23be55aacbd05ea8394990cd59ee6afe32a13d145d55f99ff8113ec0b6ca6a6c6e71cab15736fe33d525db779788fbf897bd11df003368957e10d5cb9be423d28ef44e2b49d73564e74dc6a7a1bb2f61c9651762637700e1511e4cc156530f0b3ded389ca601ece98e7d35dafcb34d1e51f6e4fb3c4a0118b3f335ed4129] */
};
