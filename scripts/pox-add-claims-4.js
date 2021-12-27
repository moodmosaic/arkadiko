
// node proposal-emergency-shutdown.js
require('dotenv').config();
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const tx = require('@stacks/transactions');
const utils = require('./utils');
const network = utils.resolveNetwork();
const BN = require('bn.js');

async function transact() {
  const list = tx.listCV([
    tx.tupleCV({ 'to': tx.uintCV(778), 'ustx': tx.uintCV(12800865) }),
    tx.tupleCV({ 'to': tx.uintCV(779), 'ustx': tx.uintCV(1745573) }),
    tx.tupleCV({ 'to': tx.uintCV(780), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(781), 'ustx': tx.uintCV(27153) }),
    tx.tupleCV({ 'to': tx.uintCV(782), 'ustx': tx.uintCV(34911) }),
    tx.tupleCV({ 'to': tx.uintCV(783), 'ustx': tx.uintCV(1939525) }),
    tx.tupleCV({ 'to': tx.uintCV(784), 'ustx': tx.uintCV(12381928) }),
    tx.tupleCV({ 'to': tx.uintCV(785), 'ustx': tx.uintCV(19395) }),
    tx.tupleCV({ 'to': tx.uintCV(786), 'ustx': tx.uintCV(3893041) }),
    tx.tupleCV({ 'to': tx.uintCV(787), 'ustx': tx.uintCV(1090013) }),
    tx.tupleCV({ 'to': tx.uintCV(790), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(791), 'ustx': tx.uintCV(3297193) }),
    tx.tupleCV({ 'to': tx.uintCV(792), 'ustx': tx.uintCV(38790501) }),
    tx.tupleCV({ 'to': tx.uintCV(794), 'ustx': tx.uintCV(25221584) }),
    tx.tupleCV({ 'to': tx.uintCV(796), 'ustx': tx.uintCV(1939525) }),
    tx.tupleCV({ 'to': tx.uintCV(797), 'ustx': tx.uintCV(2327430) }),
    tx.tupleCV({ 'to': tx.uintCV(798), 'ustx': tx.uintCV(19395) }),
    tx.tupleCV({ 'to': tx.uintCV(799), 'ustx': tx.uintCV(27153) }),
    tx.tupleCV({ 'to': tx.uintCV(800), 'ustx': tx.uintCV(15516) }),
    tx.tupleCV({ 'to': tx.uintCV(801), 'ustx': tx.uintCV(31032) }),
    tx.tupleCV({ 'to': tx.uintCV(802), 'ustx': tx.uintCV(46549) }),
    tx.tupleCV({ 'to': tx.uintCV(803), 'ustx': tx.uintCV(19395) }),
    tx.tupleCV({ 'to': tx.uintCV(804), 'ustx': tx.uintCV(1423611) }),
    tx.tupleCV({ 'to': tx.uintCV(805), 'ustx': tx.uintCV(217227) }),
    tx.tupleCV({ 'to': tx.uintCV(806), 'ustx': tx.uintCV(31032) }),
    tx.tupleCV({ 'to': tx.uintCV(807), 'ustx': tx.uintCV(318082) }),
    tx.tupleCV({ 'to': tx.uintCV(808), 'ustx': tx.uintCV(1939525) }),
    tx.tupleCV({ 'to': tx.uintCV(809), 'ustx': tx.uintCV(31032) }),
    tx.tupleCV({ 'to': tx.uintCV(811), 'ustx': tx.uintCV(1939525) }),
    tx.tupleCV({ 'to': tx.uintCV(813), 'ustx': tx.uintCV(116372) }),
    tx.tupleCV({ 'to': tx.uintCV(814), 'ustx': tx.uintCV(27153) }),
    tx.tupleCV({ 'to': tx.uintCV(815), 'ustx': tx.uintCV(3111982) }),
    tx.tupleCV({ 'to': tx.uintCV(816), 'ustx': tx.uintCV(1202029) }),
    tx.tupleCV({ 'to': tx.uintCV(817), 'ustx': tx.uintCV(13576675) }),
    tx.tupleCV({ 'to': tx.uintCV(819), 'ustx': tx.uintCV(380147) }),
    tx.tupleCV({ 'to': tx.uintCV(821), 'ustx': tx.uintCV(616769) }),
    tx.tupleCV({ 'to': tx.uintCV(822), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(823), 'ustx': tx.uintCV(8146005) }),
    tx.tupleCV({ 'to': tx.uintCV(824), 'ustx': tx.uintCV(872786) }),
    tx.tupleCV({ 'to': tx.uintCV(825), 'ustx': tx.uintCV(1939525) }),
    tx.tupleCV({ 'to': tx.uintCV(826), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(827), 'ustx': tx.uintCV(2730851) }),
    tx.tupleCV({ 'to': tx.uintCV(828), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(829), 'ustx': tx.uintCV(11637150) }),
    tx.tupleCV({ 'to': tx.uintCV(830), 'ustx': tx.uintCV(10997107) }),
    tx.tupleCV({ 'to': tx.uintCV(831), 'ustx': tx.uintCV(15977807) }),
    tx.tupleCV({ 'to': tx.uintCV(832), 'ustx': tx.uintCV(11637150) }),
    tx.tupleCV({ 'to': tx.uintCV(834), 'ustx': tx.uintCV(1074497) }),
    tx.tupleCV({ 'to': tx.uintCV(835), 'ustx': tx.uintCV(962004) }),
    tx.tupleCV({ 'to': tx.uintCV(836), 'ustx': tx.uintCV(3123696) }),
    tx.tupleCV({ 'to': tx.uintCV(837), 'ustx': tx.uintCV(174541738) }),
    tx.tupleCV({ 'to': tx.uintCV(838), 'ustx': tx.uintCV(42277767) }),
    tx.tupleCV({ 'to': tx.uintCV(840), 'ustx': tx.uintCV(895399) }),
    tx.tupleCV({ 'to': tx.uintCV(841), 'ustx': tx.uintCV(512035) }),
    tx.tupleCV({ 'to': tx.uintCV(842), 'ustx': tx.uintCV(31032) }),
    tx.tupleCV({ 'to': tx.uintCV(843), 'ustx': tx.uintCV(23274) }),
    tx.tupleCV({ 'to': tx.uintCV(845), 'ustx': tx.uintCV(15516) }),
    tx.tupleCV({ 'to': tx.uintCV(846), 'ustx': tx.uintCV(31032) }),
    tx.tupleCV({ 'to': tx.uintCV(848), 'ustx': tx.uintCV(1939525) }),
    tx.tupleCV({ 'to': tx.uintCV(849), 'ustx': tx.uintCV(5818575) }),
    tx.tupleCV({ 'to': tx.uintCV(852), 'ustx': tx.uintCV(27153) }),
    tx.tupleCV({ 'to': tx.uintCV(853), 'ustx': tx.uintCV(6594385) }),
    tx.tupleCV({ 'to': tx.uintCV(854), 'ustx': tx.uintCV(5818575) }),
    tx.tupleCV({ 'to': tx.uintCV(855), 'ustx': tx.uintCV(23274) }),
    tx.tupleCV({ 'to': tx.uintCV(856), 'ustx': tx.uintCV(31032) }),
    tx.tupleCV({ 'to': tx.uintCV(857), 'ustx': tx.uintCV(193953) }),
    tx.tupleCV({ 'to': tx.uintCV(858), 'ustx': tx.uintCV(4208769) }),
    tx.tupleCV({ 'to': tx.uintCV(859), 'ustx': tx.uintCV(116372) }),
    tx.tupleCV({ 'to': tx.uintCV(860), 'ustx': tx.uintCV(1935646) }),
    tx.tupleCV({ 'to': tx.uintCV(861), 'ustx': tx.uintCV(34911) }),
    tx.tupleCV({ 'to': tx.uintCV(863), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(864), 'ustx': tx.uintCV(543067) }),
    tx.tupleCV({ 'to': tx.uintCV(865), 'ustx': tx.uintCV(159041) }),
    tx.tupleCV({ 'to': tx.uintCV(866), 'ustx': tx.uintCV(73701952) }),
    tx.tupleCV({ 'to': tx.uintCV(868), 'ustx': tx.uintCV(23274) }),
    tx.tupleCV({ 'to': tx.uintCV(869), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(870), 'ustx': tx.uintCV(27153) }),
    tx.tupleCV({ 'to': tx.uintCV(873), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(874), 'ustx': tx.uintCV(1833535) }),
    tx.tupleCV({ 'to': tx.uintCV(875), 'ustx': tx.uintCV(5856930) }),
    tx.tupleCV({ 'to': tx.uintCV(876), 'ustx': tx.uintCV(7321162) }),
    tx.tupleCV({ 'to': tx.uintCV(878), 'ustx': tx.uintCV(6687482) }),
    tx.tupleCV({ 'to': tx.uintCV(879), 'ustx': tx.uintCV(19395) }),
    tx.tupleCV({ 'to': tx.uintCV(880), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(881), 'ustx': tx.uintCV(27153) }),
    tx.tupleCV({ 'to': tx.uintCV(882), 'ustx': tx.uintCV(15516) }),
    tx.tupleCV({ 'to': tx.uintCV(883), 'ustx': tx.uintCV(1939525) }),
    tx.tupleCV({ 'to': tx.uintCV(884), 'ustx': tx.uintCV(308464968) }),
    tx.tupleCV({ 'to': tx.uintCV(886), 'ustx': tx.uintCV(31032) }),
    tx.tupleCV({ 'to': tx.uintCV(888), 'ustx': tx.uintCV(174557) }),
    tx.tupleCV({ 'to': tx.uintCV(890), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(891), 'ustx': tx.uintCV(1815395) }),
    tx.tupleCV({ 'to': tx.uintCV(892), 'ustx': tx.uintCV(7758) }),
    tx.tupleCV({ 'to': tx.uintCV(893), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(895), 'ustx': tx.uintCV(1012432) }),
    tx.tupleCV({ 'to': tx.uintCV(896), 'ustx': tx.uintCV(1427490) }),
    tx.tupleCV({ 'to': tx.uintCV(897), 'ustx': tx.uintCV(3514158) }),
    tx.tupleCV({ 'to': tx.uintCV(898), 'ustx': tx.uintCV(1722298) }),
    tx.tupleCV({ 'to': tx.uintCV(899), 'ustx': tx.uintCV(19395) }),
    tx.tupleCV({ 'to': tx.uintCV(900), 'ustx': tx.uintCV(11637150) }),
    tx.tupleCV({ 'to': tx.uintCV(901), 'ustx': tx.uintCV(4266955) }),
    tx.tupleCV({ 'to': tx.uintCV(902), 'ustx': tx.uintCV(17773830) }),
    tx.tupleCV({ 'to': tx.uintCV(903), 'ustx': tx.uintCV(8021876) }),
    tx.tupleCV({ 'to': tx.uintCV(904), 'ustx': tx.uintCV(411179) }),
    tx.tupleCV({ 'to': tx.uintCV(905), 'ustx': tx.uintCV(31032) }),
    tx.tupleCV({ 'to': tx.uintCV(906), 'ustx': tx.uintCV(6982290) }),
    tx.tupleCV({ 'to': tx.uintCV(907), 'ustx': tx.uintCV(1454644) }),
    tx.tupleCV({ 'to': tx.uintCV(909), 'ustx': tx.uintCV(352994) }),
    tx.tupleCV({ 'to': tx.uintCV(911), 'ustx': tx.uintCV(193953) }),
    tx.tupleCV({ 'to': tx.uintCV(912), 'ustx': tx.uintCV(7758100) }),
    tx.tupleCV({ 'to': tx.uintCV(914), 'ustx': tx.uintCV(89218) }),
    tx.tupleCV({ 'to': tx.uintCV(915), 'ustx': tx.uintCV(7758) }),
    tx.tupleCV({ 'to': tx.uintCV(919), 'ustx': tx.uintCV(186194) }),
    tx.tupleCV({ 'to': tx.uintCV(920), 'ustx': tx.uintCV(7176243) }),
    tx.tupleCV({ 'to': tx.uintCV(921), 'ustx': tx.uintCV(5430670) }),
    tx.tupleCV({ 'to': tx.uintCV(922), 'ustx': tx.uintCV(27153) }),
    tx.tupleCV({ 'to': tx.uintCV(924), 'ustx': tx.uintCV(1163715) }),
    tx.tupleCV({ 'to': tx.uintCV(925), 'ustx': tx.uintCV(814601) }),
    tx.tupleCV({ 'to': tx.uintCV(926), 'ustx': tx.uintCV(8533910) }),
    tx.tupleCV({ 'to': tx.uintCV(928), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(933), 'ustx': tx.uintCV(1078376) }),
    tx.tupleCV({ 'to': tx.uintCV(934), 'ustx': tx.uintCV(864255) }),
    tx.tupleCV({ 'to': tx.uintCV(935), 'ustx': tx.uintCV(174557) }),
    tx.tupleCV({ 'to': tx.uintCV(937), 'ustx': tx.uintCV(13576675) }),
    tx.tupleCV({ 'to': tx.uintCV(938), 'ustx': tx.uintCV(6442623) }),
    tx.tupleCV({ 'to': tx.uintCV(939), 'ustx': tx.uintCV(581858) }),
    tx.tupleCV({ 'to': tx.uintCV(940), 'ustx': tx.uintCV(3871292) }),
    tx.tupleCV({ 'to': tx.uintCV(942), 'ustx': tx.uintCV(3262771) }),
    tx.tupleCV({ 'to': tx.uintCV(943), 'ustx': tx.uintCV(186194) }),
    tx.tupleCV({ 'to': tx.uintCV(944), 'ustx': tx.uintCV(2521383) }),
    tx.tupleCV({ 'to': tx.uintCV(945), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(946), 'ustx': tx.uintCV(3452355) }),
    tx.tupleCV({ 'to': tx.uintCV(947), 'ustx': tx.uintCV(143525) }),
    tx.tupleCV({ 'to': tx.uintCV(948), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(951), 'ustx': tx.uintCV(9175857) }),
    tx.tupleCV({ 'to': tx.uintCV(952), 'ustx': tx.uintCV(1327059) }),
    tx.tupleCV({ 'to': tx.uintCV(953), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(954), 'ustx': tx.uintCV(3893041) }),
    tx.tupleCV({ 'to': tx.uintCV(955), 'ustx': tx.uintCV(38790501) }),
    tx.tupleCV({ 'to': tx.uintCV(956), 'ustx': tx.uintCV(20694732) }),
    tx.tupleCV({ 'to': tx.uintCV(958), 'ustx': tx.uintCV(8727863) }),
    tx.tupleCV({ 'to': tx.uintCV(959), 'ustx': tx.uintCV(31032401) }),
    tx.tupleCV({ 'to': tx.uintCV(960), 'ustx': tx.uintCV(23427719) }),
    tx.tupleCV({ 'to': tx.uintCV(962), 'ustx': tx.uintCV(1124925) }),
    tx.tupleCV({ 'to': tx.uintCV(963), 'ustx': tx.uintCV(156184794) }),
    tx.tupleCV({ 'to': tx.uintCV(964), 'ustx': tx.uintCV(11633271) }),
    tx.tupleCV({ 'to': tx.uintCV(965), 'ustx': tx.uintCV(2715335) }),
    tx.tupleCV({ 'to': tx.uintCV(966), 'ustx': tx.uintCV(193953) }),
    tx.tupleCV({ 'to': tx.uintCV(967), 'ustx': tx.uintCV(31032401) }),
    tx.tupleCV({ 'to': tx.uintCV(968), 'ustx': tx.uintCV(19395250) }),
    tx.tupleCV({ 'to': tx.uintCV(969), 'ustx': tx.uintCV(7758100) }),
    tx.tupleCV({ 'to': tx.uintCV(970), 'ustx': tx.uintCV(783568) }),
    tx.tupleCV({ 'to': tx.uintCV(972), 'ustx': tx.uintCV(1838670) }),
    tx.tupleCV({ 'to': tx.uintCV(974), 'ustx': tx.uintCV(36199295) }),
    tx.tupleCV({ 'to': tx.uintCV(975), 'ustx': tx.uintCV(574099) }),
    tx.tupleCV({ 'to': tx.uintCV(976), 'ustx': tx.uintCV(125432008) }),
    tx.tupleCV({ 'to': tx.uintCV(977), 'ustx': tx.uintCV(29092876) }),
    tx.tupleCV({ 'to': tx.uintCV(978), 'ustx': tx.uintCV(3378653) }),
    tx.tupleCV({ 'to': tx.uintCV(979), 'ustx': tx.uintCV(434454) }),
    tx.tupleCV({ 'to': tx.uintCV(980), 'ustx': tx.uintCV(11959111) }),
    tx.tupleCV({ 'to': tx.uintCV(981), 'ustx': tx.uintCV(116372) }),
    tx.tupleCV({ 'to': tx.uintCV(982), 'ustx': tx.uintCV(818480) }),
    tx.tupleCV({ 'to': tx.uintCV(985), 'ustx': tx.uintCV(2017106) }),
    tx.tupleCV({ 'to': tx.uintCV(987), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(988), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(989), 'ustx': tx.uintCV(275413) }),
    tx.tupleCV({ 'to': tx.uintCV(991), 'ustx': tx.uintCV(2327430) }),
    tx.tupleCV({ 'to': tx.uintCV(992), 'ustx': tx.uintCV(47712316) }),
    tx.tupleCV({ 'to': tx.uintCV(993), 'ustx': tx.uintCV(4069124) }),
    tx.tupleCV({ 'to': tx.uintCV(995), 'ustx': tx.uintCV(2333365) }),
    tx.tupleCV({ 'to': tx.uintCV(996), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(997), 'ustx': tx.uintCV(56246226) }),
    tx.tupleCV({ 'to': tx.uintCV(999), 'ustx': tx.uintCV(70659622) }),
    tx.tupleCV({ 'to': tx.uintCV(1000), 'ustx': tx.uintCV(31032401) }),
    tx.tupleCV({ 'to': tx.uintCV(1001), 'ustx': tx.uintCV(2284761) }),
    tx.tupleCV({ 'to': tx.uintCV(1003), 'ustx': tx.uintCV(1745573) }),
    tx.tupleCV({ 'to': tx.uintCV(1008), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(1016), 'ustx': tx.uintCV(2459318) }),
    tx.tupleCV({ 'to': tx.uintCV(1017), 'ustx': tx.uintCV(38790501) }),
    tx.tupleCV({ 'to': tx.uintCV(1018), 'ustx': tx.uintCV(3506661) }),
    tx.tupleCV({ 'to': tx.uintCV(1020), 'ustx': tx.uintCV(3103240) }),
    tx.tupleCV({ 'to': tx.uintCV(1022), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(1023), 'ustx': tx.uintCV(2909288) }),
    tx.tupleCV({ 'to': tx.uintCV(1024), 'ustx': tx.uintCV(7758100) }),
    tx.tupleCV({ 'to': tx.uintCV(1026), 'ustx': tx.uintCV(8533910) }),
    tx.tupleCV({ 'to': tx.uintCV(1027), 'ustx': tx.uintCV(38790501) }),
    tx.tupleCV({ 'to': tx.uintCV(1029), 'ustx': tx.uintCV(10824463) }),
    tx.tupleCV({ 'to': tx.uintCV(1031), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(1032), 'ustx': tx.uintCV(11637150) }),
    tx.tupleCV({ 'to': tx.uintCV(1033), 'ustx': tx.uintCV(6273080) }),
    tx.tupleCV({ 'to': tx.uintCV(1034), 'ustx': tx.uintCV(89218) }),
    tx.tupleCV({ 'to': tx.uintCV(1036), 'ustx': tx.uintCV(77581) }),
    tx.tupleCV({ 'to': tx.uintCV(1037), 'ustx': tx.uintCV(3491145) }),
    tx.tupleCV({ 'to': tx.uintCV(1039), 'ustx': tx.uintCV(492639) }),
    tx.tupleCV({ 'to': tx.uintCV(1040), 'ustx': tx.uintCV(96976252) }),
    tx.tupleCV({ 'to': tx.uintCV(1041), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(1042), 'ustx': tx.uintCV(3169184) }),
    tx.tupleCV({ 'to': tx.uintCV(1043), 'ustx': tx.uintCV(11637150) })
  ]);
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: 'arkadiko-claim-yield-v2-1',
    functionName: 'add-claims',
    functionArgs: [list],
    senderKey: process.env.STACKS_PRIVATE_KEY,
    nonce: new BN(398, 10),
    postConditionMode: 1,
    network
  };

  const transaction = await tx.makeContractCall(txOptions);
  const result = tx.broadcastTransaction(transaction, network);
  await utils.processing(result, transaction.txid(), 0);
};

transact();