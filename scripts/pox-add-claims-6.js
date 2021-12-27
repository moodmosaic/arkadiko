
// node proposal-emergency-shutdown.js
require('dotenv').config();
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const tx = require('@stacks/transactions');
const utils = require('./utils');
const network = utils.resolveNetwork();
const BN = require('bn.js');

async function transact() {
  const list = tx.listCV([
    tx.tupleCV({ 'to': tx.uintCV(1317), 'ustx': tx.uintCV(3552166) }),
    tx.tupleCV({ 'to': tx.uintCV(1318), 'ustx': tx.uintCV(6225007) }),
    tx.tupleCV({ 'to': tx.uintCV(1319), 'ustx': tx.uintCV(11637150) }),
    tx.tupleCV({ 'to': tx.uintCV(1320), 'ustx': tx.uintCV(1978316) }),
    tx.tupleCV({ 'to': tx.uintCV(1321), 'ustx': tx.uintCV(193953) }),
    tx.tupleCV({ 'to': tx.uintCV(1322), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(1324), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(1326), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1327), 'ustx': tx.uintCV(12412960) }),
    tx.tupleCV({ 'to': tx.uintCV(1329), 'ustx': tx.uintCV(62064801) }),
    tx.tupleCV({ 'to': tx.uintCV(1330), 'ustx': tx.uintCV(77581002) }),
    tx.tupleCV({ 'to': tx.uintCV(1331), 'ustx': tx.uintCV(77581002) }),
    tx.tupleCV({ 'to': tx.uintCV(1332), 'ustx': tx.uintCV(77581002) }),
    tx.tupleCV({ 'to': tx.uintCV(1333), 'ustx': tx.uintCV(38790501) }),
    tx.tupleCV({ 'to': tx.uintCV(1334), 'ustx': tx.uintCV(19395) }),
    tx.tupleCV({ 'to': tx.uintCV(1335), 'ustx': tx.uintCV(38790501) }),
    tx.tupleCV({ 'to': tx.uintCV(1338), 'ustx': tx.uintCV(4965184) }),
    tx.tupleCV({ 'to': tx.uintCV(1339), 'ustx': tx.uintCV(64004326) }),
    tx.tupleCV({ 'to': tx.uintCV(1340), 'ustx': tx.uintCV(11637150) }),
    tx.tupleCV({ 'to': tx.uintCV(1341), 'ustx': tx.uintCV(34911451) }),
    tx.tupleCV({ 'to': tx.uintCV(1343), 'ustx': tx.uintCV(72482425) }),
    tx.tupleCV({ 'to': tx.uintCV(1345), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1346), 'ustx': tx.uintCV(969763) }),
    tx.tupleCV({ 'to': tx.uintCV(1349), 'ustx': tx.uintCV(581858) }),
    tx.tupleCV({ 'to': tx.uintCV(1351), 'ustx': tx.uintCV(18480489) }),
    tx.tupleCV({ 'to': tx.uintCV(1353), 'ustx': tx.uintCV(5702204) }),
    tx.tupleCV({ 'to': tx.uintCV(1354), 'ustx': tx.uintCV(7405107) }),
    tx.tupleCV({ 'to': tx.uintCV(1355), 'ustx': tx.uintCV(1574894) }),
    tx.tupleCV({ 'to': tx.uintCV(1356), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1357), 'ustx': tx.uintCV(380147) }),
    tx.tupleCV({ 'to': tx.uintCV(1359), 'ustx': tx.uintCV(7392196) }),
    tx.tupleCV({ 'to': tx.uintCV(1360), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1361), 'ustx': tx.uintCV(244380) }),
    tx.tupleCV({ 'to': tx.uintCV(1362), 'ustx': tx.uintCV(4266955) }),
    tx.tupleCV({ 'to': tx.uintCV(1365), 'ustx': tx.uintCV(368510) }),
    tx.tupleCV({ 'to': tx.uintCV(1366), 'ustx': tx.uintCV(2831707) }),
    tx.tupleCV({ 'to': tx.uintCV(1370), 'ustx': tx.uintCV(6982290) }),
    tx.tupleCV({ 'to': tx.uintCV(1372), 'ustx': tx.uintCV(39787417) }),
    tx.tupleCV({ 'to': tx.uintCV(1374), 'ustx': tx.uintCV(690471) }),
    tx.tupleCV({ 'to': tx.uintCV(1378), 'ustx': tx.uintCV(3180821) }),
    tx.tupleCV({ 'to': tx.uintCV(1379), 'ustx': tx.uintCV(275413) }),
    tx.tupleCV({ 'to': tx.uintCV(1380), 'ustx': tx.uintCV(1939525) }),
    tx.tupleCV({ 'to': tx.uintCV(1381), 'ustx': tx.uintCV(2327430) }),
    tx.tupleCV({ 'to': tx.uintCV(1383), 'ustx': tx.uintCV(37238881) }),
    tx.tupleCV({ 'to': tx.uintCV(1384), 'ustx': tx.uintCV(14061557) }),
    tx.tupleCV({ 'to': tx.uintCV(1385), 'ustx': tx.uintCV(12583638) }),
    tx.tupleCV({ 'to': tx.uintCV(1386), 'ustx': tx.uintCV(702108) }),
    tx.tupleCV({ 'to': tx.uintCV(1387), 'ustx': tx.uintCV(14740390) }),
    tx.tupleCV({ 'to': tx.uintCV(1388), 'ustx': tx.uintCV(5818575) }),
    tx.tupleCV({ 'to': tx.uintCV(1389), 'ustx': tx.uintCV(13484921) }),
    tx.tupleCV({ 'to': tx.uintCV(1390), 'ustx': tx.uintCV(50427651) }),
    tx.tupleCV({ 'to': tx.uintCV(1394), 'ustx': tx.uintCV(29480781) }),
    tx.tupleCV({ 'to': tx.uintCV(1395), 'ustx': tx.uintCV(453849) }),
    tx.tupleCV({ 'to': tx.uintCV(1396), 'ustx': tx.uintCV(1667992) }),
    tx.tupleCV({ 'to': tx.uintCV(1397), 'ustx': tx.uintCV(1745573) }),
    tx.tupleCV({ 'to': tx.uintCV(1400), 'ustx': tx.uintCV(16164002) }),
    tx.tupleCV({ 'to': tx.uintCV(1404), 'ustx': tx.uintCV(969763) }),
    tx.tupleCV({ 'to': tx.uintCV(1405), 'ustx': tx.uintCV(28386889) }),
    tx.tupleCV({ 'to': tx.uintCV(1406), 'ustx': tx.uintCV(19395250) }),
    tx.tupleCV({ 'to': tx.uintCV(1409), 'ustx': tx.uintCV(38791) }),
    tx.tupleCV({ 'to': tx.uintCV(1410), 'ustx': tx.uintCV(31032401) }),
    tx.tupleCV({ 'to': tx.uintCV(1411), 'ustx': tx.uintCV(969763) }),
    tx.tupleCV({ 'to': tx.uintCV(1413), 'ustx': tx.uintCV(23111380) }),
    tx.tupleCV({ 'to': tx.uintCV(1415), 'ustx': tx.uintCV(7432260) }),
    tx.tupleCV({ 'to': tx.uintCV(1416), 'ustx': tx.uintCV(4957426) }),
    tx.tupleCV({ 'to': tx.uintCV(1417), 'ustx': tx.uintCV(21334775) }),
    tx.tupleCV({ 'to': tx.uintCV(1419), 'ustx': tx.uintCV(81460052) }),
    tx.tupleCV({ 'to': tx.uintCV(1420), 'ustx': tx.uintCV(2909288) }),
    tx.tupleCV({ 'to': tx.uintCV(1421), 'ustx': tx.uintCV(3297193) }),
    tx.tupleCV({ 'to': tx.uintCV(1424), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(1425), 'ustx': tx.uintCV(2629996) }),
    tx.tupleCV({ 'to': tx.uintCV(1428), 'ustx': tx.uintCV(2482592) }),
    tx.tupleCV({ 'to': tx.uintCV(1433), 'ustx': tx.uintCV(690471) }),
    tx.tupleCV({ 'to': tx.uintCV(1434), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1436), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1437), 'ustx': tx.uintCV(1280017) }),
    tx.tupleCV({ 'to': tx.uintCV(1438), 'ustx': tx.uintCV(7176243) }),
    tx.tupleCV({ 'to': tx.uintCV(1441), 'ustx': tx.uintCV(1144320) }),
    tx.tupleCV({ 'to': tx.uintCV(1442), 'ustx': tx.uintCV(23274) }),
    tx.tupleCV({ 'to': tx.uintCV(1443), 'ustx': tx.uintCV(2684534) }),
    tx.tupleCV({ 'to': tx.uintCV(1447), 'ustx': tx.uintCV(37311852) }),
    tx.tupleCV({ 'to': tx.uintCV(1448), 'ustx': tx.uintCV(702108) }),
    tx.tupleCV({ 'to': tx.uintCV(1450), 'ustx': tx.uintCV(194531) }),
    tx.tupleCV({ 'to': tx.uintCV(1451), 'ustx': tx.uintCV(387905009) }),
    tx.tupleCV({ 'to': tx.uintCV(1452), 'ustx': tx.uintCV(63688478) }),
    tx.tupleCV({ 'to': tx.uintCV(1453), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(1455), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(1456), 'ustx': tx.uintCV(383333334) }),
    tx.tupleCV({ 'to': tx.uintCV(1457), 'ustx': tx.uintCV(310324) }),
    tx.tupleCV({ 'to': tx.uintCV(1459), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(1460), 'ustx': tx.uintCV(310324) }),
    tx.tupleCV({ 'to': tx.uintCV(1461), 'ustx': tx.uintCV(2334378) }),
    tx.tupleCV({ 'to': tx.uintCV(1462), 'ustx': tx.uintCV(213348) }),
    tx.tupleCV({ 'to': tx.uintCV(1463), 'ustx': tx.uintCV(116372) }),
    tx.tupleCV({ 'to': tx.uintCV(1464), 'ustx': tx.uintCV(969763) }),
    tx.tupleCV({ 'to': tx.uintCV(1465), 'ustx': tx.uintCV(3083845) }),
    tx.tupleCV({ 'to': tx.uintCV(1466), 'ustx': tx.uintCV(2715335) }),
    tx.tupleCV({ 'to': tx.uintCV(1467), 'ustx': tx.uintCV(16470447) }),
    tx.tupleCV({ 'to': tx.uintCV(1468), 'ustx': tx.uintCV(50428) }),
    tx.tupleCV({ 'to': tx.uintCV(1470), 'ustx': tx.uintCV(38790501) }),
    tx.tupleCV({ 'to': tx.uintCV(1472), 'ustx': tx.uintCV(775810017) }),
    tx.tupleCV({ 'to': tx.uintCV(1473), 'ustx': tx.uintCV(290929) }),
    tx.tupleCV({ 'to': tx.uintCV(1474), 'ustx': tx.uintCV(10896252) }),
    tx.tupleCV({ 'to': tx.uintCV(1476), 'ustx': tx.uintCV(193953) }),
    tx.tupleCV({ 'to': tx.uintCV(1477), 'ustx': tx.uintCV(3491145) }),
    tx.tupleCV({ 'to': tx.uintCV(1479), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(1480), 'ustx': tx.uintCV(1163715) }),
    tx.tupleCV({ 'to': tx.uintCV(1482), 'ustx': tx.uintCV(267580) }),
    tx.tupleCV({ 'to': tx.uintCV(1483), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(1486), 'ustx': tx.uintCV(3859655) }),
    tx.tupleCV({ 'to': tx.uintCV(1488), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1489), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1490), 'ustx': tx.uintCV(143525) }),
    tx.tupleCV({ 'to': tx.uintCV(1492), 'ustx': tx.uintCV(7758) }),
    tx.tupleCV({ 'to': tx.uintCV(1493), 'ustx': tx.uintCV(15477410) }),
    tx.tupleCV({ 'to': tx.uintCV(1494), 'ustx': tx.uintCV(372389) }),
    tx.tupleCV({ 'to': tx.uintCV(1496), 'ustx': tx.uintCV(9697625) }),
    tx.tupleCV({ 'to': tx.uintCV(1499), 'ustx': tx.uintCV(969763) }),
    tx.tupleCV({ 'to': tx.uintCV(1500), 'ustx': tx.uintCV(865028) }),
    tx.tupleCV({ 'to': tx.uintCV(1502), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(1505), 'ustx': tx.uintCV(341356) }),
    tx.tupleCV({ 'to': tx.uintCV(1506), 'ustx': tx.uintCV(23278180) }),
    tx.tupleCV({ 'to': tx.uintCV(1507), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(1508), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1509), 'ustx': tx.uintCV(1163715) }),
    tx.tupleCV({ 'to': tx.uintCV(1510), 'ustx': tx.uintCV(4410480) }),
    tx.tupleCV({ 'to': tx.uintCV(1511), 'ustx': tx.uintCV(1939525) }),
    tx.tupleCV({ 'to': tx.uintCV(1512), 'ustx': tx.uintCV(1799879) }),
    tx.tupleCV({ 'to': tx.uintCV(1515), 'ustx': tx.uintCV(3646307) }),
    tx.tupleCV({ 'to': tx.uintCV(1518), 'ustx': tx.uintCV(15516200) }),
    tx.tupleCV({ 'to': tx.uintCV(1520), 'ustx': tx.uintCV(8557184) }),
    tx.tupleCV({ 'to': tx.uintCV(1521), 'ustx': tx.uintCV(4228165) }),
    tx.tupleCV({ 'to': tx.uintCV(1522), 'ustx': tx.uintCV(116372) }),
    tx.tupleCV({ 'to': tx.uintCV(1523), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(1524), 'ustx': tx.uintCV(7878351) }),
    tx.tupleCV({ 'to': tx.uintCV(1529), 'ustx': tx.uintCV(1939525) }),
    tx.tupleCV({ 'to': tx.uintCV(1531), 'ustx': tx.uintCV(108605644) }),
    tx.tupleCV({ 'to': tx.uintCV(1533), 'ustx': tx.uintCV(1931767) }),
    tx.tupleCV({ 'to': tx.uintCV(1534), 'ustx': tx.uintCV(7412865) }),
    tx.tupleCV({ 'to': tx.uintCV(1536), 'ustx': tx.uintCV(1163715) }),
    tx.tupleCV({ 'to': tx.uintCV(1537), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(1538), 'ustx': tx.uintCV(3258402) }),
    tx.tupleCV({ 'to': tx.uintCV(1541), 'ustx': tx.uintCV(3529936) }),
    tx.tupleCV({ 'to': tx.uintCV(1542), 'ustx': tx.uintCV(5818575) }),
    tx.tupleCV({ 'to': tx.uintCV(1543), 'ustx': tx.uintCV(775810) }),
    tx.tupleCV({ 'to': tx.uintCV(1547), 'ustx': tx.uintCV(1551620) }),
    tx.tupleCV({ 'to': tx.uintCV(1548), 'ustx': tx.uintCV(62065) }),
    tx.tupleCV({ 'to': tx.uintCV(1551), 'ustx': tx.uintCV(41505836) }),
    tx.tupleCV({ 'to': tx.uintCV(1552), 'ustx': tx.uintCV(1939525) }),
    tx.tupleCV({ 'to': tx.uintCV(1553), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1554), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1555), 'ustx': tx.uintCV(44027218) }),
    tx.tupleCV({ 'to': tx.uintCV(1556), 'ustx': tx.uintCV(17490637) }),
    tx.tupleCV({ 'to': tx.uintCV(1561), 'ustx': tx.uintCV(3103240) }),
    tx.tupleCV({ 'to': tx.uintCV(1562), 'ustx': tx.uintCV(19395) }),
    tx.tupleCV({ 'to': tx.uintCV(1564), 'ustx': tx.uintCV(77581002) }),
    tx.tupleCV({ 'to': tx.uintCV(1566), 'ustx': tx.uintCV(13506852) }),
    tx.tupleCV({ 'to': tx.uintCV(1567), 'ustx': tx.uintCV(27153) }),
    tx.tupleCV({ 'to': tx.uintCV(1568), 'ustx': tx.uintCV(7758100) }),
    tx.tupleCV({ 'to': tx.uintCV(1569), 'ustx': tx.uintCV(2602843) }),
    tx.tupleCV({ 'to': tx.uintCV(1570), 'ustx': tx.uintCV(1939525) }),
    tx.tupleCV({ 'to': tx.uintCV(1574), 'ustx': tx.uintCV(155162) }),
    tx.tupleCV({ 'to': tx.uintCV(1576), 'ustx': tx.uintCV(116372) }),
    tx.tupleCV({ 'to': tx.uintCV(1581), 'ustx': tx.uintCV(7758100) }),
    tx.tupleCV({ 'to': tx.uintCV(1582), 'ustx': tx.uintCV(896061) }),
    tx.tupleCV({ 'to': tx.uintCV(1584), 'ustx': tx.uintCV(252138) }),
    tx.tupleCV({ 'to': tx.uintCV(1587), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1589), 'ustx': tx.uintCV(193953) }),
    tx.tupleCV({ 'to': tx.uintCV(1591), 'ustx': tx.uintCV(2342946) }),
    tx.tupleCV({ 'to': tx.uintCV(1592), 'ustx': tx.uintCV(193952504) }),
    tx.tupleCV({ 'to': tx.uintCV(1593), 'ustx': tx.uintCV(5818575) }),
    tx.tupleCV({ 'to': tx.uintCV(1594), 'ustx': tx.uintCV(1648596) }),
    tx.tupleCV({ 'to': tx.uintCV(1598), 'ustx': tx.uintCV(193953) }),
    tx.tupleCV({ 'to': tx.uintCV(1599), 'ustx': tx.uintCV(65944) }),
    tx.tupleCV({ 'to': tx.uintCV(1600), 'ustx': tx.uintCV(13479699) }),
    tx.tupleCV({ 'to': tx.uintCV(1601), 'ustx': tx.uintCV(298687) }),
    tx.tupleCV({ 'to': tx.uintCV(1602), 'ustx': tx.uintCV(96976) }),
    tx.tupleCV({ 'to': tx.uintCV(1603), 'ustx': tx.uintCV(96976) }),
    tx.tupleCV({ 'to': tx.uintCV(1604), 'ustx': tx.uintCV(1163715) }),
    tx.tupleCV({ 'to': tx.uintCV(1605), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(1607), 'ustx': tx.uintCV(89218152) }),
    tx.tupleCV({ 'to': tx.uintCV(1609), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1610), 'ustx': tx.uintCV(3879050) }),
    tx.tupleCV({ 'to': tx.uintCV(1612), 'ustx': tx.uintCV(356873) }),
    tx.tupleCV({ 'to': tx.uintCV(1613), 'ustx': tx.uintCV(2715335) }),
    tx.tupleCV({ 'to': tx.uintCV(1617), 'ustx': tx.uintCV(69823) }),
    tx.tupleCV({ 'to': tx.uintCV(1618), 'ustx': tx.uintCV(7176243) }),
    tx.tupleCV({ 'to': tx.uintCV(1619), 'ustx': tx.uintCV(9697625) }),
    tx.tupleCV({ 'to': tx.uintCV(1622), 'ustx': tx.uintCV(23274301) }),
    tx.tupleCV({ 'to': tx.uintCV(1624), 'ustx': tx.uintCV(3258402) }),
    tx.tupleCV({ 'to': tx.uintCV(1625), 'ustx': tx.uintCV(38200885) }),
    tx.tupleCV({ 'to': tx.uintCV(1719), 'ustx': tx.uintCV(14065436) }),
    tx.tupleCV({ 'to': tx.uintCV(1724), 'ustx': tx.uintCV(147404) }),
    tx.tupleCV({ 'to': tx.uintCV(1725), 'ustx': tx.uintCV(107254) }),
    tx.tupleCV({ 'to': tx.uintCV(1726), 'ustx': tx.uintCV(465486) }),
    tx.tupleCV({ 'to': tx.uintCV(1733), 'ustx': tx.uintCV(387905) }),
    tx.tupleCV({ 'to': tx.uintCV(1735), 'ustx': tx.uintCV(108613) }),
    tx.tupleCV({ 'to': tx.uintCV(1736), 'ustx': tx.uintCV(12412960) })
  ]);
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: 'arkadiko-claim-yield-v2-1',
    functionName: 'add-claims',
    functionArgs: [list],
    senderKey: process.env.STACKS_PRIVATE_KEY,
    nonce: new BN(400, 10),
    postConditionMode: 1,
    network
  };

  const transaction = await tx.makeContractCall(txOptions);
  const result = tx.broadcastTransaction(transaction, network);
  await utils.processing(result, transaction.txid(), 0);
};

transact();