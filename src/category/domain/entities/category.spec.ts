import {describe, expect, test} from '@jest/globals';
import { Category, CategoryProps } from "./category";
import { omit } from "lodash";
import UniqueEntityId from "../../../@seedwork/domain/unique-entity-id.vo";

describe("Category Unit Tests", () => {
  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "created_at");
    let created_at = new Date();

    expect(category.props.created_at).toBeInstanceOf(Date);
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    const data: CategoryProps[] = [
      {
        name: "Movie",
        description: "order description",
      },
      {
        name: "Movie",
        is_active: true,
      },
      {
        name: "Movie",
        created_at,
      },
    ];

    data.forEach((item) => {
      category = new Category({
        ...item,
      });
      expect(category.props).toMatchObject({
        ...item,
      });
    });
  });

  test("id field", () => {
    type CategoryData = {
      props: CategoryProps;
      id?: UniqueEntityId;
    };

    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((item) => {
      const category = new Category(item.props, item.id);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getters of name field", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("getters of description field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.description).toBeNull();

    category = new Category({ name: "Movie", description: "some description" });
    expect(category.description).toBe("some description");
  });

  test("getters of is_active field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();
  });
});
