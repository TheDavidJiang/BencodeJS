const decode = require("./decode")


//integers
// test("i42e should be 42", () => {
//   expect(decode("i42e")).toBe(42);
// });
// test("i0e should be 0", () => {
//   expect(decode("i0e")).toBe(0);
// });
// test("i-42e should be -42", () => {
//   expect(decode("i-42e")).toBe(-42);
// });
// test("i0eee should be 0", () => {
//   expect(decode("i0eee")).toBe(0);
// });


//strings
// test("4:spam should be spam", () => {
//   expect(decode("4:spam")).toBe("spam");
// });
// test("10:stegobatch should be stegobatch", () => {
//   expect(decode("10:stegobatch")).toBe("stegobatch");
// });
// test("9:trail mix should be trail mix", () => {
//   expect(decode("9:trail mix")).toBe("trail mix");
// });
// test("9::rail mix should be rail mix", () => {
//   expect(decode("9::rail mix")).toBe(":rail mix");
// });
// test("9:trail mixasdf should be trail mix", () => {
//   expect(decode("9:trail mixasdf")).toBe("trail mix");
// });

//Lists
test("l4:spame should be ['spam']", () => {
  expect(decode("l4:spame")).toStrictEqual(["spam"]);
});
test("li56ee should be [56]", () => {
  expect(decode("li56ee")).toStrictEqual([56]);
});
test('l4:spami42ee should be ["spam", 42]', () => {
  expect(decode("l4:spami42ee")).toStrictEqual(["spam", 42]);
});
test('ll4:spamee should be [["spam"]]', () => {
  expect(decode("ll4:spamee")).toStrictEqual([["spam"]]);
});
// test('ld3:bar4:spamee should be [{"bar": "spam"}]', () => {
//   expect(decode("ld3:bar4:spamee")).toStrictEqual([{"bar": "spam"}]);
// });