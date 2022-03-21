import { describe, it, jest, expect } from "@jest/globals";
import UniqueEntityId from "./unique-entity-id.vo";
import InvalidUUIDError from "../errors/invalid-uuid.error";

describe("UniqueEntityId Unit Test", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

    expect(() => new UniqueEntityId("invalid-uuid")).toThrow(
      new InvalidUUIDError()
    );

    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const uuid = '192370d5-f21a-440f-9fce-b62868b2ad9c';
    const vo = new UniqueEntityId(uuid);

    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();

  })

  it("should accept a uuid passed in constructor", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const vo = new UniqueEntityId();

    expect(new UniqueEntityId(vo.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();

  })
});
