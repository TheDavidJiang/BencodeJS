const [decodeInt, decodeStr, decodeList, decodeDict] = require("./helpers");

//integers
test("i42e should be 42", () => {
  expect(decodeInt("i42e")).toStrictEqual([4, 42]);
});
test("i0e should be 0", () => {
  expect(decodeInt("i0e")).toStrictEqual([3, 0]);
});
test("i-42e should be -42", () => {
  expect(decodeInt("i-42e")).toStrictEqual([5, -42]);
});
test("i0eee should be 0", () => {
  expect(decodeInt("i0eee")).toStrictEqual([3, 0]);
});

//strings
test("4:spam should be spam", () => {
  expect(decodeStr("4:spam")).toStrictEqual([6, "spam"]);
});
test("100:maplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestory should be maplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestory", () => {
  expect(
    decodeStr(
      "100:maplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestory",
    ),
  ).toStrictEqual([
    104,
    "maplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestorymaplestory",
  ]);
});
test("9:trail mix should be trail mix", () => {
  expect(decodeStr("9:trail mix")).toStrictEqual([11, "trail mix"]);
});
test("9::rail mix should be rail mix", () => {
  expect(decodeStr("9::rail mix")).toStrictEqual([11, ":rail mix"]);
});
test("9:trail mixasdf should be trail mix", () => {
  expect(decodeStr("9:trail mixasdf")).toStrictEqual([11, "trail mix"]);
});

//Lists
test("l4:spame should be [8, ['spam']]", () => {
  expect(decodeList("l4:spame")).toStrictEqual([8, ["spam"]]);
});
test("li56ee should be [56]", () => {
  expect(decodeList("li56ee")).toStrictEqual([6, [56]]);
});
test('l4:spami42ee should be ["spam", 42]', () => {
  expect(decodeList("l4:spami42ee")).toStrictEqual([12, ["spam", 42]]);
});
test('ll4:spamee should be [["spam"]]', () => {
  expect(decodeList("ll4:spamee")).toStrictEqual([10,[["spam"]]]);
});
// test('ld3:bar4:spamee should be [{"bar": "spam"}]', () => {
//   expect(decodeList("ld3:bar4:spamee")).toStrictEqual([15,[{"bar": "spam"}]]);
// });


//Dictionaries
test("--", () => {
  expect(decodeDict("de")).toStrictEqual([2, {}]);
});
test("--", () => {
  expect(decodeDict("d4:spami32ee")).toStrictEqual([12, {"spam": 32}]);
});
test("--", () => {
  expect(decodeDict("d4:spam4:pork3:cow0:e")).toStrictEqual([21, {"spam": "pork", "cow": ""}]);
});
test("--", () => {
  expect(decodeDict("d4:spam4:pork3:cowi32ee")).toStrictEqual([23, {"spam": "pork", "cow": 32}]);
});

test("--", () => {
  expect(decodeDict("d4:spam4:pork5:extrad3:cow3:sayee")).toStrictEqual([33, {"spam": "pork", "extra": {"cow": "say"}}]);
});


test("--", () => {
  expect(decodeDict("d4:spamli32eee")).toStrictEqual([14, {"spam": [32]}]);
});
test("--", () => {
  expect(decodeDict("d4:spamli32eeeextra")).toStrictEqual([14, {"spam": [32]}]);
});

