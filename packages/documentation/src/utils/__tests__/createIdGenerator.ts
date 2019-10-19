import createIdGenerator from "../createIdGenerator";

describe("createIdGenerator", () => {
  it('should create "unique" ids by incrementing the suffix by an index for each time it\'s been called', () => {
    const uuid = createIdGenerator("prefix");
    const id1 = uuid();
    const id2 = uuid();
    const id3 = uuid();

    expect(id1).toBe("prefix-0");
    expect(id2).toBe("prefix-1");
    expect(id3).toBe("prefix-2");
  });

  it("should not reuse an existing prefix's index if the same prefix is used multiple times", () => {
    const uuid1 = createIdGenerator("my-prefix");
    const uuid2 = createIdGenerator("my-prefix");
    expect(uuid1()).toBe("my-prefix-0");
    expect(uuid2()).toBe("my-prefix-0");

    const uuid3 = createIdGenerator("my-prefix");
    expect(uuid1()).toBe("my-prefix-1");
    expect(uuid3()).toBe("my-prefix-0");
    expect(uuid2()).toBe("my-prefix-1");
  });
});
