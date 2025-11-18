import { isArrayUnique } from "../../helpers/utils.js";

describe("testing isArrayUnique", () => {
  it("should return false for non-unique arrays", () => {
    const nonUnique1 = ["sss", "aaa", "bbb", "aaa"];
    const nonUnique2 = [2, "aaa", 88, "test", 0, 0];
    const nonUnique3 = [0, 1, 2, 3, 4, 5, 3, 7];

    expect(isArrayUnique(nonUnique1)).toStrictEqual(false);
    expect(isArrayUnique(nonUnique2)).toStrictEqual(false);
    expect(isArrayUnique(nonUnique3)).toStrictEqual(false);
  });

  it("should return true for unique arrays", () => {
    const unique1 = ["sss", "aaa", "bbb", "fff"];
    const unique2 = [2, "aaa", 88, "test", 0, false];
    const unique3 = [0, 1, 2, 3, 4, 5, 6, 7];

    expect(isArrayUnique(unique1)).toStrictEqual(true);
    expect(isArrayUnique(unique2)).toStrictEqual(true);
    expect(isArrayUnique(unique3)).toStrictEqual(true);
  });
});
