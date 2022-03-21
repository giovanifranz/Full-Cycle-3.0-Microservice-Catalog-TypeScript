import { randomUUID } from "crypto";
import InvalidUUIDError from "../errors/invalid-uuid.error";

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id || randomUUID();
    this.validate();
  }

  private uuidValidate(uuid: string) {
    const regexTest = uuid.match(
      "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
    );

    if (regexTest === null) {
      return false;
    }
    return true;
  }

  private validate() {
    const isValid = this.uuidValidate(this.id);
    if (!isValid) {
      throw new InvalidUUIDError();
    }
    return isValid;
  }
}
