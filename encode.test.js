const [
  encodeInteger,
  encodeString,
  encodeList,
  encodeDictionary,
] = require("./encode");

test("42 should be i42e", () => {
  expect(encodeInteger(42)).toBe("i42e");
});

test("0 should be i0e", () => {
  expect(encodeInteger(0)).toBe("i0e");
});

test("-42 should be i-42e", () => {
  expect(encodeInteger(-42)).toBe("i-42e");
});

test("-42 should be i-42e", () => {
  expect(encodeInteger(-42)).toBe("i-42e");
});

test("spam should be 4:spam", () => {
  expect(encodeString("spam")).toBe("4:spam");
});
test("stegobatch should be 10:stegobatch", () => {
  expect(encodeString("stegobatch")).toBe("10:stegobatch");
});
test("trail mix should be 9:trail mix", () => {
  expect(encodeString("trail mix")).toBe("9:trail mix");
});

test("[spam] should be l4:spame", () => {
  expect(encodeList(["spam"])).toBe("l4:spame");
});
test("[56] should be li56ee", () => {
  expect(encodeList([56])).toBe("li56ee");
});
test('["spam", 42] should be l4:spami42ee', () => {
  expect(encodeList(["spam", 42])).toBe("l4:spami42ee");
});
test('[["spam"]] should be ll4:spamee', () => {
  expect(encodeList([["spam"]])).toBe("ll4:spamee");
});
test('[{"bar": "spam"}] should be ld3:bar4:spamee', () => {
  expect(encodeList([{ bar: "spam" }])).toBe("ld3:bar4:spamee");
});

test('{"bar": "spam"} should be d3:bar4:spame', () => {
  expect(encodeDictionary({ bar: "spam" })).toBe("d3:bar4:spame");
});
test('{"foo": 42} should be d3:fooi42ee', () => {
  expect(encodeDictionary({ foo: 42 })).toBe("d3:fooi42ee");
});
test('{"bar": "spam", "foo": 42} should be d3:bar4:spam3:fooi42ee', () => {
  expect(encodeDictionary({ bar: "spam", foo: 42 })).toBe(
    "d3:bar4:spam3:fooi42ee",
  );
});
test('{"bar": {"spam" : 42}} should be d3:bard4:spami42eee', () => {
  expect(encodeDictionary({ bar: { spam: 42 } })).toBe("d3:bard4:spami42eee");
});
test('{"bar": ["foo"]} should be d3:barl3:fooee', () => {
  expect(encodeDictionary({ bar: ["foo"] })).toBe("d3:barl3:fooee");
});

//list within dictionary

test("python example should work", () => {
  expect(
    encodeDictionary({ foo: 42, bar: { sketch: "parrot", foobar: 23 } }),
  ).toBe("d3:bard6:foobari23e6:sketch6:parrote3:fooi42ee");
});
