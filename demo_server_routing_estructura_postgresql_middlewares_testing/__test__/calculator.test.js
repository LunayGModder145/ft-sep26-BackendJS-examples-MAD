const { add, sub, mul, div } = require("../utils/calculator");

describe("Testing calculator functionalities", () => {
  describe("Adding numbers. Test add() function", () => {
    
    test("Adding 1 + 1 equals 2", () => {
      expect(add(1, 1)).toBe(2);
    });

    test('Adding 1 + "1" return NaN', () => {
      expect(add(1, "1")).toBe(NaN);
    });

    test("Adding without parameters return NaN", () => {
      expect(add(1)).toBe(NaN);
    });

    test("Adding arrays", () => {
      expect(add([1, 2, 3, 4], [1, 2, 3, 4])).toBe(NaN);
    });

    test("Adding NaNs", () => {
      expect(add(NaN, NaN)).toBe(NaN);
    });

    test("Adding NaNs", () => {
        expect(add(1, NaN)).toBe(NaN);
      });

    test("Adding undefined", () => {
    expect(add(undefined, undefined)).toBe(NaN);
    });
    test("Adding null", () => {
      expect(add(null, null)).toBe(NaN);
    });
    test("Adding true", () => {
      expect(add(true, true)).toBe(NaN);
    });
  });

  describe("Multiplying numbers. Test mul() function", () => {
    test("Multiplying 1 * 1 equals 1", () => {
      expect(mul(1, 1)).toBe(1);
    });

    test("Multiplying without parameters return null", () => {
      expect(mul()).toBeNull();
    });
    test("Multiplying without parameters return NaN", () => {
      expect(mul(10, "2")).toBe(NaN);
    });
  });

  describe("Substracting numbers. Testing sub() function", () => {
    test("Subtracting 1 - 1 equals 0", () => {
      expect(sub(1, 1)).toBe(0);
    });
    test('Subtracting 1 - "hola" equals NaN', () => {
      expect(sub(1, "hola")).toBe(NaN);
    });
    test("Subtracting 2 - true equals NaN", () => {
      expect(sub(2, true)).toBe(NaN);
    });
    test("Subtracting [] - [] equals NaN", () => {
      expect(sub([], [])).toBe(NaN);
    });
    test("Subtracting without parameters return NaN", () => {
      expect(sub()).toBe(NaN);
    });
    test("Subtracting  NaN - NaN return NaN", () => {
      expect(sub(NaN,NaN)).toBe(NaN);
    });
  });

  describe("Dividing numbers. Testing div() function", () => {
    test("Dividing 1 / 1 equals 1", () => {
      expect(div(1, 1)).toBe(1);
    });
    test("Dividing 1 / 0 equals Infinity", () => {
      expect(div(1, 0)).toBe(Infinity);
    });
    test("Dividing without parameters", () => {
      expect(div()).toBe(NaN);
    });
    test("Dividing only parameter", () => {
      expect(div(1)).toBe(NaN);
    });
    test("Dividing 1 / 'hola' equals NaN", () => {
      expect(div(1, "hola")).toBe(NaN);
    });

    test("Dividing 0/0 true equals NaN", () => {
      expect(div(0, 0)).toBe(NaN);
    });

    test("Dividing []/{} true equals NaN", () => {
      expect(div([1, 2, 3], { name: "tortilla" })).toBe(NaN);
    });

    test("Dividing '1'/'1' equals NaN", () => {
      expect(div('1', '1')).toBe(NaN);
    });

    test("Dividing 1/true equals NaN", () => {
      expect(div(1, true)).toBe(NaN);
    });

    test("Dividing 1/false equals NaN", () => {
      expect(div(1, false)).toBe(NaN);
    });

    test("Dividing 1/undefined equals NaN", () => {
      expect(div(1, undefined)).toBe(NaN);
    });

    test("Dividing 1/null equals NaN", () => {
      expect(div(1, null)).toBe(NaN);
    });

    test("Dividing 1/NaN equals NaN", () => {
      expect(div(1, NaN)).toBe(NaN);
    });

    test("Dividing {}/[] equals NaN", () => {
      expect(div({}, [])).toBe(NaN);
    });
  });
});

/*   test('Multiplying 1 * 1 equals 1', () => {
    expect(mul(1, 1)).toBe(1)
  })
  test('Subtracting 1 - 1 equals 0', () => {
    expect(sub(1, 1)).toBe(0)
  })
  test('Dividing 1 / 1 equals 1', () => {
    expect(div(1, 1)).toBe(1)
  }) */