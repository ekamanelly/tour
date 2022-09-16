import { removeDuplicate } from "../removeDuplicated.util";
const data = [
    { id: 1, date: "friday" },
    { id: 2, date: "friday" },
    { id: 1, date: "friday" },
  ];
describe("the removeDuplicate util", () => {
  it("should filter and return an array", () => {
    const result = removeDuplicate(data, 'id');
    expect(result.length).toBeLessThan(data.length);
    
  });
});
